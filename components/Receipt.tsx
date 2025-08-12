'use client';
// import { DonationData } from '@/types/index';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Define DonationData type locally since '@/types/index' cannot be found
type DonationData = {
  name: string;
  mobile: string;
  amount: number;
  transactionId: string;
  timestamp: Date;
};
import { Download, ArrowLeft } from 'lucide-react';

type ReceiptProps = {
  donationData: DonationData;
  onBackToForm: () => void;
};

export default function Receipt({ donationData, onBackToForm }: ReceiptProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleString('mr-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = () => {
    // Create a simple receipt content for download
    const receiptContent = `
    श्री गणेशाय नमः
    
    देणगी रसीद
    
    दाता: ${donationData.name}
    मोबाईल: ${donationData.mobile}
    रक्कम: ₹${donationData.amount}
    व्यवहार आयडी: ${donationData.transactionId}
    दिनांक: ${formatDate(donationData.timestamp)}
    
    धन्यवाद!
    गणपती बाप्पा मोरया!
    `;
    
    const element = document.createElement('a');
    const file = new Blob([receiptContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ganpati-donation-${donationData.transactionId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl animate-fade-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 animate-bounce shadow-xl border-4 border-orange-300">
          <div className="text-4xl">🐘</div>
        </div>
        <CardTitle className="text-3xl font-bold text-white mb-2">
          श्री गणेशाय नमः
        </CardTitle>
        <p className="text-yellow-300 text-xl font-semibold">
          देणगी यशस्वीरित्या प्राप्त झाली!
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4 space-y-3">
          <h3 className="text-white font-semibold text-lg mb-3">देणगी तपशील:</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80">दाता:</span>
              <span className="text-white font-medium">{donationData.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">मोबाईल:</span>
              <span className="text-white font-medium">{donationData.mobile}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">रक्कम:</span>
              <span className="text-yellow-400 font-bold text-xl">₹{donationData.amount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">व्यवहार आयडी:</span>
              <span className="text-white font-mono text-sm">{donationData.transactionId}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80">दिनांक आणि वेळ:</span>
              <span className="text-white font-medium text-sm">
                {formatDate(donationData.timestamp)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center text-white/90 py-4 border border-orange-300/30 rounded-lg bg-gradient-to-r from-orange-500/30 to-yellow-500/30">
          <p className="text-lg font-semibold">तुमच्या देणगीबद्दल धन्यवाद!</p>
          <p className="text-sm mt-1">तुमच्या सहाय्याने गणपती उत्सव आणखी भव्य होईल</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button 
            onClick={handleDownload}
            className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white transition-all duration-200 shadow-lg"
          >
            <Download className="mr-2 h-4 w-4" />
            रसीद डाउनलोड करा
          </Button>
          
          <Button 
            onClick={onBackToForm}
            variant="outline"
            className="bg-orange-500/20 border-orange-300/50 text-white hover:bg-orange-400/30 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            परत जा
          </Button>
        </div>

        <div className="text-center text-white/80 text-lg pt-4 border-t border-orange-300/30">
          <p className="animate-pulse">🙏 गणपती बाप्पा मोरया! 🙏</p>
        </div>
      </CardContent>
    </Card>
  );
}