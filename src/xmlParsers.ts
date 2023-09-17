import xml2js from "xml2js";

import {errorMessages} from './messages'


const paymentObj = (initialData: any, response: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }
            const {Status: status, ...data} = result.TKKPG.Response;
            if (status !== '00') {
                callback({
                    success: false,
                    operation: 'CreateOrder',
                    message: errorMessages[initialData.lang][status]
                })
            } else {
                const orderId: number = parseInt(data.Order.OrderID)
                const sessionId = data.Order.SessionID
                const url = data.Order.URL
                callback({
                    success: true,
                    data: {
                        amount: initialData.amount,
                        orderId,
                        sessionId,
                        description: initialData.description,
                        currency: initialData.currency,
                        lang: initialData.lang,
                        paymentUrl: `${url}?ORDERID=${orderId}&SESSIONID=${sessionId}`,
                        orderType: initialData.orderType
                    }
                })
            }
        }
    );
}


const paymentStatusObj = (response: string, language: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }
            const {Status: status, ...data} = result.TKKPG.Response;
            if (status !== '00') {
                callback({
                    success: false,
                    operation: 'GetOrderStatus',
                    message: errorMessages[language][status]
                })
            } else {
                const {Order: order} = data;
                callback({
                    success: true,
                    data: {
                        orderId: parseInt(order.OrderID),
                        orderStatus: order.OrderStatus
                    }

                })
            }
        }
    );
}


const paymentInformationObj = (response: string, language: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }
            const {row} = result.Order;
            if (!row) {
                callback({
                    success: false,
                    operation: 'GetOrderInformation',
                    message: errorMessages[language]['100']
                })
            } else {
                const createDate = row.createDate;
                const payDate = row.payDate;
                const lastUpdateDate = row.lastUpdateDate
                const refundDate = row.RefundDate === '0000-00-00 00:00:00' ? '' : row.RefundDate
                callback({
                    success: true,
                    data: {
                        orderId: parseInt(row.id),
                        orderStatus: row.Orderstatus,
                        sessionId: row.SessionID,
                        createDate: createDate ? new Date(createDate) : createDate,
                        lastUpdateDate: lastUpdateDate ? new Date(lastUpdateDate) : null,
                        payDate: payDate ? new Date(payDate) : null,
                        amount: parseInt(row.Amount),
                        currency: row.Currency,
                        orderLanguage: row.OrderLanguage,
                        description: row.Description,
                        approveUrl: row.ApproveURL,
                        cancelUrl: row.CancelURL,
                        declineUrl: row.DeclineURL,
                        receipt: row.Receipt,
                        twoId: row.twoId,
                        refundAmount: row.RefundAmount,
                        refundCurrency: row.RefundCurrency || null,
                        refundDate: refundDate ? new Date(refundDate) : null,
                        extSystemProcess: row.ExtSystemProcess,
                        orderType: row.OrderType,
                        orderSubType: row.OrderSubType,
                        fee: parseInt(row.Fee),
                        TWODate: row.TWODate,
                        TWOTime: row.TWOTime
                    }
                })
            }
        }
    );
}


const completePaymentObj = (response: any, language: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }
            const {Status: status, ...data} = result.TKKPG.Response
            if (status !== '00') {
                callback({
                    success: false,
                    operation: 'Completion',
                    message: errorMessages[language][status]
                })
            } else {
                callback({
                    success: true,
                    data
                })
            }
        }
    )
}

const reversePaymentObj = (response: any, language: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }
            const {Status: status, ...data} = result.TKKPG.Response
            if (status !== '00') {
                callback({
                    success: false,
                    operation: 'Reverse',
                    message: errorMessages[language][status]
                })
            } else {
                callback({
                    success: true,
                    data: {
                        orderId: data.Order.OrderID,
                        respCode: data.Reversal.RespCode,
                        respMessage: data.Reversal.RespMessage
                    }
                })
            }
        }
    )
}


export {
    paymentObj,
    paymentStatusObj,
    paymentInformationObj,
    completePaymentObj,
    reversePaymentObj
}