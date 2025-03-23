function Footer() {
    return (
        <footer className="border-t border-neutral-200">
            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                <div className="flex items-center gap-2 sm:gap-3">
                    <input
                        type="text"
                        placeholder="Сообщение..."
                        className="flex-1 border rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    <button className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-full">
                        <img
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            src={require("../../images/telegram_red.svg").default}
                            alt="send"
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
