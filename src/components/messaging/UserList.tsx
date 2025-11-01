






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



    <div className="w-80 border-r bg-card/50 backdrop-blur-sm flex flex-col shadow-lg">



      <div className="p-5 border-b bg-gradient-to-br from-primary/5 via-primary/10 to-transparent relative overflow-hidden">



        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />



        <div className="relative">



          <h2 className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Messages</h2>



          <p className="text-sm text-muted-foreground font-medium mt-1">AI Assistants</p>



        </div>



      </div>



      <ScrollArea className="flex-1">



        <div className="p-3 space-y-2">



          {sortedUsers.map(user => {



            const conversation = conversations.get(user.id);



            const lastMessage = getLastMessage(user.id);



            const unreadCount = conversation?.unreadCount || 0;







            return (



              <button



                key={user.id}



                onClick={() => selectUser(user.id)}



                className={cn(



                  "w-full p-4 rounded-2xl text-left transition-all duration-300 hover-lift group relative overflow-hidden",



                  selectedUserId === user.id 



                    ? "bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 shadow-md border-2 border-primary/30" 



                    : "bg-muted/30 hover:bg-muted/50 border-2 border-transparent"



                )}



              >



                {selectedUserId === user.id && (



                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />



                )}



                <div className="flex items-start gap-3 relative">



                  <div className="relative">



                    <Avatar className="w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 shadow-md">



                      <AvatarImage src={user.avatar} />



                      <AvatarFallback className="gradient-orange text-white font-semibold">{user.name.charAt(0)}</AvatarFallback>



                    </Avatar>



                    <div



                      className={cn(



                        "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card shadow-lg transition-all duration-300",



                        user.isOnline ? "bg-[hsl(var(--online-status))] animate-pulse" : "bg-[hsl(var(--offline-status))]"



                      )}



                    />



                  </div>



                  <div className="flex-1 min-w-0">



                    <div className="flex items-center justify-between gap-2 mb-1.5">



                      <p className="font-bold truncate text-base">{user.name}</p>



                      {lastMessage && (



                        <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">



                          {formatDistanceToNow(lastMessage.timestamp, { addSuffix: false })}



                        </span>



                      )}



                    </div>



                    <div className="flex items-center gap-2">



                      <p className="text-sm text-muted-foreground truncate flex-1 leading-relaxed">



                        {lastMessage?.content || 'Start a conversation'}



                      </p>



                      {unreadCount > 0 && (



                        <Badge className="h-6 min-w-6 px-2 text-xs gradient-orange text-white shadow-md animate-pulse">



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




