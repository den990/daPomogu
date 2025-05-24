import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { taskServiceApi } from "../../utils/api/task_service";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import CoordinatorsMultiSelect from "./CoordinatorsMultiSelect";
import CategoryMultiSelect from "./CategoryMultiSelect";
import useCreateTaskFormValidation from "../../hooks/useCreateTaskFormValidation";
import { AddressSuggestions } from "react-dadata";
import { Alert, Fade } from "@mui/material";
import ROUTES from "../../constants/routes";
import "react-dadata/dist/react-dadata.css";

const DADATA_TOKEN = "4851105aa090b15531d01ede553fc2339ebd218f";

export default function TaskForm({ initialData = null, isEditMode = false, onSuccess }) {
    const { values, errors, isValid, handleChange, setValues, validateAll } = useCreateTaskFormValidation();
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        if (!initialData) return;
        const {
            name, type_id, description, task_date,
            participants_count, max_score, coordinators, categories, location
        } = initialData;

        const utcDate = new Date(task_date.replace(" ", "T") + "Z");
        const pad = n => String(n).padStart(2, "0");
        const newValues = {
            name,
            task_type: String(type_id),
            description,
            date: `${utcDate.getFullYear()}-${pad(utcDate.getMonth()+1)}-${pad(utcDate.getDate())}`,
            time: `${pad(utcDate.getHours())}:${pad(utcDate.getMinutes())}`,
            participants_count: String(participants_count),
            max_score: String(max_score),
            coordinate_ids: coordinators.map(c => ({ id: c.id, name: c.name, surname: c.surname })),
            category_ids: categories.map(c => ({ ID: c.id, Name: c.name })),
        };

        setValues(prev => ({ ...prev, ...newValues }));

        const [lat, lon] = location.split(",").map(s => s.trim());
        setAddress({ value: location, data: { geo_lat: lat, geo_lon: lon } });

        validateAll({ ...values, ...newValues, address: location });

        fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address", {
            method: "POST",
            headers: {
                "Content-Type":  "application/json",
                "Accept":        "application/json",
                "Authorization": `Token ${DADATA_TOKEN}`,
            },
            body: JSON.stringify({ lat: parseFloat(lat), lon: parseFloat(lon), count: 1 }),
        })
            .then(res => res.json())
            .then(json => {
                const sug = json?.suggestions[0];
                if (sug) {
                    setAddress({
                        value: sug.value,
                        data: {
                            geo_lat: lat,
                            geo_lon: lon
                        }
                    });
                }
            })
            .catch(console.error);
    }, [initialData, setValues]);



    useEffect(() => {
        if (address) {
            setValues(v => ({ ...v, address: address.value }));
        }
    }, [address, setValues]);

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        if (!isValid) {
            return setError("Заполните все обязательные поля корректно");
        }


        const [y, m, d] = values.date.split("-");
        const [hh, mm] = values.time.split(":");
        const local = new Date(y, m-1, d, hh, mm);
        if (local < new Date()) {
            return setError("Дата и время не могут быть в прошлом");
        }

        const iso = local.toISOString();
        const task_date = iso.split(".")[0]
            .replace("T", " ");

        const payload = {
            name: values.name,
            type_id:            Number(values.task_type),
            description:        values.description,
            location:           `${address.data.geo_lat}, ${address.data.geo_lon}`,
            task_date,
            participants_count: Number(values.participants_count),
            max_score:          Number(values.max_score),
            coordinate_ids:     values.coordinate_ids.map(c => c.id),
            category_ids:       values.category_ids.map(c => c.ID),
        };

        try {
            if (isEditMode) {
                await taskServiceApi.putUpdateTask(token, payload, initialData.id, logout);
            } else {
                await taskServiceApi.postCreateTask(token, payload, logout);
            }
            onSuccess?.();
        } catch (err) {
            setError(isEditMode
                ? "Ошибка при обновлении задания: "  + err.message
                : "Ошибка при создании задания: " + err.message
            );
        }
    };

    return (
        <form id="task-form" className="bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Название */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название задания</label>
                    <input
                        type="text" name="name" value={values.name||""} onChange={handleChange}
                        required minLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите название"
                    />
                    {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
                </div>

                {/* Тип */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select
                        name="task_type" value={values.task_type||""} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200 bg-white"
                    >
                        <option value="1">Открытый</option>
                        <option value="2">Закрытый</option>
                    </select>
                </div>

                {/* Описание */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea
                        rows="4" name="description" value={values.description||""} onChange={handleChange}
                        required minLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите описание"
                    />
                    {errors.description && <span className="text-red-600 text-xs">{errors.description}</span>}
                </div>

                {/* Местоположение */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <AddressSuggestions
                        token={DADATA_TOKEN}
                        value={address}
                        onChange={setAddress}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите адрес"
                        minChars={3}
                    />
                </div>

                {/* Дата/Время */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input
                            type="date" name="date" value={values.date||""} onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        />
                        {errors.date && <span className="text-red-600 text-xs">{errors.date}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                        <input
                            type="time" name="time" value={values.time||""} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        />
                        {errors.time && <span className="text-red-600 text-xs">{errors.time}</span>}
                    </div>
                </div>

                {/* Количество участников */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество участников</label>
                    <input
                        type="number" min="1" name="participants_count"
                        value={values.participants_count||""} onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                    />
                    {errors.participants_count && <span className="text-red-600 text-xs">{errors.participants_count}</span>}
                </div>

                {/* Координаторы */}
                <CoordinatorsMultiSelect
                    value={values.coordinate_ids||[]}
                    onChange={list => setValues(v => ({ ...v, coordinate_ids: list }))}
                />

                {/* Категории */}
                <CategoryMultiSelect
                    value={values.category_ids||[]}
                    onChange={list => setValues(v => ({ ...v, category_ids: list }))}
                />

                {/* Баллы */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Максимальные баллы</label>
                    <input
                        type="number" name="max_score"
                        value={values.max_score||""} onChange={handleChange}
                        min="0" required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                    />
                    {errors.max_score && <span className="text-red-600 text-xs">{errors.max_score}</span>}
                </div>

                {error && (
                    <Fade in timeout={600}>
                        <Alert severity="error" className="mt-4">{error}</Alert>
                    </Fade>
                )}

                {/* Кнопки */}
                <div className="flex justify-end space-x-4 pt-6">
                    {isEditMode && (
                        <button
                            type="button"
                            onClick={() => navigate(ROUTES.ORGANIZATION_TASKS)}
                            className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Отмена
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`px-6 py-2 rounded-md text-white ${
                            isValid ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {isEditMode ? "Сохранить" : "Создать"}
                    </button>
                </div>
            </div>
        </form>
    );
}
