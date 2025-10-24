import UserList from '@/components/chat/UserList';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatHeader from '@/components/chat/ChatHeader';

const Chat = () => {

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatHeader />
      <div className="flex-1 flex overflow-hidden">
        <UserList />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
