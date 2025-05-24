function FormHeader({isNew}) {
    return (
        <div id="form-header" className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">{isNew ? 'Создать новое задание' : 'Редактировать задание'}</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
                Заполните все необходимые поля для создания волонтерского задания
            </p>
        </div>
    );
}

export default FormHeader;
