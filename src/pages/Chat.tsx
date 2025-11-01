






import { ChatProvider } from '@/contexts/ChatContext';



import ChatHeader from '@/components/messaging/ChatHeader';



import ChatWindow from '@/components/messaging/ChatWindow';



import UserList from '@/components/messaging/UserList';







const Chat = () => {



  return (



    <ChatProvider>



      <div className="flex h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-xl">



        <UserList />



        <div className="flex-1 flex flex-col">



          <ChatHeader />



          <ChatWindow />



        </div>



      </div>



    </ChatProvider>



  );



};







export default Chat;




