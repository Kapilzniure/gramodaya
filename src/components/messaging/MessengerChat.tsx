import React from 'react';
import { Image, Mic, Send, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MessengerChat: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">John Doe</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Online</span>
          </div>
        </div>
        {/* Add more header actions here if needed */}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
        {/* Placeholder for messages */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg max-w-xs">
              <p>Hi, is this item still available?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
              <p>Yes, it is!</p>
            </div>
          </div>
          {/* Product Preview Card Placeholder */}
          <div className="flex justify-center my-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 w-full max-w-sm">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h4 className="font-semibold text-base">Vintage Camera</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Price: $150</p>
                <Button variant="link" size="sm" className="p-0 h-auto">View Listing</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <PlusCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Button>
        <Input
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Button>
        <Button type="submit" size="icon" className="rounded-full">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessengerChat;