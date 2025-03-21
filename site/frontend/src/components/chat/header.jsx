function Header({ onMenuClick }) {
    return (
        <header className="border-b border-neutral-200">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
                <div className="flex items-center gap-2 sm:gap-3">
                    <button 
                        className="sm:hidden p-1 hover:bg-neutral-100 rounded-full"
                        onClick={onMenuClick}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </svg>
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <img 
                            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full"
                            src="https://api.dicebear.com/7.x/notionists/svg?seed=123" 
                            alt="avatar"
                        />
                        <div>
                            <h1 className="text-xs sm:text-sm md:text-base">Анна Волкова</h1>
                            <p className="text-[10px] sm:text-xs flex items-center gap-1 text-neutral-600">
                                <span className="w-2 h-2 bg-green-500 rounded-full"/>
                                В сети
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <button className="hidden sm:inline-flex p-1.5 hover:bg-neutral-100 rounded-full">
                        <svg className="w-5 h-5" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M164.9..."/>
                        </svg>
                    </button>
                    <button className="p-1.5 hover:bg-neutral-100 rounded-full">
                        <svg className="w-5 h-5" viewBox="0 0 128 512">
                            <path fill="currentColor" d="M64..."/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
export default Header;