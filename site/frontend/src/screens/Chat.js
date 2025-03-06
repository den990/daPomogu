import Header from '../components/chat/header';
import ChatContainer from '../components/chat/chat-container';
import Footer from '../components/chat/footer';

function Chat() {
    return (
        <div className="h-full text-base-content">
            <div id="chat-page" className="min-h-screen bg-neutral-50">
                <Header />
                <ChatContainer />
                <Footer />
            </div>
        </div>
    );
}

export default Chat;