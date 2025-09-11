'use client';

import { MapPin } from 'lucide-react';

interface MapComponentProps {
  lat: number;
  lng: number;
  location: string;
}

export function MapComponent({ lat, lng, location }: MapComponentProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-400" />
          <h3 className="text-white font-semibold">Konum</h3>
        </div>
      </div>
      
      {/* Placeholder for Google Maps */}
      <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">{location}</p>
          <p className="text-gray-400 text-sm">
            Koordinatlar: {lat}, {lng}
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Haritada Göster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
