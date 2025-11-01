import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';

const ChatHeader = () => {
  const { currentUser } = useChat();

  return (
    <header className="border-b bg-card px-6 py-4 shadow-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="gradient-orange text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-glow-orange transform hover:scale-105 transition-transform duration-300">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">ChatApp</h1>
            <p className="text-xs text-muted-foreground">Real-time messaging</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
            <Avatar className="w-10 h-10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback className="gradient-orange text-white">{currentUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">{currentUser?.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
