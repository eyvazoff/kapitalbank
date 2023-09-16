import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import fs from 'fs';
import https from 'https';
import xml2js from 'xml2js';

import {
    PaymentInstance,
    PaymentStatusInstance,
    PaymentInformationInstance
} from "./interfaces";
import {completionXml, createOrderXml, getOrderInformationXml, getOrderStatusXml, reverseXml} from "./xmlBuilders";
import {paymentInformationObj, paymentObj, paymentStatusObj} from "./xmlParsers";

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
    private paymentInstance: PaymentInstance | null = null;
    private paymentStatusInstance: PaymentStatusInstance | null = null;
    private paymentInformationInstance: PaymentInformationInstance | null = null;

    constructor(
        merchantId: string,
        approveUrl: string,
        cancelUrl: string,
        declineUrl: string,
        liveMode: boolean = false,
        certFilePath: string = './certs/test.crt',
        keyFilePath: string = './certs/test.key',
        defaultLanguage: string = 'EN'
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
    }

    private async post(data: string): Promise<string> {
        const headers: AxiosRequestConfig = {
            headers: {'Content-Type': 'application/xml'},
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
                cert: fs.readFileSync(this.certFile),
                key: fs.readFileSync(this.keyFile)
            }),
        };


        const response: AxiosResponse = await axios.post(
            `${this.baseUrl}:${this.port}/Exec`,
            data,
            headers
        );

        return response.data;
    }

    getPayment(): PaymentInstance | null {
        return this.paymentInstance;
    }

    getPaymentStatus(): PaymentStatusInstance | null {
        return this.paymentStatusInstance;
    }

    getPaymentInformation(): PaymentInformationInstance | null {
        return this.paymentInformationInstance;
    }

    async createOrder(
        amount: number,
        currency: number = 944,
        description: string,
        lang: string = this.defaultLanguage,
        preAuth: boolean = false
    ): Promise<PaymentInstance | null> {
        const orderData: any = {
            merchant: this.merchantId,
            amount,
            currency,
            description,
            lang,
            orderType: preAuth ? 'PreAuth' : 'Purchase',
        };
        const xmlData = createOrderXml(orderData, this.approveUrl, this.cancelUrl, this.declineUrl);
        const result = await this.post(xmlData);
        paymentObj(orderData, result, (response: any) => {
            this.paymentInstance = response
        })
        return this.getPayment();
    }

    async completeOrder(
        orderId: number,
        sessionId: string,
        amount: number,
        description: string,
        lang: string = this.defaultLanguage
    ): Promise<string> {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            amount,
            description,
            lang,
        };
        const xmlData: string = completionXml(orderData);
        const result: string = await this.post(xmlData);
        const responseXml = await xml2js.parseStringPromise(result);
        return responseXml.TKKPG.Response.Status;
    }

    async reverseOrder(
        orderId: number,
        sessionId: string,
        description: string,
        lang: string = this.defaultLanguage
    ): Promise<string> {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            lang,
            description,
        };
        const xmlData: string = reverseXml(this.merchantId, orderData);
        const result: string = await this.post(xmlData);
        const responseXml = await xml2js.parseStringPromise(result);
        return responseXml.TKKPG.Response.Status;
    }

    async getOrderStatus(
        orderId: number,
        sessionId: string,
        lang: string = this.defaultLanguage
    ): Promise<PaymentStatusInstance | null> {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            lang,
        };
        const xmlData: string = getOrderStatusXml(orderData);
        const result: string = await this.post(xmlData);
        paymentStatusObj(result, (response: any) => {
            this.paymentStatusInstance = response
        })
        return this.getPaymentStatus();
    }

    async getOrderInformation(
        orderId: number,
        sessionId: string,
        lang: string = this.defaultLanguage
    ) {
        const orderData: any = {
            merchant: this.merchantId,
            orderId,
            sessionId,
            lang,
        };
        const xmlData: string = getOrderInformationXml(orderData);
        const result: string = await this.post(xmlData);
        paymentInformationObj(result, (response: any) => {
            this.paymentInformationInstance = response
        })
        return this.getPaymentInformation();
    }
}

export = KapitalBank;
