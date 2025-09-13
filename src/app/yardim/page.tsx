export default function YardimPage() {

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            YARDIM
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-8 text-center">
              Eventle kullanımı hakkında sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Sık Sorulan Sorular</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-white mb-1">Eventle nasıl kullanılır?</h3>
                    <p className="text-gray-300 text-sm">Eventle&apos;yi kullanmak çok kolay! Ana sayfada etkinlikleri keşfedebilir, kendi etkinliklerinizi oluşturabilir ve arkadaşlarınızla paylaşabilirsiniz.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Etkinlik nasıl oluşturulur?</h3>
                    <p className="text-gray-300 text-sm">&quot;Etkinlik Oluştur&quot; butonuna tıklayarak etkinlik detaylarınızı girebilir ve yayınlayabilirsiniz.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Hesabımı nasıl silerim?</h3>
                    <p className="text-gray-300 text-sm">Profil ayarlarından hesabınızı kalıcı olarak silebilirsiniz.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">İletişim</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-white mb-1">E-posta</h3>
                    <p className="text-gray-300">eventleeee@gmail.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Yanıt Süresi</h3>
                    <p className="text-gray-300">24 saat içinde</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-300">Pazartesi - Cuma: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 p-6 rounded-lg border border-blue-700">
              <h2 className="text-xl font-semibold text-white mb-4">Hala yardıma mı ihtiyacınız var?</h2>
              <p className="text-gray-300 mb-4">
                Sorularınız için bizimle iletişime geçmekten çekinmeyin. Size en kısa sürede yardımcı olmaya çalışacağız.
              </p>
              <a 
                href="mailto:eventleeee@gmail.com"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
