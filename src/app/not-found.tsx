import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-8xl font-bold text-muted-foreground mb-4">404</h1>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Sayfa Bulunamadı</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <div className="space-y-3">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Anasayfaya Dön</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}