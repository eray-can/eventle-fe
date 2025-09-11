import Image from 'next/image';
import Link from 'next/link';
import type { Workshop } from '@/types/domain';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface SocietyCardProps {
  workshop: Workshop;
}

export function SocietyCard({ workshop }: SocietyCardProps) {
  return (
    <Link href={`/topluluk/${workshop.id}`}>
      <Card className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-200">
        <div className="relative h-40">
          <Image
            src={workshop.image}
            alt={workshop.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div 
            className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium text-white shadow-sm"
            style={{ backgroundColor: workshop.category.color }}
          >
            {workshop.category.name}
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-sm line-clamp-2">
            {workshop.name}
          </CardTitle>
          <CardDescription className="text-xs">
            {workshop.location}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2 text-xs text-muted-foreground mb-4">
            <div className="flex items-center">
              <span className="font-medium">📅</span>
              <span className="ml-1">
                {new Date(workshop.date).toLocaleDateString('tr-TR', { 
                  day: 'numeric', 
                  month: 'short'
                })}
              </span>
              <span className="mx-2">•</span>
              <span>{workshop.startTime.slice(0, 5)}</span>
            </div>
            <div className="flex items-center">
              <span>👥 {workshop.attendedCount}/{workshop.capacity}</span>
            </div>
          </div>

          <div className="flex flex-col">
            {workshop.discountedPrice ? (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-muted-foreground line-through">
                  {workshop.price}₺
                </span>
                <span className="text-sm font-bold text-orange-600">
                  {workshop.discountedPrice.toFixed(0)}₺
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold mb-2">
                {workshop.price === 0 ? 'Ücretsiz' : `${workshop.price.toFixed(0)}₺`}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div 
            className={`w-full py-2 px-3 rounded text-xs font-medium text-center transition-colors ${
              workshop.isEligibleToBuy 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {workshop.isEligibleToBuy ? 'Detayları Gör' : 'Tükendi'}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
