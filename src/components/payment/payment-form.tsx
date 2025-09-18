'use client';

import { useState } from 'react';
import { PaymentData } from '@/lib/utils';

interface PaymentFormProps {
  paymentData: PaymentData;
}

export default function PaymentForm({ paymentData }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: ''
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ödeme işlemi burada yapılacak
    console.log('Payment data:', { paymentData, formData });
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Ad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Adınızı giriniz"
            required
            suppressHydrationWarning
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Soyadınızı giriniz"
            required
            suppressHydrationWarning
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Telefon Numarası <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="05XX XXX XX XX"
          required
          suppressHydrationWarning
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          E-posta Adresi <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="ornek@email.com"
          required
          suppressHydrationWarning
        />
      </div>
      

      

    </form>
  );
}