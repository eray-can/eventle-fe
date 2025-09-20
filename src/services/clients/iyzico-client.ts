import crypto from 'crypto';
import {ApiClient} from '@/lib/http';
import {IyzicoConfig, IyzicoRequest, IyzicoResponse} from '@/types/iyzico';
import {generateRandomString} from '@/lib/utils';

// Iyzico API sabitleri
const IYZICO_API_KEY = 'sandbox-fNm91IZjhMqgeYIDsBEWIGXtmBMSHQAa';
const IYZICO_SECRET_KEY = 'sandbox-NVEPiHRuEnqcoSgMSUISW1EXRpEtlFcI';
const IYZICO_BASE_URL = 'https://sandbox-api.iyzipay.com';

export class IyzicoClient {
    private config: IyzicoConfig;
    private apiClient: ApiClient;

    constructor(config?: IyzicoConfig) {
        this.config = config || {
            apiKey: 'sandbox-fNm91IZjhMqgeYIDsBEWIGXtmBMSHQAa',
            secretKey: 'sandbox-NVEPiHRuEnqcoSgMSUISW1EXRpEtlFcI',
            baseUrl: 'https://sandbox-api.iyzipay.com'
        };
        this.apiClient = new ApiClient({
            baseURL: this.config.baseUrl,
            timeout: 10000
        });
    }


    private generateAuthorizationHeader(request: IyzicoRequest, randomString: string, endpoint: string): string {
        const requestString = JSON.stringify(request);
        const dataToSign = randomString + endpoint + requestString;

        const hmac = crypto.createHmac('sha256', this.config.secretKey);
        hmac.update(dataToSign);
        const signature = hmac.digest('hex');

        const authString = `apiKey:${this.config.apiKey}&randomKey:${randomString}&signature:${signature}`;
        return `IYZWSv2 ${Buffer.from(authString).toString('base64')}`;
    }

    private async makeRequest(endpoint: string, request: IyzicoRequest): Promise<IyzicoResponse> {
        const randomString = generateRandomString();
        const authorization = this.generateAuthorizationHeader(request, randomString, endpoint);

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'x-iyzi-rnd': randomString,
            'x-iyzi-client-version': 'iyzipay-node-2.0.0'
        };

        return await this.apiClient.request<IyzicoResponse>({
            method: 'POST',
            url: endpoint,
            data: request,
            headers
        });

    }

    async post(endpoint: string, data: IyzicoRequest): Promise<IyzicoResponse> {
        return this.makeRequest(endpoint, data);
    }
}

export const iyzicoClient = new IyzicoClient({
    apiKey: IYZICO_API_KEY,
    secretKey: IYZICO_SECRET_KEY,
    baseUrl: IYZICO_BASE_URL
});

export type {IyzicoConfig, IyzicoRequest, IyzicoResponse};
