import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAutocomplete from "@mui/material/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthProvider";
import { taskServiceApi } from "../../utils/api/task_service";

export default function CategoryMultiSelect({ value, onChange }) {
    const { token, logout } = useContext(AuthContext);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        taskServiceApi
            .getAllCategories(token, logout)
            .then((data) => {
                const transformedData = Object.entries(data.data || {}).map(([id, name]) => ({
                    ID: id,
                    Name: name,
                }));
                setOptions(transformedData);
            })
            .catch((err) => console.error("Ошибка получения всех категорий:", err));
    }, [token]);

    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: "category-multi-select",
        multiple: true,
        options,
        getOptionLabel: (option) => option.Name || "",
        value,
        onChange: (e, newValue) => onChange(newValue),
        filterSelectedOptions: true,
        isOptionEqualToValue: (option, val) => option.ID === val.ID,
        openOnFocus: true,
    });

    return (
        <div className="w-full relative text-sm text-gray-800">
            <label className="block mb-1 font-medium">Категории</label>
            <div
                {...getRootProps()}
                ref={setAnchorEl}
                className={`flex flex-wrap p-1 border rounded-md ${
                    focused ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                }`}
            >
                {value.map((option, index) => {
                    const { key, onDelete, ...restTagProps } = getTagProps({ index });
                    return (
                        <div
                            key={option.ID || index}
                            {...restTagProps}
                            className="flex items-center bg-gray-100 text-gray-700 rounded px-2 py-1 mr-1 mb-1"
                        >
                            <span className="truncate">{option.Name}</span>
                            <CloseIcon className="w-4 h-4 ml-1 cursor-pointer" onClick={onDelete} />
                        </div>
                    );
                })}

                <input {...getInputProps()} className="flex-1 p-1 outline-none" placeholder="Выберите категории" />
            </div>
            {groupedOptions.length > 0 && (
                <ul
                    {...getListboxProps()}
                    className="mt-1 max-h-60 overflow-auto border rounded-md shadow-md bg-white absolute z-10 w-full"
                >
                    {groupedOptions.map((option, index) => (
                        <li
                            key={option.ID || index}
                            {...getOptionProps({ option, index })}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <span className="flex-grow">{option.Name}</span>
                            <CheckIcon className="w-4 h-4 text-transparent" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

CategoryMultiSelect.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};
