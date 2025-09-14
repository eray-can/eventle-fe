import { FAQItem } from '@/components/common/faq';
import { SocietyDetailInfo } from '@/types/domain';
import { formatDuration, translateDayToTurkish } from '@/lib/utils';

interface EventData {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  fullAddress: string;
  city: string;
  district: string;
  category: string;
  url?: string;
  urlBugece?: string;
  urlBiletino?: string;
  urlBiletix?: string;
  urlIksv?: string;
  organizer?: string;
}



interface TicketProvider {
  name: string;
  url: string;
}

export function generateEventFAQ(eventData: EventData): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Etkinlik ne zaman gerçekleşecek?
  if (eventData.startDate && eventData.endDate) {
    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);
    
    const startDateStr = startDate.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const startTimeStr = startDate.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const endDateStr = endDate.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const endTimeStr = endDate.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    faqs.push({
      id: 'event-date',
      question: "Etkinlik ne zaman gerçekleşecek?",
      answer: `👉 ${startDateStr} saat ${startTimeStr}'de başlayacak, ${endDateStr} saat ${endTimeStr}'de sona erecek.`
    });
  }

  // Etkinlik nerede yapılacak?
  if (eventData.location && eventData.fullAddress) {
    faqs.push({
      id: 'event-location',
      question: "Etkinlik nerede yapılacak?",
      answer: `👉 ${eventData.location}, ${eventData.fullAddress} adresinde gerçekleşecektir.`
    });
  }

  // Etkinliğin biletlerini nereden alabilirim?
  const ticketProviders = getAvailableTicketProviders(eventData);
  if (ticketProviders.length > 0) {
    let ticketAnswer = "👉 Biletler ";
    
    if (ticketProviders.length === 1) {
      ticketAnswer += `${ticketProviders[0].name} üzerinden satın alınabilir.`;
    } else {
      const providerNames = ticketProviders.map(p => p.name);
      const lastProvider = providerNames.pop();
      ticketAnswer += `${providerNames.join(', ')} ve ${lastProvider} üzerinden satın alınabilir.`;
    }

    faqs.push({
      id: 'event-tickets',
      question: "Etkinliğin biletlerini nereden alabilirim?",
      answer: ticketAnswer
    });
  }

  // Etkinliği kim düzenliyor?
  if (eventData.organizer) {
    faqs.push({
      id: 'event-organizer',
      question: "Etkinliği kim düzenliyor?",
      answer: `👉 Etkinlik, ${eventData.organizer} tarafından organize edilmektedir.`
    });
  }

  // Etkinliğin türü nedir?
  if (eventData.category && eventData.name) {
    faqs.push({
      id: 'event-type',
      question: "Etkinliğin türü nedir?",
      answer: `👉 ${eventData.category} etkinliği, ${eventData.name} ile gerçekleşecektir.`
    });
  }

  return faqs;
}

function getProviderNameFromUrl(url: string): string {
  if (!url) return "bilet satış sitesi";
  
  const domain = url.toLowerCase();
  
  if (domain.includes('bugece')) {
    return 'Bugece';
  }
  
  if (domain.includes('iksv')) {
    return 'İKSV';
  }
  
  if (domain.includes('biletino')) {
    return 'Biletino';
  }
  
  if (domain.includes('biletix')) {
    return 'Biletix';
  }
  
  if (domain.includes('passo')) {
    return 'Passo';
  }
  
  if (domain.includes('mobilet')) {
    return 'Mobilet';
  }
  
  if (domain.includes('ticketturk')) {
    return 'TicketTurk';
  }
  
  // Ana site için default
  return "resmi web sitesi";
}

function getAvailableTicketProviders(eventData: EventData): TicketProvider[] {
  const providers: TicketProvider[] = [];
  const allUrls = [
    eventData.urlBugece,
    eventData.urlBiletino,
    eventData.urlBiletix,
    eventData.urlIksv,
    eventData.url
  ].filter(url => url && url !== 'nan' && url.trim() !== '');

  // Her URL için domain kontrolü yaparak provider adını belirle
  allUrls.forEach(url => {
    if (url) {
      const providerName = getProviderNameFromUrl(url);
      providers.push({ name: providerName, url });
    }
  });

  return providers;
}

