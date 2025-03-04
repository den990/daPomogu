function title() {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img style={{ width: 48, height: 48 }} src={require("../../images/heart_red.svg").default} alt="heart" />
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Войти в систему
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Платформа для волонтерских организаций
                </p>
            </div>
        </div>
    );
}

export default title;