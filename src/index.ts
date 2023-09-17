import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import fs from 'fs';
import https from 'https';
import xml2js from 'xml2js';

import {
    PaymentInstance,
    PaymentStatusInstance,
    PaymentInformationInstance
} from "./interfaces";
import {createOrderXml, completionXml, reverseXml, getOrderStatusXml, getOrderInformationXml} from "./xmlBuilders";
import {completePaymentObj, paymentInformationObj, paymentObj, paymentStatusObj, reversePaymentObj} from "./xmlParsers";

class KapitalBank {
    private readonly baseUrl: string;
    private readonly port: string;
    private readonly certFile: string;
    private readonly keyFile: string;
    private readonly merchantId: string;
    private readonly approveUrl: string;
    private readonly cancelUrl: string;
    private readonly declineUrl: string;
    private readonly liveMode: boolean;
    private readonly defaultLanguage: string;
    private readonly currency: number;
    private paymentInstance: PaymentInstance | null = null;
    private paymentStatusInstance: PaymentStatusInstance | null = null;
    private paymentInformationInstance: PaymentInformationInstance | null = null;

    constructor(
        {
            merchantId,
            approveUrl,
            cancelUrl,
            declineUrl,
            liveMode = false,
            certFilePath = './certs/test.crt',
            keyFilePath = './certs/test.key',
            defaultLanguage = 'EN',
            currency = 944
        }: any
    ) {
        this.liveMode = liveMode
        this.baseUrl = this.liveMode ? 'https://3dsrv.kapitalbank.az' : 'https://tstpg.kapitalbank.az';
        this.port = '5443';
        this.certFile = certFilePath;
        this.keyFile = keyFilePath;
        this.merchantId = merchantId;
        this.approveUrl = approveUrl;
        this.cancelUrl = cancelUrl;
        this.declineUrl = declineUrl;
        this.defaultLanguage = defaultLanguage
        this.currency = currency
    }

    private async post(data: string): Promise<string> {
        const headers: AxiosRequestConfig = {
            headers: {'Content-Type': 'application/xml'},
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
                cert: fs.readFileSync(this.certFile),
                key: fs.readFileSync(this.keyFile)
            }),
        }

        const response: AxiosResponse = await axios.post(
            `${this.baseUrl}:${this.port}/Exec`,
            data,
            headers
        )
        return response.data;
    }


    async createOrder(amount: number, description: string, preAuth: boolean = false) {
        const orderData: any = {
            merchant: this.merchantId,
            amount,
            currency: this.currency,
            description,
            lang: this.defaultLanguage,
            orderType: preAuth ? 'PreAuth' : 'Purchase',
        };
        const xmlData = createOrderXml(orderData, this.approveUrl, this.cancelUrl, this.declineUrl);
        const result = await this.post(xmlData);
        await paymentObj(orderData, result, (response: any) => {
            this.paymentInstance = response
        })
        return this.paymentInstance;
    }

    async completeOrder(
        orderId: number,
        sessionId: string,
        amount: number,
        description: string
    ) {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            amount,
            description,
            lang: this.defaultLanguage,
        };
        const xmlData: string = completionXml(orderData);
        const result: string = await this.post(xmlData);
        await completePaymentObj(result, this.defaultLanguage, (response: any) => {
            console.log(response)
        })
        return result;
    }

    async reverseOrder(orderId: number, sessionId: string, description: string) {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            lang: this.defaultLanguage,
            description
        };
        const xmlData: string = reverseXml(this.merchantId, orderData);
        const result: string = await this.post(xmlData);
        await reversePaymentObj(result, this.defaultLanguage, (response: any) => {
            console.log(response)
        })
        return result;
    }

    async getOrderStatus(orderId: number, sessionId: string) {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            lang: this.defaultLanguage
        };
        const xmlData: string = getOrderStatusXml(orderData);
        const result: string = await this.post(xmlData);
        paymentStatusObj(result, this.defaultLanguage, (response: any) => {
            this.paymentStatusInstance = response
        })
        return this.paymentStatusInstance;
    }

    async getOrderInformation(orderId: number, sessionId: string) {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            lang: this.defaultLanguage
        };
        const xmlData: string = getOrderInformationXml(orderData);
        const result: string = await this.post(xmlData);
        paymentInformationObj(result, this.defaultLanguage, (response: any) => {
            this.paymentInformationInstance = response
        })
        return this.paymentInformationInstance;
    }
}

export = KapitalBank;
