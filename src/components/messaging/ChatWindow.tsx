import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useChat } from '@/contexts/ChatContext';

const ChatWindow = () => {
  const { currentUser, users, conversations, selectedUserId, sendMessage } = useChat();
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedUser = users.find(u => u.id === selectedUserId);
  const conversation = selectedUserId ? conversations.get(selectedUserId) : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedUserId) return;

    sendMessage(message);
    setMessage('');
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-muted/20 via-muted/10 to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="text-center space-y-6 relative z-10 animate-fade-in">
          <div className="mx-auto w-24 h-24 rounded-3xl gradient-orange flex items-center justify-center shadow-glow-orange animate-scale-in">
            <MessageSquare className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Select a conversation</h3>
            <p className="text-muted-foreground max-w-sm">Choose a seller from the list to start your conversation</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Chat Header */}
      <div className="border-b p-5 bg-card/80 backdrop-blur-sm shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-12 h-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background hover:ring-primary/40 transition-all duration-300">
              <AvatarImage src={selectedUser.avatar} />
              <AvatarFallback className="gradient-orange text-white text-sm">{selectedUser?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-3 border-card shadow-lg",
                selectedUser.isOnline ? "bg-[hsl(var(--online-status))] animate-pulse" : "bg-[hsl(var(--offline-status))]"
              )}
            />
          </div>
          <div>
            <p className="font-bold text-lg">{selectedUser.name}</p>
            <p className={cn(
              "text-sm font-medium flex items-center gap-1.5",
              selectedUser.isOnline ? "text-[hsl(var(--online-status))]" : "text-muted-foreground"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full",
                selectedUser.isOnline ? "bg-[hsl(var(--online-status))] animate-pulse" : "bg-[hsl(var(--offline-status))]"
              )} />
              {selectedUser.isOnline ? 'Active now' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-muted/5 via-transparent to-muted/5" ref={scrollRef}>
        <div className="space-y-6 max-w-4xl mx-auto">
          {conversation?.messages.map((msg) => {
            const isSent = msg.senderId === currentUser?.id;
            const sender = users.find(u => u.id === msg.senderId) || currentUser;

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 animate-fade-in group",
                  isSent ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="w-9 h-9 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                  <AvatarImage src={sender?.avatar} />
                  <AvatarFallback className="gradient-orange text-white text-sm">{sender?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-[70%] space-y-1.5 flex flex-col",
                    isSent ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-3xl px-5 py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]",
                      isSent
                        ? "gradient-orange text-white rounded-br-md shadow-glow-orange/30"
                        : "bg-card border border-border/50 text-card-foreground rounded-bl-md"
                    )}
                  >
                    <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                  </div>
                  <p className={cn(
                    "text-xs text-muted-foreground px-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    isSent && "text-right"
                  )}>
                    {format(msg.timestamp, 'HH:mm')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-6 bg-card/80 backdrop-blur-sm shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <form onSubmit={handleSend} className="flex gap-3 relative z-10 max-w-4xl mx-auto">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-12 rounded-2xl border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm px-5 transition-all duration-300 shadow-sm focus:shadow-md"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!message.trim()}
            className="h-12 w-12 rounded-2xl gradient-orange shadow-lg hover:shadow-glow-orange disabled:opacity-50 disabled:shadow-none transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;