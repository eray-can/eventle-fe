import { useState, useCallback } from 'react';

export interface PaymentFormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export interface PaymentFormErrors {
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
}

export interface UsePaymentFormReturn {
  formData: PaymentFormData;
  errors: PaymentFormErrors;
  isValid: boolean;
  showErrors: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  setShowErrors: (show: boolean) => void;
}

const initialFormData: PaymentFormData = {
  name: '',
  surname: '',
  phone: '',
  email: ''
};

// Telefon numarası formatlama fonksiyonu
const formatPhoneNumber = (value: string): string => {
  // Sadece rakamları al
  const numbers = value.replace(/\D/g, '');
  
  // 11 karakterden fazla girişi engelle
  if (numbers.length > 11) {
    return value.slice(0, -1);
  }
  
  // Formatla: 0XXX XXX XX XX
  if (numbers.length <= 4) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7)}`;
  } else {
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9)}`;
  }
};

export const usePaymentForm = (): UsePaymentFormReturn => {
  const [formData, setFormData] = useState<PaymentFormData>(initialFormData);
  const [errors, setErrors] = useState<PaymentFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showErrors, setShowErrors] = useState(false);

  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Ad alanı zorunludur';
        if (value.trim().length < 2) return 'Ad en az 2 karakter olmalıdır';
        break;
      case 'surname':
        if (!value.trim()) return 'Soyad alanı zorunludur';
        if (value.trim().length < 2) return 'Soyad en az 2 karakter olmalıdır';
        break;
      case 'phone':
        if (!value.trim()) return 'Telefon numarası zorunludur';
        const cleanPhone = value.replace(/\s/g, '');
        const phoneRegex = /^(05)[0-9]{9}$/;
        if (cleanPhone.length < 11) return 'Telefon numarası 11 haneli olmalıdır';
        if (!phoneRegex.test(cleanPhone)) return 'Geçerli bir telefon numarası giriniz (05XX XXX XX XX)';
        break;
      case 'email':
        if (!value.trim()) return 'E-posta adresi zorunludur';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Geçerli bir e-posta adresi giriniz';
        break;
    }
    return undefined;
  }, []);

  const validateAllFields = useCallback((data: PaymentFormData): PaymentFormErrors => {
    const newErrors: PaymentFormErrors = {};
    Object.keys(data).forEach(key => {
      const error = validateField(key, data[key as keyof PaymentFormData]);
      if (error) newErrors[key as keyof PaymentFormErrors] = error;
    });
    return newErrors;
  }, [validateField]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Telefon numarası için formatlama uygula
    let formattedValue = value;
    if (name === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }
    
    const newFormData = {
      ...formData,
      [name]: formattedValue
    };
    setFormData(newFormData);
    
    // Validate field only if errors are being shown and field has been touched
    if (showErrors && touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [formData, showErrors, touched, validateField]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Only show error on blur if showErrors is true
    if (showErrors) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [showErrors, validateField]);

  const validateForm = useCallback((): boolean => {
    const newErrors = validateAllFields(formData);
    setErrors(newErrors);
    setShowErrors(true);
    
    const isValid = Object.keys(newErrors).length === 0 && 
                   formData.name.trim() !== '' && 
                   formData.surname.trim() !== '' && 
                   formData.phone.trim() !== '' && 
                   formData.email.trim() !== '';
    
    return isValid;
  }, [formData, validateAllFields]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setShowErrors(false);
  }, []);

  const isValid = Object.keys(validateAllFields(formData)).length === 0 && 
                 formData.name.trim() !== '' && 
                 formData.surname.trim() !== '' && 
                 formData.phone.trim() !== '' && 
                 formData.email.trim() !== '';

  return {
    formData,
    errors,
    isValid,
    showErrors,
    handleInputChange,
    handleBlur,
    validateForm,
    resetForm,
    setShowErrors
  };
};