import { Button } from '@/components/ui/button';
import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const { currentUser, logout } = useChat();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">ChatApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
