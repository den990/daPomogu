function chatContainer() {
    return (
        <main id="chat-container" className="pt-20 pb-20">
            <div className="max-w-3xl mx-auto px-4">
                <div className="space-y-6">
                    <div className="text-center text-sm text-neutral-500">Сегодня</div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-start">
                            <div className="bg-neutral-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[70%]">
                                <p>Здравствуйте! Я хотела бы узнать подробнее о волонтерской программе.</p>
                                <div className="text-xs text-neutral-500 mt-1">10:23</div>
                            </div>
                        </div>
                    <div className="flex justify-end">
                        <div className="bg-red-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[70%]">
                            <p>Добрый день! Конечно, я расскажу вам о нашей программе поддержки пожилых людей.</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-neutral-300">10:25</span>
                                <img style={{width: 11, height: 12}} src={require("../../images/double-check_white.svg").default} alt="double-check" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default chatContainer;