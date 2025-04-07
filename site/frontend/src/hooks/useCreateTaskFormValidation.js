import { useState, useCallback } from "react";

export default function useCreateTaskFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateName = (name) => {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    if (!name) return "Обязательное поле";
    if (!regex.test(name)) return "Может содержать только буквы и дефисы";
    if (name.length < 3) return "Минимум 3 символа";
    if (name.length > 100) return "Максимум 100 символов";
    return "";
  };

  const validateDescription = (description) => {
    if (!description) return "Обязательное поле";
    if (description.length < 10) return "Минимум 10 символов";
    if (description.length > 1000) return "Максимум 1000 символов";
    return "";
  };

  const validateDate = (date, time) => {
    if (!date) return "Укажите дату";
    if (!time) return "Укажите время";
    
    const selectedDate = new Date(`${date}T${time}`);
    const now = new Date();
    
    if (selectedDate < now) return "Дата не может быть в прошлом";
    return "";
  };

  const validateParticipants = (count) => {
    if (!count) return "Укажите количество";
    if (count < 1) return "Минимум 1 участник";
    if (count > 100) return "Максимум 100 участников";
    return "";
  };

  const validateScore = (score) => {
    if (!score) return "Укажите баллы";
    if (score < 0) return "Не может быть отрицательным";
    if (score > 1000) return "Максимум 1000 баллов";
    return "";
  };

  const handleChange = (evt) => {
    const target = evt.target;
    const { name, value, type, checked } = target;
    const newValue = type === 'checkbox' ? checked : value;

    const newValues = { ...values, [name]: newValue };
    setValues(newValues);

    let errorMessage = "";
    
    switch (name) {
      case 'name':
        errorMessage = validateName(newValue);
        break;
      case 'description':
        errorMessage = validateDescription(newValue);
        break;
      case 'date':
      case 'time':
        errorMessage = validateDate(newValues.date, newValues.time);
        break;
      case 'participants_count':
        errorMessage = validateParticipants(newValue);
        break;
      case 'max_score':
        errorMessage = validateScore(newValue);
        break;
      default:
        errorMessage = "";
    }

    const newErrors = { ...errors, [name]: errorMessage };
    setErrors(newErrors);

    // Проверка валидности всей формы
    const formIsValid = 
      !validateName(newValues.name) &&
      !validateDescription(newValues.description) &&
      !validateDate(newValues.date, newValues.time) &&
      !validateParticipants(newValues.participants_count) &&
      !validateScore(newValues.max_score) &&
      newValues.coordinate_ids?.length > 0 &&
      newValues.category_ids?.length > 0 &&
      newValues.address;

    setIsValid(formIsValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, setValues, resetForm };
}