import { useState, useCallback } from "react";

export default function useFormWithValidation(formType = 'volunteer') {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // Общие валидации
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Обязательное поле";
        if (!regex.test(email)) return "Некорректный email";
        return "";
    };

    const validatePhone = (phone) => {
        const regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (!phone) return "Обязательное поле";
        if (!regex.test(phone)) {
            return "Введите номер в форматах: +7(XXX)XXX-XX-XX, 8(XXX)XXX-XX-XX";
        }
        // Дополнительная проверка на минимальное количество цифр (10 без кода страны)
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) return "Номер слишком короткий";
        if (digitsOnly.length > 11) return "Номер слишком длинный";
        
        return "";
    };

    const validateName = (name) => {
        const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
        if (!name) return "Обязательное поле";
        if (!regex.test(name)) return "Может содержать только буквы, пробелы и дефисы";
        if (name.length > 50) return "Слишком длинное значение";
        return "";
    };

    const validateAddress = (address) => {
        const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-.,()/]+$/;
        if (!address) return "Обязательное поле";
        if (address.length > 200) return "Слишком длинный адрес";
        if (!regex.test(address)) return "Адрес содержит недопустимые символы";
        return "";
    };

    // Специфичные валидации для волонтеров
    const validateVolunteerField = (name, value) => {
        switch (name) {
            case 'surname':
            case 'name':
            case 'patronymic':
                return validateName(value);
            case 'date_of_birthday':
                const birthDate = new Date(value);
                const today = new Date();
                const minDate = new Date();
                minDate.setFullYear(today.getFullYear() - 120);
                
                if (!value) return "Обязательное поле";
                if (birthDate > today) return "Дата не может быть в будущем";
                if (birthDate < minDate) return "Некорректная дата";
                
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
                if (age < 18) return "Должно быть ≥ 18 лет";
                return "";
            case 'password':
                if (!value) return "Обязательное поле";
                if (value.length < 6) return "Минимум 6 символов";
                return "";
            case 'password_confirmation':
                if (!value) return "Обязательное поле";
                if (value !== values.password) return "Пароли не совпадают";
                return "";
            default:
                return "";
        }
    };

    const validateLegalName = (name) => {
        const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s\"\-\–\—\«\»\'\‘\’\“\”]+$/;
        if (!name) return "Обязательное поле";
        if (name.length > 100) return "Слишком длинное название (макс. 100 символов)";
        if (!regex.test(name)) return "Недопустимые символы в названии";
        return "";
    };

    // Специфичные валидации для организаций
    const validateOrganizationField = (name, value) => {
        switch (name) {
            case 'legal_name':
                return validateLegalName(value);
            case 'inn':
                const regex = /^\d{10}$/; 
                if (!value) return "Обязательное поле";
                if (!regex.test(value)) return "ИНН должен содержать ровно 10 цифр";
                return "";
            case 'full_name_owner':
                return validateName(value);
            case 'legal_address':
            case 'actual_address':
                return validateAddress(value);
            default:
                return "";
        }
    };

    const handleChange = (evt) => {
        const target = evt.target;
        const { name, value, type, checked } = target;
        const newValue = type === "checkbox" ? checked : value;

        const newValues = { ...values, [name]: newValue };
        setValues(newValues);

        let errorMessage = "";
        
        // Общие поля
        if (name === 'email') errorMessage = validateEmail(newValue);
        else if (name === 'phone') errorMessage = validatePhone(newValue);
        // Специфичные валидации
        else if (formType === 'volunteer') errorMessage = validateVolunteerField(name, newValue);
        else if (formType === 'organization') errorMessage = validateOrganizationField(name, newValue);

        const newErrors = { ...errors, [name]: errorMessage };
        setErrors(newErrors);

        // Проверка валидности всей формы
        setIsValid(checkFormValidity(newValues, newErrors, formType));
    };

    const checkFormValidity = (values, errors, type) => {
        if (type === 'volunteer') {
            return (
                values.surname && !errors.surname &&
                values.name && !errors.name &&
                values.email && !errors.email &&
                values.phone && !errors.phone &&
                values.date_of_birthday && !errors.date_of_birthday &&
                values.registration_address && !errors.registration_address &&
                values.password && !errors.password &&
                values.password_confirmation && !errors.password_confirmation &&
                values.terms
            );
        } else {
            return (
                values.name && !errors.name &&
                values.email && !errors.email &&
                values.phone && !errors.phone &&
                values.inn && !errors.inn &&
                values.legal_address && !errors.legal_address &&
                values.actual_address && !errors.actual_address &&
                values.full_name_owner && !errors.full_name_owner
            );
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, errors, isValid, setValues, handleChange, setIsValid, resetForm };
}