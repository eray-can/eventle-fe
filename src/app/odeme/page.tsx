import { Calendar, MapPin, CreditCard, Clock } from 'lucide-react';
import { decodePaymentData } from '@/lib/utils';
import { redirect } from 'next/navigation';
import PaymentForm from '@/components/payment/payment-form';
import { paymentAdapter } from '@/adapters';
import Image from '@/components/ui/image';

interface PaymentPageProps {
  searchParams: { data?: string };
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const data = searchParams.data;

  if (!data) {
    redirect('/');
  }

  // Base64 decode
  const decodedData = decodePaymentData(data);

  // Gerekli alanları kontrol et
  if (!decodedData || !decodedData.type || !decodedData.seans_id || !decodedData.ticket_count) {
    redirect('/');
  }

  // Payment adapter ile gerçek session verilerini çek
  let sessionData;
  try {
    sessionData = await paymentAdapter.getPaymentSessionDetail({
      id: decodedData.seans_id.toString(),
      category: decodedData.type as 'society' | 'workshop'
    });
  } catch (error) {
    console.error('Payment session data fetch error:', error);
    redirect('/');
  }

  const effectivePrice = sessionData.discountedPrice || sessionData.price;
  const totalAmount = decodedData.ticket_count * effectivePrice;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Ödeme</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sipariş Özeti - Mobilde üstte */}
             <div className="lg:col-span-1 lg:order-2 order-1">
               <div className="bg-gray-800/50 rounded-xl p-6 lg:p-8 border border-gray-700 lg:sticky lg:top-8">
                 <h3 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6">Sipariş Özeti</h3>

                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-start space-x-3 lg:space-x-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={sessionData.imageUrl || '/static/media/default-event.jpg'}
                        alt={sessionData.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        fallbackSrc="/static/media/default-event-image.jpg"
                      />
                    </div>
                    <div className="flex-1 min-w-0 max-w-none">
                      <h4 className="font-medium text-white mb-1 text-sm lg:text-base leading-relaxed break-words">{sessionData.title}</h4>
                      <div className="flex items-center text-xs lg:text-sm text-purple-400 mb-1">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>{sessionData.location || 'Konum belirtilmemiş'}</span>
                      </div>
                      <div className="text-xs lg:text-sm text-gray-400 mb-1">{sessionData.category === 'society' ? 'Topluluk' : 'Workshop'}</div>
                      <div className="flex items-center text-xs lg:text-sm text-blue-400 mb-1">
                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>{sessionData.sessionDate}</span>
                      </div>
                      <div className="flex items-center text-xs lg:text-sm text-blue-400">
                         <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                         <span>{sessionData.sessionTime}</span>
                       </div>
                     </div>
                   </div>

                   <div className="border-t border-gray-600 pt-3 mt-3">
                     <div className="flex justify-between items-center">
                       <span className="text-xs lg:text-sm text-gray-400">Adet</span>
                       <span className="text-xs lg:text-sm font-medium">{decodedData.ticket_count}</span>
                     </div>
                     {sessionData.discountedPrice ? (
                       <>
                         <div className="flex justify-between items-center">
                           <span className="text-xs lg:text-sm text-gray-400">Birim Fiyat</span>
                           <span className="text-xs lg:text-sm font-medium line-through text-gray-500">₺{sessionData.price.toLocaleString('tr-TR')}</span>
                         </div>
                         <div className="flex justify-between items-center">
                           <span className="text-xs lg:text-sm text-green-400">İndirimli Fiyat ({sessionData.discountPercentage}% indirim)</span>
                           <span className="text-xs lg:text-sm font-medium text-green-400">₺{sessionData.discountedPrice.toLocaleString('tr-TR')}</span>
                         </div>
                       </>
                     ) : (
                       <div className="flex justify-between items-center">
                         <span className="text-xs lg:text-sm text-gray-400">Birim Fiyat</span>
                         <span className="text-xs lg:text-sm font-medium">₺{sessionData.price.toLocaleString('tr-TR')}</span>
                       </div>
                     )}
                     <div className="border-t border-gray-600 pt-2 mt-2">
                       <div className="flex justify-between items-center">
                         <span className="text-sm lg:text-base font-semibold">Toplam</span>
                         <span className="text-sm lg:text-base font-semibold text-green-400">₺{totalAmount.toLocaleString('tr-TR')}</span>
                       </div>
                     </div>
                   </div>




                </div>
              </div>
            </div>

            {/* İletişim Bilgileri ve Ödeme Yöntemi - Mobilde altta */}
            <div className="lg:col-span-2 lg:order-1 order-2 space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold mb-6">İletişim Bilgileri</h2>
                <PaymentForm paymentData={sessionData} />
              </div>

              {/* Ödeme Yöntemi */}
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
                     <CreditCard className="w-5 h-5 mr-3 text-blue-400" />
                     <div className="flex-1">
                       <div className="font-medium">Banka/Kredi Kartı ile Öde</div>
                       <div className="text-sm text-gray-400">Kredi kartı veya banka kartı ile güvenle ödeme yapabilirsiniz.</div>
                     </div>
                     <div className="ml-auto lg:flex lg:space-x-2 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-2">
                       <Image
                         src="/static/media/mastercard-logo.svg"
                         alt="Mastercard"
                         width={40}
                         height={40}
                         className="h-8 w-auto"
                       />
                       <Image
                         src="/static/media/visa-logo.svg"
                         alt="Visa"
                         width={40}
                         height={40}
                         className="h-8 w-auto"
                       />
                       <Image
                         src="/static/media/troy-logo.png"
                         alt="Troy"
                         width={40}
                         height={40}
                         className="h-8 w-auto"
                       />
                       <Image
                         src="/static/media/amex-logo.svg"
                         alt="American Express"
                         width={40}
                         height={40}
                         className="h-8 w-auto"
                       />
                     </div>
                   </label>
                 </div>

                 <div className="space-y-4 mt-6">
                   <label className="flex items-start space-x-3">
                     <input
                       type="checkbox"
                       className="mt-1 text-blue-500 focus:ring-blue-500"
                     />
                     <span className="text-sm text-gray-400 leading-relaxed">
                       Mesafeli Satış Sözleşmesi ve Gizlilik Sözleşmesi&apos;ni okudum ve kabul ediyorum.
                     </span>
                   </label>
                 </div>

                 <button
                   type="button"
                   className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 text-white py-2 lg:py-4 px-4 lg:px-6 rounded-xl font-semibold text-base lg:text-lg transition-all duration-200 mt-6"
                 >
                   ₺{totalAmount.toLocaleString('tr-TR')} - Satın Al
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}