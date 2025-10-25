import UserList from '@/components/chat/UserList';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatHeader from '@/components/chat/ChatHeader';

const Chat = () => {

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="relative z-10 h-screen flex flex-col">
        <ChatHeader />
        <div className="flex-1 flex overflow-hidden">
          <UserList />
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default Chat;
