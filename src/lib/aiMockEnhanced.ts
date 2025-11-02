
export const AIMock = {
    getResponse: (message: string): string => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return 'Hello there! How can I help you today?';
      } else if (lowerCaseMessage.includes('how are you')) {
        return 'I am an AI, I do not have feelings, but thank you for asking!';
      } else if (lowerCaseMessage.includes('help')) {
        return 'I can help you with a variety of tasks. What do you need assistance with?';
      } else if (lowerCaseMessage.includes('product')) {
        return 'I can help you with product information. What product are you interested in?';
      } else if (lowerCaseMessage.includes('shipping')) {
        return 'We offer free shipping on all orders over $50.';
      } else if (lowerCaseMessage.includes('payment')) {
        return 'We accept all major credit cards and PayPal.';
      } else {
        return "I'm not sure how to respond to that. Can you please rephrase?";
      }
    },
  };
  
  export const EnhancedAIMock = {
    getBargainResponse: (message: string): string => {
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('discount') || lowerCaseMessage.includes('price')) {
        return 'I can offer you a 10% discount on this item. Would you like to proceed?';
      } else if (lowerCaseMessage.includes('shipping')) {
        return 'We offer free shipping on all orders over $50.';
      } else if (lowerCaseMessage.includes('available')) {
        return 'This item is currently in stock and available for immediate shipment.';
      } else {
        return AIMock.getResponse(message); // Fallback to the generic AI mock
      }
    },
    getSellerResponse: (message: string): string => {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            return 'Hello! Thank you for your interest in my product.';
        } else if (lowerCaseMessage.includes('discount') || lowerCaseMessage.includes('price')) {
            return 'I can offer you a 5% discount on this item.';
        } else if (lowerCaseMessage.includes('shipping')) {
            return 'I can offer you free shipping on this item.';
        } else if (lowerCaseMessage.includes('available')) {
            return 'This item is currently in stock.';
        } else {
            return 'I am sorry, I do not understand your question.';
        }
    }
  };
  