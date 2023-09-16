declare const createOrderXml: (data: any, approveUrl: string, cancelUrl: string, declineUrl: string) => string;
declare const getOrderStatusXml: (data: any) => string;
declare const getOrderInformationXml: (data: any) => string;
declare const completionXml: (data: any) => string;
declare const reverseXml: (merchantId: string, data: any) => string;
export { completionXml, createOrderXml, reverseXml, getOrderStatusXml, getOrderInformationXml };
//# sourceMappingURL=xmlBuilders.d.ts.map