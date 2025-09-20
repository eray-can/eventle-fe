'use client';

import { useEffect } from 'react';
import { usePaymentForm } from '@/hooks/payment';
import { usePayment } from '@/contexts/payment';

export default function PaymentForm() {
  const { setIsFormValid, setFormData, handlePayment } = usePayment();
  const {
    formData,
    errors,
    isValid,
    showErrors,
    handleInputChange,
    handleBlur,
    validateForm
  } = usePaymentForm();

  // Notify context of validation changes
  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid, setIsFormValid]);

  // Notify context of form data changes
  useEffect(() => {
    setFormData(formData);
  }, [formData, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    
    if (isFormValid) {
      handlePayment(formData);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
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
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
              showErrors && errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
            }`}
            placeholder="Adınızı giriniz"
            required
            suppressHydrationWarning
          />
          {showErrors && errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
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
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
              showErrors && errors.surname ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
            }`}
            placeholder="Soyadınızı giriniz"
            required
            suppressHydrationWarning
          />
          {showErrors && errors.surname && <p className="text-red-400 text-sm mt-1">{errors.surname}</p>}
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
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
            showErrors && errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
          }`}
          placeholder="05XX XXX XX XX"
          maxLength={14}
          required
          suppressHydrationWarning
        />
        {showErrors && errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
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
          onBlur={handleBlur}
          className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
            showErrors && errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
          }`}
          placeholder="ornek@email.com"
          required
          suppressHydrationWarning
        />
        {showErrors && errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>
      

    </form>
  );
}