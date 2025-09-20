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
          <title>Eventle | İşleniyor...</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            :root {
              --background: 0 0% 100%;
              --foreground: 222.2 84% 4.9%;
              --card: 0 0% 100%;
              --card-foreground: 222.2 84% 4.9%;
              --primary: 221.2 83.2% 53.3%;
              --primary-foreground: 210 40% 98%;
              --secondary: 210 40% 96%;
              --secondary-foreground: 222.2 84% 4.9%;
              --muted: 210 40% 96%;
              --muted-foreground: 215.4 16.3% 46.9%;
              --accent: 210 40% 96%;
              --accent-foreground: 222.2 84% 4.9%;
              --destructive: 0 84.2% 60.2%;
              --destructive-foreground: 210 40% 98%;
              --border: 214.3 31.8% 91.4%;
              --input: 214.3 31.8% 91.4%;
              --ring: 221.2 83.2% 53.3%;
              --radius: 0.75rem;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: hsl(var(--background));
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              color: hsl(var(--foreground));
            }
            .container {
              background: hsl(var(--card));
              padding: 2.5rem 2rem;
              border-radius: var(--radius);
              box-shadow: 0 10px 25px rgba(0,0,0,0.08);
              text-align: center;
              max-width: 500px;
              width: 90%;
              position: relative;
              overflow: hidden;
              transition: all 0.3s ease;
              border: 1px solid hsl(var(--border));
            }
            .logo {
              margin-bottom: 1.5rem;
              width: 120px;
              height: auto;
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 3px solid hsl(var(--secondary));
              border-top: 3px solid hsl(var(--primary));
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
              margin: 0 auto 1.5rem;
              box-shadow: 0 0 10px rgba(0,0,0,0.05);
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .loading-dots {
              display: inline-block;
              margin-left: 5px;
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
            h1 {
              font-size: 1.5rem;
              margin-bottom: 0.75rem;
              color: hsl(var(--foreground));
              font-weight: 600;
            }
            .subtitle {
              font-size: 0.95rem;
              color: hsl(var(--muted-foreground));
              margin-bottom: 1.5rem;
              line-height: 1.5;
            }
            .progress-bar {
              width: 100%;
              height: 4px;
              background: hsl(var(--secondary));
              border-radius: 2px;
              overflow: hidden;
              margin: 1.5rem 0 0.5rem;
            }
            .progress-fill {
              height: 100%;
              background: hsl(var(--primary));
              width: 0%;
              animation: progress 2.5s ease-in-out forwards;
            }
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .progress-text {
              font-size: 0.8rem;
              color: hsl(var(--muted-foreground));
              margin-top: 0.5rem;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="/static/media/eventle-transparan-logo.webp" alt="Eventle Logo" class="logo">
            <div class="spinner" style="width: 60px; height: 60px; border-width: 4px;"></div>
            <h1>İşleminiz Devam Ediyor<span class="loading-dots"></span></h1>
            <p class="subtitle">
              Ödeme bilgileriniz güvenli bir şekilde işleniyor ve sonuç sayfasına aktarılıyor.
              <br>Lütfen bu sayfadan ayrılmayın.
            </p>
            
            <div class="progress-bar" style="height: 6px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
              <div class="progress-fill" style="transition: width 0.3s ease-out;"></div>
            </div>
            <div class="progress-text">Yönlendiriliyorsunuz...</div>
          </div>
          
          <script>
            // POST verisini localStorage'a kaydet
            const postData = ${JSON.stringify(postData)};
            localStorage.setItem('sonuc_post_data', JSON.stringify(postData));
            
            // Hemen yönlendirme (0.5 saniye sonra)
            document.querySelector('.progress-fill').style.transition = 'width 0.5s ease-out';
            document.querySelector('.progress-fill').style.width = '100%';
            
            setTimeout(() => {
              window.location.href = '${redirectUrl.toString()}';
            }, 500); // 0.5 saniye (500ms) sonra yönlendir
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
