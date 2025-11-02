






import { MessageCircle } from 'lucide-react';



import { Button } from '@/components/ui/button';



import { useState } from 'react';



import { Dialog, DialogContent } from '@/components/ui/dialog';



import { ChatProvider } from '@/contexts/ChatContext';



import ChatWindow from './ChatWindow';







interface ChatButtonProps {



  sellerId: string;



  sellerName: string;



}







export const ChatButton = ({ sellerId, sellerName }: ChatButtonProps) => {



  const [isOpen, setIsOpen] = useState(false);







  return (



    <>



      <Button 



        variant="outline" 



        size="lg"



        onClick={() => setIsOpen(true)}



        className="flex-1"



      >



        <MessageCircle className="mr-2 h-5 w-5" />



        Message Seller



      </Button>







      <Dialog open={isOpen} onOpenChange={setIsOpen}>



        <DialogContent className="max-w-[800px] h-[600px] p-0">



          <ChatProvider>



            <div className="flex h-full">



              <ChatWindow />



            </div>



          </ChatProvider>



        </DialogContent>



      </Dialog>



    </>



  );



};







export default ChatButton;




