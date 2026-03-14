import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { Mail, Phone, Clock, MessageCircle, User, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

const AdminPanel = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages((data || []).map(msg => ({
        ...msg,
        status: msg.status as 'new' | 'read' | 'replied'
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status: 'read' } : msg
      ));
      toast.success('Marked as read');
    } catch (error) {
      console.error('Error updating message:', error);
      toast.error('Failed to update message');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage contact messages and inquiries</p>
      </div>

      <div className="grid gap-6">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
              <p className="text-muted-foreground">Contact messages will appear here when submitted.</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className={message.status === 'new' ? 'border-primary' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{message.email}</span>
                        </span>
                        {message.phone && (
                          <span className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{message.phone}</span>
                          </span>
                        )}
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={message.status === 'new' ? 'default' : message.status === 'read' ? 'secondary' : 'outline'}>
                      {message.status}
                    </Badge>
                    {message.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(message.id)}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Mark Read</span>
                      </Button>
                    )}
                  </div>
                </div>
                {message.subject && (
                  <p className="text-sm font-medium text-foreground mt-2">
                    Subject: {message.subject}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;