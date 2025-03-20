import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAutocomplete from "@mui/material/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { userServiceApi } from "../../utils/api/user_service";
import { AuthContext } from "../../context/AuthProvider";

export default function CoordinatorsMultiSelect({ value, onChange }) {
    const { token } = useContext(AuthContext);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        userServiceApi
            .getUsersInOrganization(token)
            .then((data) => setOptions(data.data || []))
            .catch((err) => console.error("Ошибка получения пользователей:", err));
    }, [token]);

    const getFullName = (option) => `${option.surname || ""} ${option.name || ""} ${option.patronymic || ""}`.trim();

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        setAnchorEl,
        groupedOptions,
        focused,
    } = useAutocomplete({
        id: "coordinators-multi-select",
        multiple: true,
        options,
        value,
        filterSelectedOptions: true,
        openOnFocus: true,
        getOptionLabel: getFullName,
        onChange: (event, newValue) => onChange(newValue),
        isOptionEqualToValue: (option, val) => option.id === val.id,
    });

    return (
        <div className="w-full text-gray-800 text-sm relative">
            <label {...getInputLabelProps()} className="block mb-1">
                Координаторы
            </label>
            <div
                {...getRootProps()}
                ref={setAnchorEl}
                className={`flex flex-wrap p-1 border rounded-md ${
                    focused ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                }`}
            >
                {value.map((option, index) => {
                    const { key, onDelete, ...tagProps } = getTagProps({ index });
                    return (
                        <div
                            key={key}
                            {...tagProps}
                            className="flex items-center bg-gray-100 text-gray-700 rounded px-2 py-1 mr-1 mb-1"
                        >
                            <span className="truncate">{getFullName(option)}</span>
                            <CloseIcon className="w-4 h-4 ml-1 cursor-pointer" onClick={onDelete} />
                        </div>
                    );
                })}
                <input {...getInputProps()} className="flex-1 p-1 outline-none" placeholder="Выберите координаторов" />
            </div>
            {groupedOptions.length > 0 && (
                <ul
                    {...getListboxProps()}
                    className="mt-1 max-h-60 overflow-auto border rounded-md shadow-md bg-white absolute z-10 w-full"
                >
                    {groupedOptions.map((option, index) => {
                        const { key, ...optionProps } = getOptionProps({
                            option,
                            index,
                        });
                        return (
                            <li
                                key={key}
                                {...optionProps}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <span className="flex-grow">{getFullName(option)}</span>
                                <CheckIcon className="w-4 h-4 text-transparent" />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

CoordinatorsMultiSelect.propTypes = {
    value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};
