function header() {
    return (
        <header id="header" className="border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="rounded-lg p-2 hover:bg-neutral-100">
                            <img style={{width: 18, height: 20}} src={require("../../images/arrow-back_red.svg").default} alt="arrow-back" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default header;