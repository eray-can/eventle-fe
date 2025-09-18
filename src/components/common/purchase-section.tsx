'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEventCalendarContext } from '@/contexts/event-calendar';
import { cn, encodePaymentData, type PaymentData } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface PurchaseSectionProps {
  variant?: 'mobile' | 'desktop';
  className?: string;
  onPurchase?: () => void;
}

export function PurchaseSection({ 
  variant = 'desktop', 
  className,
  onPurchase 
}: PurchaseSectionProps) {
  const router = useRouter();
  const {
    selectedTimeSlot,
    quantity,
    setQuantity,
    isOutOfStock,
    availableStock,
    totalPrice,
    originalPrice,
  } = useEventCalendarContext();

  const hasDiscount = selectedTimeSlot?.discountedPrice && selectedTimeSlot.discountedPrice < selectedTimeSlot.price;
  const isDisabled = isOutOfStock || !selectedTimeSlot || quantity <= 0 || !selectedTimeSlot?.isValid;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= availableStock && selectedTimeSlot?.isValid) {
      setQuantity(newQuantity);
    }
  };

  const handlePurchaseClick = () => {
    if (!isDisabled) {
      // Base64 ile şifrelenmiş veri oluştur
      const paymentData: PaymentData = {
        type: 'workshop', // veya 'society' gibi dinamik olabilir
        seans_id: selectedTimeSlot?.id || 12,
        ticket_count: quantity
      };
      
      const encodedData = encodePaymentData(paymentData);
      
      // Ödeme sayfasına yönlendir
      router.push(`/odeme?data=${encodedData}`);
      
      // Eğer onPurchase callback'i varsa çalıştır
      if (onPurchase) {
        onPurchase();
      }
    }
  };

  if (variant === 'mobile') {
    return (
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50",
        className
      )}>
        <div className="flex items-center justify-between mb-3">
          <div>
            {hasDiscount ? (
              <div>
                <div className="text-2xl font-bold text-white">
                  {totalPrice.toLocaleString()} ₺
                </div>
                <div className="line-through text-gray-500 text-sm">
                  {originalPrice.toLocaleString()} ₺
                </div>
              </div>
            ) : (
              <div className="text-2xl font-bold text-white">
                {totalPrice.toLocaleString()} ₺
              </div>
            )}
            {isOutOfStock && (
              <div className="text-red-400 text-sm mt-1">
                Stok Tükendi
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-600 rounded-lg">
              <button 
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isOutOfStock}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="w-12 h-10 flex items-center justify-center text-white font-medium border-x border-gray-600">
                {quantity}
              </div>
              <button 
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= availableStock || isOutOfStock}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button 
          className={cn(
            "w-full font-semibold py-3 rounded-lg transition-colors",
            isDisabled 
              ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
              : "bg-purple-600 hover:bg-purple-700 text-white"
          )}
          onClick={handlePurchaseClick}
          disabled={isDisabled}
        >
          {isOutOfStock ? 'Stok Tükendi' : 'Satın Al'}
        </button>
        {availableStock <= 5 && availableStock > 0 && (
          <div className="text-orange-400 text-sm mt-2 text-center">
            Sadece {availableStock} adet kaldı!
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={cn("bg-gray-900/50 border-gray-700", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <div>
                <div className="text-3xl font-bold text-white">
                  {totalPrice.toLocaleString()} ₺
                </div>
                <div className="line-through text-gray-500">
                  {originalPrice.toLocaleString()} ₺
                </div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-white">
                {totalPrice.toLocaleString()} ₺
              </div>
            )}
            {isOutOfStock && (
              <div className="text-red-400 text-sm mt-2">
                Stok Tükendi
              </div>
            )}
            {availableStock <= 5 && availableStock > 0 && (
              <div className="text-orange-400 text-sm mt-2">
                Sadece {availableStock} adet kaldı!
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-600 rounded-lg">
              <button 
                className="w-12 h-12 flex items-center justify-center text-white hover:bg-gray-700 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isOutOfStock}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="w-16 h-12 flex items-center justify-center text-white font-medium border-x border-gray-600">
                {quantity}
              </div>
              <button 
                className="w-12 h-12 flex items-center justify-center text-white hover:bg-gray-700 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= availableStock || isOutOfStock}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <Button 
              className={cn(
                "px-8 py-3 text-lg font-semibold",
                isDisabled 
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed hover:bg-gray-600" 
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              )}
              onClick={handlePurchaseClick}
              disabled={isDisabled}
            >
              {isOutOfStock ? 'Stok Tükendi' : 'Satın Al'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}