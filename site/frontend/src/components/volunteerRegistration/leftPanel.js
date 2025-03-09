function leftPanel() {
    return (
        <div id="left-panel" className="hidden lg:flex lg:w-1/2 bg-red-600">
            <div className="flex flex-col justify-center px-12 py-12">
                <h1 className="text-4xl font-bold text-white mb-6">Присоединяйтесь к сообществу волонтеров</h1>
                <p className="text-white/90 text-lg mb-8">Помогайте другим и делайте мир лучше вместе с нами</p>
            </div>
        </div>
    );
}

export default leftPanel;