import { PaymentInstance, PaymentStatusInstance, PaymentInformationInstance } from "./interfaces";
declare class KapitalBank {
    private readonly baseUrl;
    private readonly port;
    private readonly certFile;
    private readonly keyFile;
    private readonly merchantId;
    private readonly approveUrl;
    private readonly cancelUrl;
    private readonly declineUrl;
    private readonly liveMode;
    private readonly defaultLanguage;
    private paymentInstance;
    private paymentStatusInstance;
    private paymentInformationInstance;
    constructor(merchantId: string, approveUrl: string, cancelUrl: string, declineUrl: string, liveMode?: boolean, certFilePath?: string, keyFilePath?: string, defaultLanguage?: string);
    private post;
    getPayment(): PaymentInstance | null;
    getPaymentStatus(): PaymentStatusInstance | null;
    getPaymentInformation(): PaymentInformationInstance | null;
    createOrder(amount: number, currency: number | undefined, description: string, lang?: string, preAuth?: boolean): Promise<PaymentInstance | null>;
    completeOrder(orderId: number, sessionId: string, amount: number, description: string, lang?: string): Promise<string>;
    reverseOrder(orderId: number, sessionId: string, description: string, lang?: string): Promise<string>;
    getOrderStatus(orderId: number, sessionId: string, lang?: string): Promise<PaymentStatusInstance | null>;
    getOrderInformation(orderId: number, sessionId: string, lang?: string): Promise<PaymentInformationInstance | null>;
}
export = KapitalBank;
//# sourceMappingURL=index.d.ts.map