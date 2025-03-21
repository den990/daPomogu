function Header() {
    return (
        <header className="border-b bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4">
                        <button className="rounded-lg p-1 md:p-2 hover:bg-neutral-100">
                            <img 
                                className="w-4 h-5 md:w-5 md:h-6" 
                                src={require("../../images/arrow-back_red.svg").default} 
                                alt="Назад" 
                            />
                        </button>
                        <h1 className="text-base md:text-xl truncate">
                            Волонтерский центр "Надежда"
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;