export function generateSocietyFAQ(societyData: SocietyDetailInfo): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Topluluk nerede yapılıyor?
  if (societyData.location) {
    faqs.push({
      id: 'society-location',
      question: "Topluluk etkinliği nerede yapılıyor?",
      answer: `👉 ${societyData.location}'da gerçekleştirilecektir.`
    });
  }

  // Topluluk hangi tarihlerde düzenleniyor?
  if (societyData.sessionGroups && societyData.sessionGroups.length > 0) {
    const firstSession = societyData.sessionGroups[0]?.sessions[0];
    const lastSessionGroup = societyData.sessionGroups[societyData.sessionGroups.length - 1];
    const lastSession = lastSessionGroup?.sessions[lastSessionGroup.sessions.length - 1];
    
    if (firstSession && lastSession) {
      // Session'ların date alanını kullan ve startTime/endTime ile birleştir
      const firstSessionGroup = societyData.sessionGroups[0];
      const lastSessionGroup = societyData.sessionGroups[societyData.sessionGroups.length - 1];
      
      // Tarih formatını kontrol et ve düzelt
      const formatDate = (dateStr: string) => {
        // Eğer DD-MM-YYYY formatındaysa YYYY-MM-DD'ye çevir
        if (dateStr.includes('-') && dateStr.split('-').length === 3) {
          const parts = dateStr.split('-');
          if (parts[0].length === 2) {
            // DD-MM-YYYY formatı
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        }
        return dateStr;
      };
      
      const startDate = new Date(`${formatDate(firstSessionGroup.date)}T${firstSession.startTime}`);
      const endDate = new Date(`${formatDate(lastSessionGroup.date)}T${lastSession.endTime}`);
      
      const startDateStr = startDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      const endDateStr = endDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Hangi günler tekrarlanıyor bilgisi varsa ekle
      let dateAnswer = `👉 ${startDateStr}'te başlayacak ve ${endDateStr}'e kadar gerçekleştirilecektir.`;
      if (societyData.whichDays) {
        // İngilizce gün isimlerini Türkçe'ye çevir
        const turkishDays = societyData.whichDays
          .split(', ')
          .map(day => translateDayToTurkish(day.trim()))
          .join(', ');
        dateAnswer += ` ${turkishDays} günleri gerçekleştirilecektir.`;
      }
      
      faqs.push({
        id: 'society-dates',
        question: "Topluluk etkinliği hangi tarihlerde düzenleniyor?",
        answer: dateAnswer
      });
    }
  }

  // Topluluk süresi ne kadar?
  if (societyData.duration) {
    faqs.push({
      id: 'society-duration',
      question: "Topluluk etkinliği süresi ne kadar?",
      answer: `👉 Her oturum ${formatDuration(societyData.duration)} sürecektir.`
    });
  }

  // Topluluk ücreti ne kadar?
  if (societyData.sessionGroups && societyData.sessionGroups.length > 0) {
    const firstSession = societyData.sessionGroups[0]?.sessions[0];
    if (firstSession) {
      let priceAnswer = `👉 Standart fiyat ${firstSession.price.toLocaleString()}₺`;
      if (firstSession.discountedPrice && firstSession.price > 0) {
        const discountPercent = Math.round(((firstSession.price - firstSession.discountedPrice) / firstSession.price) * 100);
        priceAnswer += `, %${discountPercent} indirimli fiyat ${firstSession.discountedPrice.toLocaleString()}₺'dir.`;
      } else if (firstSession.discountedPrice && firstSession.price === 0) {
        priceAnswer += `, indirimli fiyat ${firstSession.discountedPrice.toLocaleString()}₺'dir.`;
      } else {
        priceAnswer += "'dir.";
      }
      
      faqs.push({
        id: 'society-price',
        question: "Topluluk etkinliği ücreti ne kadar?",
        answer: priceAnswer
      });
    }
  }

  // Topluluk etkinliğini kim düzenliyor?
  if (societyData.owner?.fullName) {
    faqs.push({
      id: 'society-organizer',
      question: "Topluluk etkinliğini kim düzenliyor?",
      answer: `👉 Etkinlik, ${societyData.owner.fullName} tarafından organize edilmektedir.`
    });
  }

  // Gereksinimler varsa ekle
  if (societyData.requirements) {
    faqs.push({
      id: 'society-requirements',
      question: "Topluluk etkinliği için gereksinimler neler?",
      answer: `👉 ${societyData.requirements}`
    });
  }

  // Ücrete dahil olanlar varsa ekle
  if (societyData.whatIsInPrice) {
    faqs.push({
      id: 'society-included',
      question: "Topluluk etkinliği ücretine neler dahil?",
      answer: `👉 ${societyData.whatIsInPrice}`
    });
  }

  return faqs;
}

