function leftPanel() {
    return (
        <div id="auth-left-panel" className="hidden lg:flex lg:w-1/2 bg-red-600 relative">
            <div className="relative z-10 p-12 flex flex-col justify-center h-full text-white">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Платформа для волонтерских организаций</h1>
                    <p className="text-xl opacity-90">Находите добровольцев и управляйте волонтерской деятельностью эффективно</p>
                </div>
            </div>
        </div>
    );
}

export default leftPanel;