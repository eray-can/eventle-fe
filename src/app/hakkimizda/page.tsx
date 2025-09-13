export default function HakkimizdaPage() {

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            HAKKIMIZDA
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6">
              Eventle olarak, şehirdeki tüm etkinlikleri tek bir platformda toplamak ve herkesin kolayca erişebilmesini sağlamak için yola çıktık. İster bir konser, ister bir sergi, ister bir spor etkinliği olsun, Eventle sayesinde şehirdeki tüm etkinliklere tek bir yerden ulaşabilirsiniz. Ayrıca, kendi etkinliklerinizi oluşturarak daha fazla insanla paylaşabilir ve onların katılımını sağlayabilirsiniz.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              Kurucularımız
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Eventle, dört tutkulu arkadaşın - Berkay, Alptuğ, Doğukan ve Arda - ortak vizyonu ve emeğiyle hayat buldu. Hepimiz, insanların şehirdeki etkinliklerden en iyi şekilde haberdar olmalarını ve bu etkinliklere katılmalarını kolaylaştırmak için bir araya geldik.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              Ne Sunuyoruz?
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3"></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Etkinlik Keşfi</h3>
                  <p className="text-gray-300">Şehrinizdeki tüm etkinlikleri tek bir platformda keşfedin. Kategorilere göre arama yaparak, ilgi alanlarınıza uygun etkinlikleri bulun.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3"></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Kendi Etkinliklerinizi Oluşturun</h3>
                  <p className="text-gray-300">Kendi etkinliklerinizi kolayca oluşturun, duyurun ve geniş kitlelere ulaşın.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3"></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Harita ve Takvim Özellikleri</h3>
                  <p className="text-gray-300">Harita üzerinden etkinlik yerlerini kolayca bulun ve takvim üzerinden etkinliklerin tarihlerini takip edin.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3"></div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Kolay Kullanım</h3>
                  <p className="text-gray-300">Kullanıcı dostu arayüzümüz sayesinde aradığınız etkinlikleri hızlıca bulun ve etkinlik oluşturma süreçlerini kolayca tamamlayın.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg mt-8 border border-gray-700">
              <p className="text-white text-center font-medium">
                Eventle ile şehirdeki hayatı dolu dolu yaşayın. Her gününüzü yeni bir etkinlikle renklendirin!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
