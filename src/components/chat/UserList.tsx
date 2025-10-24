import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const UserList = () => {
  const { users, conversations, selectedUserId, selectUser } = useChat();

  const getLastMessage = (userId: string) => {
    const conversation = conversations.get(userId);
    if (!conversation || conversation.messages.length === 0) return null;
    return conversation.messages[conversation.messages.length - 1];
  };

  const sortedUsers = [...users].sort((a, b) => {
    const lastMsgA = getLastMessage(a.id);
    const lastMsgB = getLastMessage(b.id);
    
    if (!lastMsgA && !lastMsgB) return 0;
    if (!lastMsgA) return 1;
    if (!lastMsgB) return -1;
    
    return lastMsgB.timestamp.getTime() - lastMsgA.timestamp.getTime();
  });

  return (
    <div className="w-80 border-r bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Messages</h2>
        <p className="text-sm text-muted-foreground">{users.length} contacts</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {sortedUsers.map(user => {
            const conversation = conversations.get(user.id);
            const lastMessage = getLastMessage(user.id);
            const unreadCount = conversation?.unreadCount || 0;

            return (
              <button
                key={user.id}
                onClick={() => selectUser(user.id)}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-colors hover:bg-accent",
                  selectedUserId === user.id && "bg-accent"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                        user.isOnline ? "bg-[hsl(var(--online-status))]" : "bg-[hsl(var(--offline-status))]"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-medium truncate">{user.name}</p>
                      {lastMessage && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(lastMessage.timestamp, { addSuffix: false })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {lastMessage?.content || 'No messages yet'}
                      </p>
                      {unreadCount > 0 && (
                        <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserList;
