






import { useAIChat } from '@/contexts/AIChatContext';



import { useChat } from '@/contexts/ChatContext';



import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';



import { Button } from '@/components/ui/button';



import { BellIcon, MoreVerticalIcon, PhoneCallIcon, VideoIcon } from 'lucide-react';



import { cn } from '@/lib/utils';







const ChatHeader = () => {



  let users, selectedUserId;







  try {



    ({ users, selectedUserId } = useAIChat());



  } catch (e) {



    ({ users, selectedUserId } = useChat());



  }







  const selectedUser = users.find(user => user.id === selectedUserId);







  if (!selectedUser) {



    return null;



  }







  return (



    <div className="px-6 py-4 border-b bg-card/50 backdrop-blur-sm relative">



      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent" />



      <div className="flex items-center gap-4 relative">



        <div className="relative">



          <Avatar className="w-12 h-12 ring-2 ring-primary/20">



            <AvatarImage src={selectedUser.avatar} />



            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>



          </Avatar>



          <div



            className={cn(



              "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card shadow-lg",



              selectedUser.isOnline ? "bg-[hsl(var(--online-status))] animate-pulse" : "bg-[hsl(var(--offline-status))]"



            )}



          />



        </div>



        <div className="flex-1">



          <h3 className="font-semibold text-lg leading-none mb-1">{selectedUser.name}</h3>



          <p className="text-sm text-muted-foreground">



            {selectedUser.isOnline ? 'Online' : 'Offline'}



          </p>



        </div>



        <div className="flex items-center gap-1.5">



          <Button variant="ghost" size="icon" className="rounded-xl">



            <PhoneCallIcon className="w-5 h-5" />



          </Button>



          <Button variant="ghost" size="icon" className="rounded-xl">



            <VideoIcon className="w-5 h-5" />



          </Button>



          <Button variant="ghost" size="icon" className="rounded-xl">



            <BellIcon className="w-5 h-5" />



          </Button>



          <Button variant="ghost" size="icon" className="rounded-xl">



            <MoreVerticalIcon className="w-5 h-5" />



          </Button>



        </div>



      </div>



    </div>



  );



};







export default ChatHeader;