export function generateWorkshopFAQ(workshopData: SocietyDetailInfo): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Atölye nerede yapılıyor?
  if (workshopData.location) {
    faqs.push({
      id: 'workshop-location',
      question: "Atölye nerede yapılıyor?",
      answer: `👉 ${workshopData.location}'da gerçekleştirilecektir.`
    });
  }

  // Atölye hangi tarihlerde düzenleniyor?
  if (workshopData.sessionGroups && workshopData.sessionGroups.length > 0) {
    const firstSession = workshopData.sessionGroups[0]?.sessions[0];
    const lastSessionGroup = workshopData.sessionGroups[workshopData.sessionGroups.length - 1];
    const lastSession = lastSessionGroup?.sessions[lastSessionGroup.sessions.length - 1];
    
    if (firstSession && lastSession) {
      // Session'ların date alanını kullan ve startTime/endTime ile birleştir
      const firstSessionGroup = workshopData.sessionGroups[0];
      const lastSessionGroup = workshopData.sessionGroups[workshopData.sessionGroups.length - 1];
      
      // Tarih formatını kontrol et ve düzelt
      const formatDate = (dateStr: string) => {
        // Eğer DD-MM-YYYY formatındaysa YYYY-MM-DD'ye çevir
        if (dateStr.includes('-') && dateStr.split('-').length === 3) {
          const parts = dateStr.split('-');
          if (parts[0].length === 2) {
            // DD-MM-YYYY formatı
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        }
        return dateStr;
      };
      
      const startDate = new Date(`${formatDate(firstSessionGroup.date)}T${firstSession.startTime}`);
      const endDate = new Date(`${formatDate(lastSessionGroup.date)}T${lastSession.endTime}`);
      
      const startDateStr = startDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      const endDateStr = endDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Hangi günler tekrarlanıyor bilgisi varsa ekle
      let dateAnswer = `👉 ${startDateStr}'te başlayacak ve ${endDateStr}'e kadar gerçekleştirilecektir.`;
      if (workshopData.whichDays) {
        // İngilizce gün isimlerini Türkçe'ye çevir
        const turkishDays = workshopData.whichDays
          .split(', ')
          .map(day => translateDayToTurkish(day.trim()))
          .join(', ');
        dateAnswer += ` ${turkishDays} günleri gerçekleştirilecektir.`;
      }
      
      faqs.push({
        id: 'workshop-dates',
        question: "Atölye hangi tarihlerde düzenleniyor?",
        answer: dateAnswer
      });
    }
  }

  // Atölye süresi ne kadar?
  if (workshopData.duration) {
    faqs.push({
      id: 'workshop-duration',
      question: "Atölye süresi ne kadar?",
      answer: `👉 Her oturum ${formatDuration(workshopData.duration)} sürecektir.`
    });
  }

  // Atölye ücreti ne kadar?
  if (workshopData.sessionGroups && workshopData.sessionGroups.length > 0) {
    const firstSession = workshopData.sessionGroups[0]?.sessions[0];
    if (firstSession) {
      let priceAnswer = `👉 Standart fiyat ${firstSession.price.toLocaleString()}₺`;
      if (firstSession.discountedPrice && firstSession.price > 0) {
        const discountPercent = Math.round(((firstSession.price - firstSession.discountedPrice) / firstSession.price) * 100);
        priceAnswer += `, %${discountPercent} indirimli fiyat ${firstSession.discountedPrice.toLocaleString()}₺'dir.`;
      } else if (firstSession.discountedPrice && firstSession.price === 0) {
        priceAnswer += `, indirimli fiyat ${firstSession.discountedPrice.toLocaleString()}₺'dir.`;
      } else {
        priceAnswer += "'dir.";
      }
      
      faqs.push({
        id: 'workshop-price',
        question: "Atölye ücreti ne kadar?",
        answer: priceAnswer
      });
    }
  }

  // Atölyeyi kim düzenliyor?
  if (workshopData.owner?.fullName) {
    faqs.push({
      id: 'workshop-organizer',
      question: "Atölyeyi kim düzenliyor?",
      answer: `👉 Atölye, ${workshopData.owner.fullName} tarafından organize edilmektedir.`
    });
  }

  // Gereksinimler varsa ekle
  if (workshopData.requirements) {
    faqs.push({
      id: 'workshop-requirements',
      question: "Atölye için gereksinimler neler?",
      answer: `👉 ${workshopData.requirements}`
    });
  }

  // Ücrete dahil olanlar varsa ekle
  if (workshopData.whatIsInPrice) {
    faqs.push({
      id: 'workshop-included',
      question: "Atölye ücretine neler dahil?",
      answer: `👉 ${workshopData.whatIsInPrice}`
    });
  }

  return faqs;
}

export function getEventFAQForSchema(eventData: EventData) {
  return generateEventFAQ(eventData).map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
}

export function getSocietyFAQForSchema(societyData: SocietyDetailInfo) {
  return generateSocietyFAQ(societyData).map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
}

export function getWorkshopFAQForSchema(workshopData: SocietyDetailInfo) {
  return generateWorkshopFAQ(workshopData).map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
}