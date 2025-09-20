import {iyzicoClient} from '@/services/clients/iyzico-client';
import {v4 as uuidv4} from 'uuid';
import type {IyzicoCheckoutFormPayload, IyzicoResponse} from '@/types/iyzico';
import type {PaymentRequest} from '@/types/domain/payment';
import { BASE_DOMAIN, encodeToBase64 } from '@/lib/utils';

const CHECKOUT_FORM_ENDPOINT = '/payment/iyzipos/checkoutform/initialize/auth/ecom';

export class IyzicoService {
    private getPublicIp(): string {
        return '85.34.78.112';
    }

    async createCheckoutForm(request: PaymentRequest, callbackUrl?: string): Promise<IyzicoResponse> {

        const ipAddress = this.getPublicIp();
        const fullName = `${request.customerInfo.name.trim()} ${request.customerInfo.surname.trim()}`.trim();

        const basePrice = parseFloat((request.amount / 1.20).toFixed(2));

        // Base64 encoded data
        const encodedData = encodeToBase64({
            type: "workshop",
            seans_id: 323,
            ticket_count: 1,
            original_callback_url: callbackUrl
        });

        const payload: IyzicoCheckoutFormPayload = {
            locale: "eng",
            conversationId: uuidv4(),
            price: basePrice,
            paymentGroup: "LISTING",
            buyer: {
                id: `guest-${request.customerInfo.phone.trim()}`,
                name: request.customerInfo.name.trim(),
                surname: request.customerInfo.surname.trim(),
                identityNumber: "11111111111",
                email: request.customerInfo.email.trim(),
                registrationAddress: "Muradiye, Deryadil Sokağı No:60 D:5, 34357 Beşiktaş/İstanbul",
                city: "İstanbul",
                country: "Turkey",
                zipCode: "34357",
                ip: ipAddress
            },
            shippingAddress: {
                address: "Muradiye, Deryadil Sokağı No:60 D:5, 34357 Beşiktaş/İstanbul",
                contactName: fullName.length > 0 ? fullName : "Guest",
                city: "İstanbul",
                country: "Turkey"
            },
            billingAddress: {
                address: "Muradiye, Deryadil Sokağı No:60 D:5, 34357 Beşiktaş/İstanbul",
                contactName: fullName.length > 0 ? fullName : "Guest",
                city: "İstanbul",
                country: "Turkey"
            },
            basketItems: [
                {
                    id: "BI101",
                    price: basePrice,
                    name: "Binocular",
                    category1: "Collectibles",
                    itemType: "VIRTUAL"
                }
            ],
            callbackUrl: `${BASE_DOMAIN}/isleniyor?data=${encodedData}`,
            paidPrice: request.amount
        };

        return await iyzicoClient.post(CHECKOUT_FORM_ENDPOINT, payload);
    }
}
