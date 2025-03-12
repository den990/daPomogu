import Header from '../components/chat/header';
import ChatContainer from '../components/chat/chat-container';
import Footer from '../components/chat/footer';
import RoleHeader from '../components/RoleHeader';

function Chat() {
    return (
        <div className="h-screen flex flex-col">
            <RoleHeader />
            <div id="chat-page" className="flex flex-1 bg-neutral-50 p-4 gap-4">
                <div id="applications-list" className="w-1/4 rounded-lg border bg-white p-4 h-auto overflow-auto">
                    <h2 className="text-lg mb-4">Заявки</h2>
                    <div className="space-y-3">
                        <div className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50">
                            <div className="flex items-center gap-3">
                                <img className="h-10 w-10 rounded-full" alt="user-photo" src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=1" />
                                <div>
                                    <p>Волонтерская организация #1</p>
                                    <p className="text-sm text-neutral-600">20.02.2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer rounded-lg border bg-neutral-50 p-3">
                            <div className="flex items-center gap-3">
                                <img className="h-10 w-10 rounded-full" alt="user-photo" src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2"/>
                                <div>
                                    <p>Волонтерская организация #2</p>
                                    <p className="text-sm text-neutral-600">19.02.2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col">
                    <Header />
                    <div className="flex-1 flex flex-col-reverse overflow-auto p-4">
                        <ChatContainer />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Chat;