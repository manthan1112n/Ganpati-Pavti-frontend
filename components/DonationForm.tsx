'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DonationData } from '@/types';
import { Loader2, Heart } from 'lucide-react';

type FormData = {
  name: string;
  mobile: string;
  amount: string;
};

type FormErrors = {
  name?: string;
  mobile?: string;
  amount?: string;
  submit?: string;
};

export default function DonationForm({ onSuccess }: { onSuccess: (data: DonationData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    amount: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'नाव आवश्यक आहे';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'मोबाईल नंबर आवश्यक आहे';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'वैध मोबाईल नंबर टाका';
    }
    if (!formData.amount.trim()) {
      newErrors.amount = 'देणगी रक्कम आवश्यक आहे';
    } else if (isNaN(Number(formData.amount)) || parseInt(formData.amount) <= 0) {
      newErrors.amount = 'वैध रक्कम टाका';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        onSuccess({
          ...formData,
          transactionId: result.transactionId,
          timestamp: new Date()
        });
        setFormData({ name: '', mobile: '', amount: '' });
      } else {
        setErrors({ submit: 'देणगी प्रक्रिया अयशस्वी झाली. कृपया पुन्हा प्रयत्न करा.' });
      }
    } catch {
      setErrors({ submit: 'कनेक्शन त्रुटी. कृपया पुन्हा प्रयत्न करा.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl animate-fade-in">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          श्री गणेशाय नमः
        </CardTitle>
        <p className="text-white/90 text-lg">गणपती बाप्पाच्या देणगीसाठी योगदान द्या</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">नाव *</Label>
            <Input
              id="name"
              type="text"
              placeholder="तुमचे पूर्ण नाव टाका"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            {errors.name && <p className="text-red-300 text-sm">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-white font-medium">मोबाईल नंबर *</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="10 अंकी मोबाईल नंबर"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              maxLength={10}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            {errors.mobile && <p className="text-red-300 text-sm">{errors.mobile}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white font-medium">देणगी रक्कम (₹) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="रक्कम रुपयांत टाका"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              min="1"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            {errors.amount && <p className="text-red-300 text-sm">{errors.amount}</p>}
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[51, 101, 251, 501].map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('amount', amount.toString())}
                className="bg-orange-500/20 border-orange-300/50 text-white hover:bg-orange-400/30"
              >
                ₹{amount}
              </Button>
            ))}
          </div>

          {/* Submit error */}
          {errors.submit && <p className="text-red-300 text-sm text-center">{errors.submit}</p>}

          {/* Submit button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                प्रक्रिया सुरू आहे...
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                देणगी द्या
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-white/80 text-sm pt-4 border-t border-orange-300/30">
          गणपती बाप्पा मोरया! 🙏
        </div>
      </CardContent>
    </Card>
  );
}