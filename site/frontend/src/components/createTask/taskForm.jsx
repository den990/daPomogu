import { Link, useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { useContext, useEffect, useState } from "react";
import { taskServiceApi } from "../../utils/api/task_service";
import { AuthContext } from "../../context/AuthProvider";
import CategoryMultiSelect from "./CategoryMultiSelect";
import CoordinatorsMultiSelect from "./CoordinatorsMultiSelect";

function TaskForm() {
    const { values, errors, isValid, handleChange, setValues } = useFormWithValidation();
    const { token } = useContext(AuthContext)
    const [error, setError] = useState("");
    const [categories] = useState([]);
    const [coordinators] = useState([
      { id: 1, name: "Волонтёр 1" },
      { id: 2, name: "Волонтёр 2" },
    ]);

    useEffect(() => {
        if (!values.task_type) {
            setValues({ ...values, task_type: "1" });
        }
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

        const {name, task_type, description, location, date, time, participants_count, max_score, coordinate_ids, category_ids} = values;
        
        let task_date = null;
        if (date && time) {
        task_date = new Date(`${date}T${time}`);
        }

        const payload = {
            name: name || "",
            task_type: Number(task_type),
            description: description || "",
            location: location || "",
            task_date,
            participants_count: Number(participants_count),
            max_score: Number(max_score),
            coordinate_ids: Array.isArray(coordinate_ids)
                ? coordinate_ids.map((coord) => coord.id)
                : [],
            category_ids: Array.isArray(category_ids)
                ? category_ids.map((cat) => cat.ID)
                : [],
        }

        console.log("Отправляемые данные:", payload);
        
        try {
            await taskServiceApi.postCreateTask(
                token,
                payload.name,
                payload.task_type,
                payload.description,
                payload.location,
                payload.task_date,
                payload.participants_count,
                payload.max_score,
                payload.coordinate_ids,
                payload.category_ids)
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
                        value={values?.name || ''} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите название"
                    />
                </div>
                <div id="task-type-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select
                        name="task_type" 
                        value={values?.task_type || ''} 
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
                        value={values?.description || ''} 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Введите описание"    
                    >
                    </textarea>
                </div>
                <div id="location-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <div className="flex space-x-4">
                        <input 
                            type="text"
                            name="location"
                            value={values?.location || ''} 
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200" 
                            placeholder="Введите адрес" 
                        />
                        <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                            <img style={{width: 12, height: 16}} src={require("../../images/placemark_grey.svg").default} alt="placemark" />
                        </button>
                    </div>
                </div>
                <div id="datetime-field" className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input 
                            type="date"
                            name="date"
                            value={values.date || ""}
                            onChange={handleChange}
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200" 
                        />
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Выберите необходимое количество участников"
                    />
                </div>

                <div id="coordinators-field" className="form-group">
                    <CoordinatorsMultiSelect
                        value={values.coordinate_ids || []}
                        onChange={handleCoordinatorsChange}
                        options={coordinators}
                    />
                </div>

                <div id="category-field" className="form-group">
                    <CategoryMultiSelect
                        value={values.category_ids || []}
                        onChange={handleCategoryChange}
                        options={categories}
                    />
                </div>

                <div id="points-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Максимальное количество баллов</label>
                    <input 
                        type="number"
                        name="max_score"
                        value={values.max_score || ""}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-200 focus:border-blue-200"
                        placeholder="Выберите максимальное количество баллов"
                    />
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div id="form-actions" className="flex items-center justify-end space-x-4 pt-6">
                    <Link to={ROUTES.ACCOUNT_ORGANIZATION} type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Отмена
                    </Link>
                    <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Создать задание
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TaskForm;