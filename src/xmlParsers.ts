import xml2js from "xml2js";

const paymentObj = (initialData: any, response: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }
            const xmlData = result.TKKPG.Response;
            const orderId: number = parseInt(xmlData.Order.OrderID)
            const url = xmlData.Order.URL
            const sessionId = xmlData.Order.SessionID
            callback({
                amount: initialData.amount,
                orderId,
                sessionId,
                url,
                status: xmlData.Status,
                description: initialData.description,
                currency: initialData.currency,
                lang: initialData.lang,
                paymentUrl: `${url}?ORDERID=${orderId}&SESSIONID=${sessionId}`
            })
        }
    );
}


const paymentStatusObj = (response: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }

            const xmlData = result.TKKPG.Response;
            callback({
                orderId: parseInt(xmlData.OrderID),
                statusCode: xmlData.Status,
                orderStatus: xmlData.OrderStatus,
            })
        }
    );
}


const paymentInformationObj = (response: string, callback: any): void => {
    xml2js.parseString(
        response,
        {explicitArray: false},
        (err: any, result: any): void => {
            if (err) {
                throw new Error(err);
            }

            const xmlData = result.Order.row;

            const createDate = xmlData.createDate;
            const payDate = xmlData.payDate;
            const lastUpdateDate = xmlData.lastUpdateDate
            const refundDate = xmlData.RefundDate === '0000-00-00 00:00:00' ? '' : xmlData.RefundDate

            callback({
                orderId: parseInt(xmlData.id),
                orderStatus: xmlData.Orderstatus,
                sessionId: xmlData.SessionID,
                createDate: createDate ? new Date(createDate) : createDate,
                lastUpdateDate: lastUpdateDate ? new Date(lastUpdateDate) : null,
                payDate: payDate ? new Date(payDate) : null,
                amount: parseInt(xmlData.Amount),
                currency: xmlData.Currency,
                orderLanguage: xmlData.OrderLanguage,
                description: xmlData.Description,
                approveUrl: xmlData.ApproveURL,
                cancelUrl: xmlData.CancelURL,
                declineUrl: xmlData.DeclineURL,
                Receipt: xmlData.Receipt,
                twoId: xmlData.twoId,
                refundAmount: xmlData.RefundAmount,
                refundCurrency: xmlData.RefundCurrency || null,
                refundDate: refundDate ? new Date(refundDate) : null,
                extSystemProcess: xmlData.ExtSystemProcess,
                orderType: xmlData.OrderType,
                orderSubType: xmlData.OrderSubType,
                fee: parseInt(xmlData.Fee),
                TWODate: xmlData.TWODate,
                TWOTime: xmlData.TWOTime
            })
        }
    );
}


export {
    paymentObj,
    paymentStatusObj,
    paymentInformationObj
}