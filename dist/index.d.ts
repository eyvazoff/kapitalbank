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
    private readonly currency;
    private paymentInstance;
    private paymentStatusInstance;
    private paymentInformationInstance;
    constructor({ merchantId, approveUrl, cancelUrl, declineUrl, liveMode, certFilePath, keyFilePath, defaultLanguage, currency }: any);
    private post;
    createOrder(amount: number, description: string, preAuth?: boolean): Promise<PaymentInstance | null>;
    completeOrder(orderId: number, sessionId: string, amount: number, description: string): Promise<string>;
    reverseOrder(orderId: number, sessionId: string, description: string): Promise<string>;
    getOrderStatus(orderId: number, sessionId: string): Promise<PaymentStatusInstance | null>;
    getOrderInformation(orderId: number, sessionId: string): Promise<PaymentInformationInstance | null>;
}
export = KapitalBank;
//# sourceMappingURL=index.d.ts.map