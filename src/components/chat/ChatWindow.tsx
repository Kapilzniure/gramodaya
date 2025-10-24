import { useState, useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

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

    sendMessage(selectedUserId, message);
    setMessage('');
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">Choose a contact to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b p-4 bg-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedUser.avatar} />
              <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                selectedUser.isOnline ? "bg-[hsl(var(--online-status))]" : "bg-[hsl(var(--offline-status))]"
              )}
            />
          </div>
          <div>
            <p className="font-semibold">{selectedUser.name}</p>
            <p className="text-sm text-muted-foreground">
              {selectedUser.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {conversation?.messages.map((msg) => {
            const isSent = msg.senderId === currentUser?.id;
            const sender = users.find(u => u.id === msg.senderId) || currentUser;

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  isSent ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={sender?.avatar} />
                  <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-[70%] space-y-1",
                    isSent ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2 shadow-sm",
                      isSent
                        ? "bg-[hsl(var(--chat-bubble-sent))] text-primary-foreground rounded-br-sm"
                        : "bg-[hsl(var(--chat-bubble-received))] text-card-foreground rounded-bl-sm"
                    )}
                  >
                    <p className="text-sm break-words">{msg.content}</p>
                  </div>
                  <p className={cn(
                    "text-xs text-muted-foreground px-1",
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
      <div className="border-t p-4 bg-card">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
