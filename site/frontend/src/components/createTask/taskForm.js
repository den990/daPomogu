import { Link, useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { useContext, useState } from "react";
import { taskServiceApi } from "../../utils/api/task_service";
import { AuthContext } from "../../context/AuthProvider";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categoriesOptions = [
    { id: 1, name: "Экология" },
    { id: 2, name: "Образование" },
    { id: 3, name: "Спорт" },
    { id: 4, name: "Культура" },
];

function TaskForm() {
    const { values, errors, isValid, handleChange, setValues } = useFormWithValidation();
    const { token } = useContext(AuthContext)
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

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
            coordinate_ids: Array.isArray(coordinate_ids) ? coordinate_ids.map(Number) : [],
            category_ids: Array.isArray(category_ids) ? category_ids.map(Number) : [],
        };

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
            // navigate(ROUTES.LOGIN);
        } catch (error) {
            setError("Произошла ошибка при создании задания. Попробуйте снова");
        }
    };

    const handleCategoryChange = (event) => {
        const {
          target: { value },
        } = event;
        const selected = (typeof value === 'string' ? value.split(',') : value).map(Number);
        setValues({ ...values, category_ids: selected });
    };

    return (
        <form id="task-form" className="bg-white rounded-lg shadow-md p-4 md:p-6" onSubmit={handleSubmit}>
            <div className="space-y-4 md:space-y-6">
                <div id="task-name-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название задания</label>
                    <input 
                        type="text"
                        name="name" 
                        value={values?.name || ''} 
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                    />
                </div>
                <div id="task-type-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select
                        name="task_type" 
                        value={values?.task_type || ''} 
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
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
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                    >
                    </textarea>
                </div>
                <div id="location-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <div className="flex flex-wrap gap-2">
                        <input 
                            type="text"
                            name="location"
                            value={values?.location || ''} 
                            onChange={handleChange}
                            className="flex-grow min-w-[200px] px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                            placeholder="Введите адрес" 
                        />
                        <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex-shrink-0">
                            <img className="w-3 h-4 md:w-4 md:h-5" src={require("../../images/placemark_grey.svg").default} alt="placemark" />
                        </button>
                    </div>
                </div>
                <div id="datetime-field" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input 
                            type="date"
                            name="date"
                            value={values.date || ""}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                        <input 
                            type="time"
                            name="time"
                            value={values.time || ""}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
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
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                    />
                </div>
                <div id="coordinators-field" className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Координаторы</label>
                <select 
                    name="coordinate_ids"
                    value={values.coordinate_ids && values.coordinate_ids[0] ? values.coordinate_ids[0] : ""}
                    onChange={(e) => {
                    const num = Number(e.target.value);
                    setValues({ ...values, coordinate_ids: [num] });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                    <option value="3">Волонтёр 1</option>
                    <option value="2">Волонтёр 2</option>
                </select>
                </div>
                <div id="categories-field" className="form-group">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="categories-select-label">Категории</InputLabel>
                    <Select
                    labelId="categories-select-label"
                    id="categories-select"
                    multiple
                    name="category_ids"
                    value={values.category_ids || []}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Категории" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                            const category = categoriesOptions.find(cat => cat.id === value);
                            return (
                            <Chip
                                key={value}
                                label={category ? category.name : value}
                            />
                            );
                        })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    >
                    {categoriesOptions.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                        {category.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </div>
                <div id="points-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Максимальное количество баллов</label>
                    <input 
                        type="number"
                        name="max_score"
                        value={values.max_score || ""}
                        onChange={handleChange}
                        min="0" 
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                    />
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div id="form-actions" className="flex items-center justify-end space-x-4 pt-6">
                    <Link to={ROUTES.ACCOUNT_ORGANIZATION} type="button" className="px-4 md:px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-center text-sm md:text-base">
                        Отмена
                    </Link>
                    <button type="submit" className="px-4 md:px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm md:text-base">
                        Создать задание
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TaskForm;