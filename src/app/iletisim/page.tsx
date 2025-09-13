import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim - Eventle',
  description: 'Eventle ile iletişime geçin. Sorularınız için bizimle iletişime geçebilirsiniz.',
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">İletişim</h1>
            <p className="text-gray-300 text-lg">
              Sorularınız için bizimle iletişime geçebilirsiniz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">Adres</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 text-lg">Beşiktaş/İstanbul</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-6">İletişim</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href="mailto:berkay.bedir@eventle.co"
                      className="block text-blue-400 hover:text-blue-300 transition-colors text-lg"
                    >
                      berkay.bedir@eventle.co
                    </a>
                    <a 
                      href="mailto:alptug.ilgili@eventle.co"
                      className="block text-blue-400 hover:text-blue-300 transition-colors text-lg"
                    >
                      alptug.ilgili@eventle.co
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Hızlı Yanıt</h3>
              <p className="text-gray-300 mb-4">
                E-posta gönderdiğinizde 24 saat içinde yanıt alacaksınız.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:berkay.bedir@eventle.co"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Berkay&apos;a E-posta Gönder
                </a>
                <a 
                  href="mailto:alptug.ilgili@eventle.co"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Alptuğ&apos;a E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}