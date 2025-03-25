import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { useContext, useEffect, useState } from "react";
import { taskServiceApi } from "../../utils/api/task_service";
import { AuthContext } from "../../context/AuthProvider";
import CategoryMultiSelect from "./CategoryMultiSelect";
import CoordinatorsMultiSelect from "./CoordinatorsMultiSelect";
import { Alert, Fade } from "@mui/material";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

function TaskForm({ setIsPopUpVisible }) {
    const { values, errors, isValid, handleChange, setValues } = useFormWithValidation();
    const { token } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (!values.task_type) setValues({ ...values, task_type: "1" });
    }, [values, setValues]);

    const handleCategoryChange = (newCategories) => {
        setValues({ ...values, category_ids: newCategories });
    };

    const handleCoordinatorsChange = (newCoordinators) => {
        setValues({ ...values, coordinate_ids: newCoordinators });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const {
            name,
            task_type,
            description,
            date,
            time,
            participants_count,
            max_score,
            coordinate_ids,
            category_ids,
        } = values;

        const latitude = address.data.geo_lat;
        const longitude = address.data.geo_lon;
        const location = `${latitude}, ${longitude}`;

        const task_date = date && time ? new Date(`${date}T${time}`) : null;

        if (task_date && task_date < new Date()) {
            return setError("Дата и время не могут быть раньше текущего момента");
        }
        if (!coordinate_ids || coordinate_ids.length === 0) {
            return setError("Нужно выбрать хотя бы одного координатора");
        }
        if (!category_ids || category_ids.length === 0) {
            return setError("Нужно выбрать хотя бы одну категорию");
        }

        const payload = {
            name: name || "",
            task_type: Number(task_type),
            description: description || "",
            location: location || "",
            task_date,
            participants_count: Number(participants_count),
            max_score: Number(max_score),
            coordinate_ids: coordinate_ids.map((coord) => coord.id),
            category_ids: category_ids.map((cat) => cat.ID),
        };

        try {
            await taskServiceApi.postCreateTask(token, payload);
            setIsPopUpVisible(true);
        } catch (error) {
            setError("Произошла ошибка при создании задания. Попробуйте снова");
        }
    };

    return (
        <form id="task-form" className="bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div id="task-name-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название задания</label>
                    <input
                        type="text"
                        name="name"
                        value={values?.name || ""}
                        onChange={handleChange}
                        required
                        minLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите название"
                    />
                    {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
                </div>

                <div id="task-type-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select
                        name="task_type"
                        value={values?.task_type || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-200 bg-white"
                    >
                        <option value="1">Открытый</option>
                        <option value="2">Закрытый</option>
                    </select>
                </div>

                <div id="description-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea
                        rows="4"
                        name="description"
                        value={values?.description || ""}
                        onChange={handleChange}
                        required
                        minLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите описание"
                    ></textarea>
                    {errors.description && <span className="text-red-600 text-xs">{errors.description}</span>}
                </div>

                <div id="location-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <div className="w-full space-x-4">
                        <AddressSuggestions
                            token="4851105aa090b15531d01ede553fc2339ebd218f"
                            type="text"
                            name="location"
                            required
                            value={address}
                            onChange={setAddress}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                            placeholder="Введите адрес"
                            delay={300}
                        />
                    </div>
                    {errors.location && <span className="text-red-600 text-xs">{errors.location}</span>}
                </div>

                <div id="datetime-field" className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input
                            type="date"
                            name="date"
                            value={values.date || ""}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                        <input
                            type="time"
                            name="time"
                            value={values.time || ""}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        />
                        {errors.time && <span className="text-red-600 text-xs">{errors.time}</span>}
                    </div>
                </div>

                <div id="participants-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество участников</label>
                    <input
                        type="number"
                        min="1"
                        name="participants_count"
                        value={values.participants_count || ""}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Выберите необходимое количество участников"
                    />
                    {errors.participants_count && (
                        <span className="text-red-600 text-xs">{errors.participants_count}</span>
                    )}
                </div>

                <div>
                    <CoordinatorsMultiSelect value={values.coordinate_ids || []} onChange={handleCoordinatorsChange} />
                </div>

                <div>
                    <CategoryMultiSelect value={values.category_ids || []} onChange={handleCategoryChange} />
                </div>

                <div id="points-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Максимальное количество баллов
                    </label>
                    <input
                        type="number"
                        name="max_score"
                        value={values.max_score || ""}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Выберите максимальное количество баллов"
                    />
                    {errors.max_score && <span className="text-red-600 text-xs">{errors.max_score}</span>}
                </div>

                {error && (
                    <Fade in={Boolean(error)} timeout={600}>
                        <Alert severity="error" className="mt-4">
                            {error}
                        </Alert>
                    </Fade>
                )}

                <div id="form-actions" className="flex items-center justify-end space-x-4 pt-6">
                    <Link
                        to={ROUTES.ACCOUNT_ORGANIZATION}
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Отмена
                    </Link>
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-md ${
                            isValid ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-300 text-gray-500"
                        }`}
                        disabled={!isValid}
                    >
                        Создать задание
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TaskForm;
