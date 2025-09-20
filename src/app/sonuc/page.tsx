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
                   
                   // Form gönderildikten sonra tüm etkileşimleri engelle ve anasayfaya yönlendir
                   setTimeout(() => {
                     // iframe içindeki window nesnesine erişim
                     try {
                       // History API'sini engelle
                       const originalPushState = history.pushState;
                       const originalReplaceState = history.replaceState;
                       
                       history.pushState = function() {
                         console.log('History pushState blocked - Redirecting to homepage...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         return originalPushState.apply(this, arguments);
                       };
                       
                       history.replaceState = function() {
                         console.log('History replaceState blocked - Redirecting to homepage...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         return originalReplaceState.apply(this, arguments);
                       };
                       
                       // window.location değişikliklerini engelle
                       Object.defineProperty(window, 'location', {
                         get: function() { return window.parent.location; },
                         set: function() {
                           console.log('Location change blocked - Redirecting to homepage...');
                           window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                           return window.parent.location;
                         }
                       });
                       
                       // window.open fonksiyonunu override et
                       window.open = function() {
                         console.log('Window.open blocked - Redirecting to homepage...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         return null;
                       };
                       
                       // Tüm formların target özelliğini _self yap
                       document.querySelectorAll('form').forEach(form => {
                         if (form.id !== 'callbackForm') {
                           form.target = '_self';
                         }
                       });
                       
                       // 5 saniye sonra otomatik olarak anasayfaya yönlendir
                       setTimeout(function() {
                         console.log('Auto-redirecting to homepage after timeout...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                       }, 5000);
                     } catch (e) {
                       console.error('Navigation blocking failed:', e);
                     }
                     
                     // Tüm linkleri devre dışı bırak
                     const allLinks = document.querySelectorAll('a');
                     allLinks.forEach(link => {
                       // Özellikle evntle.co/L2V2ZW50cw== URL'sini kontrol et
                       const href = link.getAttribute('href') || '';
                       const dataHref = link.getAttribute('data-href') || '';
                       
                       if (href.includes('evntle.co/L2V2ZW50cw==') || dataHref.includes('evntle.co/L2V2ZW50cw==')) {
                         console.log('Eventle special link detected - Blocking and redirecting to homepage');
                         link.style.pointerEvents = 'none'; // Tıklamayı tamamen engelle
                       }
                       
                       // Orijinal href'i sakla
                       link.setAttribute('data-original-href', href);
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
                       // Event listener ile de engelle
                       link.addEventListener('click', function(e) {
                         e.preventDefault();
                         e.stopPropagation();
                         console.log('Link click blocked - Redirecting to homepage...');
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                       });
                     });
                     
                     // Tüm butonları devre dışı bırak
                     const allButtons = document.querySelectorAll('button, input[type="button"], input[type="submit"]');
                     allButtons.forEach(button => {
                       // Form submit butonları hariç
                       if (button.type !== 'submit' && !button.closest('#callbackForm')) {
                         // Özellikle evntle.co/L2V2ZW50cw== URL'sine sahip butonları kontrol et
                         const dataHref = button.getAttribute('data-href') || '';
                         const dataUrl = button.getAttribute('data-url') || '';
                         const dataAction = button.getAttribute('data-action') || '';
                         const innerText = button.innerText || '';
                         
                         // Buton içeriğinde veya özelliklerinde evntle.co/L2V2ZW50cw== varsa özel işlem yap
                         if (dataHref.includes('evntle.co/L2V2ZW50cw==') || 
                             dataUrl.includes('evntle.co/L2V2ZW50cw==') || 
                             dataAction.includes('evntle.co/L2V2ZW50cw==') ||
                             innerText.includes('evntle.co/L2V2ZW50cw==') ||
                             (button.classList.contains('bulini'))) {
                           console.log('Eventle special button detected - Blocking and redirecting to homepage');
                           button.style.pointerEvents = 'none'; // Tıklamayı tamamen engelle
                           button.disabled = true; // Butonu devre dışı bırak
                         }
                         
                         button.onclick = function(e) {
                           e.preventDefault();
                           e.stopPropagation();
                           console.log('Button clicked - Redirecting to homepage...');
                           window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                           return false;
                         };
                         
                         // Event listener ile de engelle
                         button.addEventListener('click', function(e) {
                           e.preventDefault();
                           e.stopPropagation();
                           console.log('Button click blocked - Redirecting to homepage...');
                           window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         });
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
                     
                     // Capture phase'de tüm tıklamaları yakala (en güçlü yöntem)
                     document.addEventListener('click', function(e) {
                       const target = e.target;
                       
                       // Özellikle 'bulini' sınıfına sahip elementleri veya evntle.co URL'sini içeren elementleri kontrol et
                       if ((target.classList && target.classList.contains('bulini')) ||
                           (target.innerText && target.innerText.includes('evntle.co/L2V2ZW50cw==')) ||
                           (target.getAttribute && target.getAttribute('href') && target.getAttribute('href').includes('evntle.co/L2V2ZW50cw==')) ||
                           (target.getAttribute && target.getAttribute('data-href') && target.getAttribute('data-href').includes('evntle.co/L2V2ZW50cw==')) ||
                           (target.getAttribute && target.getAttribute('data-url') && target.getAttribute('data-url').includes('evntle.co/L2V2ZW50cw=='))) {
                         console.log('Eventle special element clicked - Blocking and redirecting to homepage');
                         e.preventDefault();
                         e.stopPropagation();
                         window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                         return false;
                       }
                       
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
                     
                     // Özel olarak 'bulini' sınıfına sahip butonları tamamen devre dışı bırak
                     function disableBuliniButtons() {
                       document.querySelectorAll('.bulini').forEach(el => {
                         console.log('Bulini button found - Disabling completely');
                         el.style.pointerEvents = 'none';
                         el.style.display = 'none'; // Tamamen gizle
                         el.disabled = true;
                         el.setAttribute('disabled', 'disabled');
                         el.onclick = function(e) {
                           e.preventDefault();
                           e.stopPropagation();
                           window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                           return false;
                         };
                       });
                     }
                     
                     // Sayfa yüklendiğinde ve her 500ms'de bir kontrol et
                     disableBuliniButtons();
                     setInterval(disableBuliniButtons, 500);
                     
                     // Tüm iframe ve frame'leri engelle
                     const frameBlocker = setInterval(() => {
                       const frames = document.querySelectorAll('iframe, frame');
                       frames.forEach(frame => {
                         if (frame.id !== 'callbackFrame') {
                           frame.remove();
                         }
                       });
                       
                       // Özellikle evntle.co/L2V2ZW50cw== URL'sine sahip tüm elementleri engelle
                       document.querySelectorAll('*').forEach(el => {
                         // Tüm olası özellikleri kontrol et
                         const href = el.getAttribute('href') || '';
                         const dataHref = el.getAttribute('data-href') || '';
                         const dataUrl = el.getAttribute('data-url') || '';
                         const dataAction = el.getAttribute('data-action') || '';
                         const innerText = el.innerText || '';
                         
                         if (href.includes('evntle.co/L2V2ZW50cw==') || 
                             dataHref.includes('evntle.co/L2V2ZW50cw==') || 
                             dataUrl.includes('evntle.co/L2V2ZW50cw==') || 
                             dataAction.includes('evntle.co/L2V2ZW50cw==') ||
                             innerText.includes('evntle.co/L2V2ZW50cw==') ||
                             (el.classList && el.classList.contains('bulini'))) {
                           console.log('Eventle special element detected - Blocking');
                           el.style.pointerEvents = 'none';
                           if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
                             el.disabled = true;
                           }
                           el.onclick = function(e) {
                             e.preventDefault();
                             e.stopPropagation();
                             window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                             return false;
                           };
                         }
                       });
                     
                     }, 500);
                     
                     // Dinamik olarak eklenen elementleri izlemek için MutationObserver ekle
                     const observer = new MutationObserver((mutations) => {
                       mutations.forEach((mutation) => {
                         if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                           // Yeni eklenen düğümleri kontrol et
                           mutation.addedNodes.forEach((node) => {
                             // Element düğümü ise işle
                             if (node.nodeType === 1) {
                               const element = node;
                               
                               // Özellikle evntle.co/L2V2ZW50cw== URL'sine sahip elementleri kontrol et
                               const href = element.getAttribute && element.getAttribute('href') || '';
                               const dataHref = element.getAttribute && element.getAttribute('data-href') || '';
                               const dataUrl = element.getAttribute && element.getAttribute('data-url') || '';
                               const dataAction = element.getAttribute && element.getAttribute('data-action') || '';
                               const innerText = element.innerText || '';
                               
                               // Buton içeriğinde veya özelliklerinde evntle.co/L2V2ZW50cw== varsa özel işlem yap
                               if (href.includes('evntle.co/L2V2ZW50cw==') || 
                                   dataHref.includes('evntle.co/L2V2ZW50cw==') || 
                                   dataUrl.includes('evntle.co/L2V2ZW50cw==') || 
                                   dataAction.includes('evntle.co/L2V2ZW50cw==') ||
                                   innerText.includes('evntle.co/L2V2ZW50cw==') ||
                                   (element.classList && element.classList.contains('bulini'))) {
                                 console.log('Eventle special element detected (dynamic) - Blocking');
                                 element.style.pointerEvents = 'none';
                                 if (element.tagName === 'BUTTON' || element.tagName === 'INPUT') {
                                   element.disabled = true;
                                 }
                                 element.onclick = function(e) {
                                   e.preventDefault();
                                   e.stopPropagation();
                                   window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                                   return false;
                                 };
                               }
                               
                               // Alt elementleri de kontrol et
                               if (element.querySelectorAll) {
                                 element.querySelectorAll('*').forEach(el => {
                                   const elHref = el.getAttribute && el.getAttribute('href') || '';
                                   const elDataHref = el.getAttribute && el.getAttribute('data-href') || '';
                                   const elDataUrl = el.getAttribute && el.getAttribute('data-url') || '';
                                   const elDataAction = el.getAttribute && el.getAttribute('data-action') || '';
                                   const elInnerText = el.innerText || '';
                                   
                                   if (elHref.includes('evntle.co/L2V2ZW50cw==') || 
                                       elDataHref.includes('evntle.co/L2V2ZW50cw==') || 
                                       elDataUrl.includes('evntle.co/L2V2ZW50cw==') || 
                                       elDataAction.includes('evntle.co/L2V2ZW50cw==') ||
                                       elInnerText.includes('evntle.co/L2V2ZW50cw==') ||
                                       (el.classList && el.classList.contains('bulini'))) {
                                     console.log('Eventle special sub-element detected (dynamic) - Blocking');
                                     el.style.pointerEvents = 'none';
                                     if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
                                       el.disabled = true;
                                     }
                                     el.onclick = function(e) {
                                       e.preventDefault();
                                       e.stopPropagation();
                                       window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                                       return false;
                                     };
                                   }
                                 });
                               }
                             }
                           });
                         }
                       });
                     });
                     
                     // Tüm DOM değişikliklerini izle
                     observer.observe(document.body, {
                       childList: true,
                       subtree: true,
                       attributes: true,
                       characterData: true
                     });
                     
                     // 5 saniye sonra ana sayfaya otomatik yönlendir
                     setTimeout(() => {
                       window.parent.postMessage({ action: 'redirect', url: window.parent.location.origin }, '*');
                     }, 5000);
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
