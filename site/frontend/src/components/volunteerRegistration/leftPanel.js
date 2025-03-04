function leftPanel() {
    return (
        <div id="left-panel" className="hidden lg:flex lg:w-1/2 bg-red-600">
            <div className="flex flex-col justify-center px-12 py-12">
                <h1 className="text-4xl font-bold text-white mb-6">Присоединяйтесь к сообществу волонтеров</h1>
                <p className="text-white/90 text-lg mb-8">Помогайте другим и делайте мир лучше вместе с нами</p>
                <div className="flex items-center space-x-4 text-white/90">
                    <img style={{width: 24, height: 24}} src={require("../../images/heart_white.svg").default} alt="heart" />
                    <span>Более 1000 активных волонтеров</span>
                </div>
                <div className="flex items-center space-x-4 text-white/90 mt-4">
                    <img style={{width: 30, height: 24}} src={require("../../images/handshake_white.svg").default} alt="handshake" />
                    <span>Множество важных проектов</span>
                </div>
            </div>
        </div>
    );
}

export default leftPanel;