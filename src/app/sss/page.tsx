export default function SSSPage() {

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            SIK SORULAN SORULAR
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-8 text-center">
              Eventle hakkında en çok merak edilen sorular ve cevapları.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Eventle nedir ve nasıl çalışır?</h2>
                <p className="text-gray-300">
                  Eventle, şehrinizdeki tüm etkinlikleri tek bir platformda toplayan bir uygulamadır. Konser, sergi, spor etkinliği gibi her türlü etkinliği keşfedebilir, kendi etkinliklerinizi oluşturabilir ve arkadaşlarınızla paylaşabilirsiniz.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Etkinlik nasıl oluşturulur?</h2>
                <p className="text-gray-300">
                  &quot;Etkinlik Oluştur&quot; butonuna tıklayarak etkinlik detaylarınızı girebilirsiniz. Etkinlik adı, tarih, saat, konum ve açıklama bilgilerini doldurarak etkinliğinizi yayınlayabilirsiniz.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">EventBuddy nedir?</h2>
                <p className="text-gray-300">
                  EventBuddy, etkinliğinize katılmak isteyen kişileri bulmanızı sağlayan özelliğimizdir. Etkinliğinizi oluşturduktan sonra, aynı ilgi alanlarına sahip kişilerle eşleşebilirsiniz.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Uygulama ücretsiz mi?</h2>
                <p className="text-gray-300">
                  Evet, Eventle tamamen ücretsizdir. Tüm temel özelliklerimizi herhangi bir ücret ödemeden kullanabilirsiniz.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Hesabımı nasıl silerim?</h2>
                <p className="text-gray-300">
                  Profil ayarlarından &quot;Hesabı Sil&quot; seçeneğini bulabilirsiniz. Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinir.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Etkinlik bulamıyorum, ne yapmalıyım?</h2>
                <p className="text-gray-300">
                  Filtreleri kullanarak arama yapabilir, kategorilere göre etkinlikleri inceleyebilir veya kendi etkinliğinizi oluşturabilirsiniz. Ayrıca harita özelliğini kullanarak yakınınızdaki etkinlikleri keşfedebilirsiniz.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Teknik sorun yaşıyorum, kime başvurmalıyım?</h2>
                <p className="text-gray-300">
                  Teknik sorunlarınız için eventleeee@gmail.com adresine e-posta gönderebilir veya Instagram hesabımızdan (@eventle.co) bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            </div>

            <div className="bg-blue-900 p-6 rounded-lg border border-blue-700 mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Sorunuz burada yok mu?</h2>
              <p className="text-gray-300 mb-4">
                Aradığınız cevabı bulamadıysanız, bizimle iletişime geçmekten çekinmeyin.
              </p>
              <a 
                href="/iletisim"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
