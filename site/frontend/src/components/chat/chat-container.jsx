function ChatContainer() {
    return (
        <main className="pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-16 md:pb-20">
            <div className="px-2 sm:px-3 md:px-4">
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                    <div className="text-center text-[10px] sm:text-xs md:text-sm text-neutral-500">Сегодня</div>

                    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                        <div className="flex justify-start">
                            <div className="bg-neutral-100 rounded-xl rounded-tl-none px-2.5 py-1.5 sm:px-3 sm:py-2 max-w-[80%] sm:max-w-[75%] md:max-w-[70%]">
                                <p className="text-xs sm:text-sm md:text-base">Здравствуйте! Хочу узнать о программе</p>
                                <div className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500 mt-0.5">
                                    10:23
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-red-600 text-white rounded-xl rounded-tr-none px-2.5 py-1.5 sm:px-3 sm:py-2 max-w-[80%] sm:max-w-[75%] md:max-w-[70%]">
                                <p className="text-xs sm:text-sm md:text-base">
                                    Добрый день! Расскажу о программе поддержки
                                </p>
                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-red-200">10:25</span>
                                    <img
                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                        src={require("../../images/double-check_white.svg").default}
                                        alt="status"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default ChatContainer;
