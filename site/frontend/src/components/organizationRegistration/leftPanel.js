function leftPanel() {
    return (
        <div id="auth-left-panel" className="hidden lg:flex lg:w-1/2 bg-red-600 relative">
            <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Платформа для волонтерских организаций</h1>
                    <p className="text-xl opacity-90">Находите добровольцев и управляйте волонтерской деятельностью эффективно</p>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <img style={{width: 30, height: 24}} src={require("../../images/people_white.svg").default} alt="people" />
                        <p>Быстрый поиск волонтеров</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <img style={{width: 24, height: 24}} src={require("../../images/graphic_white.svg").default} alt="graphic" />
                        <p>Учет активности</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <img style={{width: 24, height: 24}} src={require("../../images/shield_white.svg").default} alt="shield" />
                        <p>Безопасность данных</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default leftPanel;