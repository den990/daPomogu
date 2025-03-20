function header() {
    return (
        <header id="header" className="bg-white border-b border-neutral-200 fixed w-full z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg">
                            <img style={{width: 18, height: 20}} src={require("../../images/arrow-back_red.svg").default} alt="arrow-back" />
                        </button>
                        <h1 className="text-xl">Фотоотчет по задаче</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-neutral-200 rounded-full text-sm">На проверке</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default header;