






import { useState } from 'react';



import { MessageCircle, X } from 'lucide-react';



import { Button } from '@/components/ui/button';



import UserList from '@/components/messaging/UserList';



import ChatHeader from '@/components/messaging/ChatHeader';



import ChatWindow from '@/components/messaging/ChatWindow';



import { AIChatProvider } from '@/contexts/AIChatContext';







export const ChatSidebar = () => {



  const [isOpen, setIsOpen] = useState(false);







  if (!isOpen) {



    return (



      <div className="fixed right-4 bottom-4 z-50">



        <Button



          size="icon"



          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 gradient-orange text-white"



          onClick={() => setIsOpen(true)}



        >



          <MessageCircle className="h-6 w-6" />



        </Button>



      </div>



    );



  }







  return (



    <AIChatProvider>



      <div className="fixed right-4 bottom-4 z-50 w-[1881px] h-[1000px] bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col">



        {/* Close Button */}



        <Button



          size="icon"



          variant="ghost"



          className="absolute right-2 top-2 z-50"



          onClick={() => setIsOpen(false)}



        >



          <X className="h-4 w-4" />



        </Button>







        <div className="flex h-full">



          {/* User List */}



          <UserList />



          



          {/* Chat Section */}



          <div className="flex-1 flex flex-col min-w-0">



            <ChatHeader />



            <ChatWindow />



          </div>



        </div>



      </div>



    </AIChatProvider>



  );



};







export default ChatSidebar;




