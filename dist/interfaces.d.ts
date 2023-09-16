interface PaymentInstance {
    amount: number | null;
    orderId: number | null;
    sessionId: string | null;
    url: string | null;
    status: string;
    description: string | null;
    currency: string | null;
    languageCode: string | null;
}
interface PaymentStatusInstance {
    orderId: number | null;
    statusCode: string;
    state: string | null;
}
interface PaymentInformationInstance {
    orderId: number | null;
    sessionId: string | null;
    createDate: Date | null;
    lastUpdateDate: Date | null;
    payDate: Date | null;
    amount: number;
    currency: string;
    orderLanguage: string;
    description: string;
    approveUrl: string;
    cancelUrl: string;
    declineUrl: string;
    orderStatus: string;
    Receipt: string | number;
    twoId: number;
    refundAmount: number | null;
    refundCurrency: string | null;
    refundDate: Date | null;
    extSystemProcess: number | null;
    orderType: string;
    orderSubType: string | null;
    fee: number;
    TWODate: number;
    TWOTime: number;
}
export { PaymentInstance, PaymentStatusInstance, PaymentInformationInstance };
//# sourceMappingURL=interfaces.d.ts.map