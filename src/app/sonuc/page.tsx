'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SonucPage() {
  const [iframeContent, setIframeContent] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    // PostMessage listener ekle
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === 'redirect' && event.data.url) {
        window.location.href = event.data.url;
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Cleanup
    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
    };
    
    const data = searchParams.get('data');
    
    if (data) {
      try {
        // Base64 verisini decode et
        const decodedData = atob(data);
        const parsedData = JSON.parse(decodedData);
        
        // localStorage'dan token'ı al
         const storedPostData = localStorage.getItem('sonuc_post_data');
         let token = '';
         
         if (storedPostData) {
           const postData = JSON.parse(storedPostData);
           token = postData.token || '';
           localStorage.removeItem('sonuc_post_data');
         }
         
         // Token yoksa ana sayfaya yönlendir
         if (!token) {
           window.location.href = '/';
           return;
         }
         
         // Callback URL varsa iframe oluştur
         if (parsedData.original_callback_url && token) {
          const html = `
             <!DOCTYPE html>
             <html>
               <head>
                 <title>Callback İşlemi</title>
                 <meta charset="utf-8">
               </head>
               <body>
                 <form id="callbackForm" method="POST" action="${parsedData.original_callback_url}">
                   <input type="hidden" name="token" value="${token}" />
                 </form>
                 <script>
                   document.getElementById('callbackForm').submit();
                   
                   // Tüm linkleri devre dışı bırak ve ana sayfaya yönlendir
                   setTimeout(() => {
                     // Tüm linkleri bul ve href'lerini javascript:void(0) yap
                     const allLinks = document.querySelectorAll('a');
                     allLinks.forEach(link => {
                       // Orijinal href'i sakla
                       link.setAttribute('data-original-href', link.getAttribute('href') || '');
                       // Href'i javascript:void(0) yap
                       link.setAttribute('href', 'javascript:void(0)');
                       // Yeni onclick ekle
                       link.onclick = function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         console.log('Link clicked - Redirecting to homepage...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         return false;
                       };
                     });
                     
                     // Tüm butonları bul ve onclick ekle
                     const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
                     allButtons.forEach(button => {
                       // Form submit butonları hariç
                       if (button.type !== 'submit' && !button.closest('#callbackForm')) {
                         button.onclick = function(e) {
                           e.preventDefault();
                           e.stopPropagation();
                           console.log('Button clicked - Redirecting to homepage...');
                           window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                           return false;
                         };
                       }
                     });
                     
                     // Form submit'leri engelle (callbackForm hariç)
                     const allForms = document.querySelectorAll('form:not(#callbackForm)');
                     allForms.forEach(form => {
                       form.onsubmit = function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         console.log('Form submit - Redirecting to homepage...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         return false;
                       };
                     });
                     
                     // Capture phase'de tüm tıklamaları yakala
                     document.addEventListener('click', function(e) {
                       const target = e.target;
                       // callbackForm içindeki elementler hariç
                       if (!target.closest('#callbackForm')) {
                         // Form submit butonları hariç
                         if (!(target.tagName === 'INPUT' && target.type === 'submit' && target.closest('#callbackForm'))) {
                           e.preventDefault();
                           e.stopPropagation();
                           console.log('Document click - Redirecting to homepage...');
                           window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                           return false;
                         }
                       }
                     }, true); // true = capture phase
                   }, 1000);
                 </script>
               </body>
             </html>
           `;
          setIframeContent(html);
        }
      } catch (error) {
        console.error('Data decode edilemedi:', error);
      }
    }
    
    // Cleanup function return et
    return cleanup;
  }, [searchParams]);

  return (
    <div className="w-full h-screen">
      <iframe
        srcDoc={iframeContent}
        className="w-full h-screen border-0"
        title="Ödeme Sonucu"
      />
    </div>
  );
}
