'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search } from '@/components/search/search';

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur" style={{ backgroundColor: '#030712' }}>
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center space-x-4 mr-3">
          <Link href="/" className="flex items-center">
            {/* Desktop Logo */}
            <Image
              src="/static/media/eventle-uzun-logo.png"
              alt="Eventle"
              width={200}
              height={65}
              className="h-14 w-auto hidden sm:block"
              priority
            />
            {/* Mobile Logo */}
            <Image
              src="/static/media/eventle-mini-logo.webp"
              alt="Eventle"
              width={40}
              height={40}
              className="h-10 w-auto block sm:hidden"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center justify-center w-full max-w-lg mx-auto">
          <Search placeholder="Etkinlik, topluluk, workshop ara..." className="w-full" />
        </div>
      </div>
    </header>
  );
}
