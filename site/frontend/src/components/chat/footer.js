function footer() {
    return (
        <footer id="footer" class="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200">
            <div class="max-w-3xl mx-auto px-4 py-3">
                <div class="flex items-center gap-3">
                    <input type="text" placeholder="Написать сообщение..." class="flex-1 border border-neutral-200 rounded-full px-4 py-2 focus:outline-none focus:border-neutral-400" />
                    <button class="p-2 hover:bg-neutral-100 rounded-full">
                    <img style={{width: 16, height: 20}} src={require("../../images/telegram_red.svg").default} alt="telegram-dark" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default footer;