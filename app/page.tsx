'use client';

import { useState } from 'react';
import DonationForm from '@/components/DonationForm';
import Receipt from '@/components/Receipt';
import { DonationData } from '@/index';
import Image from 'next/image';
import ganeshImage from '@/assets/ganesh.jpg';

export default function Home() {
  const [donationData, setDonationData] = useState<DonationData | null>(null);

  const handleSuccess = (data: DonationData) => {
    setDonationData(data);
  };

  const handleBackToForm = () => {
    setDonationData(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-5 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500">
      <Image
        src={ganeshImage}
        alt="Ganesh"
        width={400}
        height={400}
        priority
        className="mb-5"
      />
      <div className="w-full max-w-md">
        {donationData ? (
          <Receipt donationData={donationData} onBackToForm={handleBackToForm} />
        ) : (
          <DonationForm onSuccess={handleSuccess} />
        )}
      </div>
    </main>
  );
}