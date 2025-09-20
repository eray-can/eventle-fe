import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;
    const url = new URL(request.url);
    const encodedData = url.searchParams.get('data');

    let decodedData = null;
    if (encodedData) {
      try {
        const decoded = atob(encodedData);
        decodedData = JSON.parse(decoded);
      } catch (error) {
        console.error('Data decode edilemedi:', error);
      }
    }

    // POST verilerini birleştir
    const postData = {
      token,
      ...decodedData,
      timestamp: new Date().toISOString()
    };

    // Sonuç sayfasına yönlendirme URL'i
    const redirectUrl = new URL('/sonuc', request.url);
    if (encodedData) {
      redirectUrl.searchParams.set('data', encodedData);
    }

    // "İşleniyor" sayfası HTML'i
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>İşleniyor...</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #333;
            }
            .container {
              background: white;
              padding: 60px 40px;
              border-radius: 20px;
              box-shadow: 0 25px 50px rgba(0,0,0,0.15);
              text-align: center;
              max-width: 500px;
              width: 90%;
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
            }
            .container::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #667eea, #764ba2);
            }
            .spinner {
              width: 60px;
              height: 60px;
              border: 4px solid #f3f3f3;
              border-top: 4px solid #667eea;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 30px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .loading-dots {
              display: inline-block;
              margin-left: 10px;
            }
            .loading-dots::after {
              content: '';
              animation: dots 1.5s infinite;
            }
            @keyframes dots {
              0%, 20% { content: '.'; }
              40% { content: '..'; }
              60%, 100% { content: '...'; }
            }
            .form-info {
              background: #e3f2fd;
              border: 1px solid #bbdefb;
              border-radius: 10px;
              padding: 15px;
              margin: 15px 0;
              font-size: 14px;
              color: #1565c0;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 15px;
              color: #333;
              font-weight: 600;
            }
            .subtitle {
              font-size: 16px;
              color: #666;
              margin-bottom: 30px;
              line-height: 1.5;
            }
            .info-box {
              background: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 10px;
              padding: 20px;
              margin: 20px 0;
              text-align: left;
            }
            .info-title {
              font-weight: 600;
              color: #495057;
              margin-bottom: 10px;
              font-size: 14px;
            }
            .token-display {
              background: #fff;
              border: 1px solid #dee2e6;
              border-radius: 6px;
              padding: 12px;
              font-family: 'Courier New', monospace;
              font-size: 12px;
              word-break: break-all;
              color: #495057;
            }
            .progress-bar {
              width: 100%;
              height: 6px;
              background: #e9ecef;
              border-radius: 3px;
              overflow: hidden;
              margin: 20px 0;
            }
            .progress-fill {
              height: 100%;
              background: linear-gradient(90deg, #667eea, #764ba2);
              width: 0%;
              animation: progress 3s ease-in-out;
            }
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .countdown {
              font-size: 18px;
              font-weight: 600;
              color: #667eea;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h1>⚡ İşleniyor<span class="loading-dots"></span></h1>
            <p class="subtitle">
              Ödeme bilgileriniz işleniyor ve sonuç sayfasına aktarılıyor.
              <br>Lütfen sayfayı kapatmayın.
            </p>
            
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
          </div>
          
          <script>
            // POST verisini localStorage'a kaydet
            const postData = ${JSON.stringify(postData)};
            localStorage.setItem('sonuc_post_data', JSON.stringify(postData));
            
            // Hemen yönlendir
            setTimeout(() => {
              window.location.href = '${redirectUrl.toString()}';
            }, 500);
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
    });
  } catch (error) {
    console.error('POST handler error:', error);

    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hata - İşleniyor</title>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background: #f8f9fa;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
            }
            .error-container { 
              background: #fff;
              border: 1px solid #dc3545;
              border-left: 4px solid #dc3545;
              border-radius: 8px;
              padding: 30px;
              max-width: 500px;
              width: 100%;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .error-icon {
              font-size: 48px;
              margin-bottom: 20px;
            }
            h1 {
              color: #dc3545;
              margin-bottom: 15px;
              font-size: 24px;
            }
            p {
              color: #6c757d;
              margin-bottom: 10px;
              line-height: 1.5;
            }
            .error-details {
              background: #f8f9fa;
              border: 1px solid #dee2e6;
              border-radius: 4px;
              padding: 15px;
              margin: 20px 0;
              font-family: monospace;
              font-size: 14px;
              text-align: left;
              color: #495057;
            }
            .home-link {
              display: inline-block;
              background: #007bff;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
              transition: background-color 0.2s;
            }
            .home-link:hover {
              background: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-icon">❌</div>
            <h1>İşlem Hatası</h1>
            <p>POST isteği işlenirken bir hata oluştu.</p>
            <div class="error-details">
              <strong>Hata Detayı:</strong><br>
              ${error instanceof Error ? error.message : 'Bilinmeyen hata'}
            </div>
            <p>Lütfen tekrar deneyin veya destek ekibi ile iletişime geçin.</p>
            <a href="/" class="home-link">🏠 Anasayfaya Dön</a>
          </div>
        </body>
      </html>
    `;

    return new Response(errorHtml, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

// GET isteklerini reddet
export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Yöntem Desteklenmiyor</title>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            background: #f8f9fa;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .warning-container { 
            background: #fff;
            border: 1px solid #ffc107;
            border-left: 4px solid #ffc107;
            border-radius: 8px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .warning-icon {
            font-size: 48px;
            margin-bottom: 20px;
          }
          h1 {
            color: #856404;
            margin-bottom: 15px;
            font-size: 24px;
          }
          p {
            color: #6c757d;
            margin-bottom: 15px;
            line-height: 1.5;
          }
          .method-info {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 4px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
          }
          .home-link {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            transition: background-color 0.2s;
          }
          .home-link:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="warning-container">
          <div class="warning-icon">⚠️</div>
          <h1>Yöntem Desteklenmiyor</h1>
          <p>Bu endpoint sadece POST isteklerini kabul eder.</p>
          <div class="method-info">
            <strong>Desteklenen Yöntem:</strong> POST<br>
            <strong>Kullanılan Yöntem:</strong> GET
          </div>
          <p>Lütfen doğru HTTP yöntemi ile istek gönderin.</p>
          <a href="/" class="home-link">🏠 Anasayfaya Dön</a>
        </div>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 405,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Allow': 'POST'
    }
  });
}
