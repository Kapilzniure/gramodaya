import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import UserList from '@/components/chat/UserList';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatHeader from '@/components/chat/ChatHeader';

const Chat = () => {
  const { currentUser } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

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
