import React from 'react';
import { AIMentor } from '@/components/AIMentor';
import { products } from '@/lib/mockData'; // Assuming mockProducts is available

const AIMentorPage = () => {
  // For demonstration, we'll use the first mock product
  const product = products[0]; 

  if (!product) {
    return <div className="p-8 text-center text-muted-foreground">No product data available for analysis.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">AI Mentor Dashboard</h1>
      <AIMentor product={product} />
    </div>
  );
};

export default AIMentorPage;
