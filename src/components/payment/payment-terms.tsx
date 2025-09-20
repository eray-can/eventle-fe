'use client';

import { usePayment } from '@/contexts/payment';

export default function PaymentTerms() {
  const { isTermsAccepted, setIsTermsAccepted, termsError, setTermsError, totalAmount } = usePayment();

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(e.target.checked);
    if (e.target.checked) {
      setTermsError('');
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold mb-6">Bir Ödeme Yöntemi Seçin</h3>
      <div className="space-y-3">
        <label className="flex items-center p-4 border-2 border-blue-500 rounded-xl cursor-pointer bg-gray-700/30">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            defaultChecked
            className="mr-3 text-blue-500"
          />
          <div className="w-5 h-5 mr-3 text-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium">Banka/Kredi Kartı ile Öde</div>
            <div className="text-sm text-gray-400">Kredi kartı veya banka kartı ile güvenle ödeme yapabilirsiniz.</div>
          </div>
        </label>
      </div>

      <div className="space-y-4 mt-6">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={isTermsAccepted}
            onChange={handleTermsChange}
            className="mt-1 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-400 leading-relaxed">
            Mesafeli Satış Sözleşmesi ve Gizlilik Sözleşmesi&apos;ni okudum ve kabul ediyorum.
          </span>
        </label>
        {termsError && (
          <p className="text-red-400 text-sm ml-6">{termsError}</p>
        )}
      </div>

      <button
        type="submit"
        form="payment-form"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 lg:py-4 px-4 lg:px-6 rounded-xl font-semibold text-base lg:text-lg transition-all duration-200 mt-6"
      >
        ₺{totalAmount.toLocaleString('tr-TR')} - Satın Al
      </button>
    </div>
  );
}