"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.paymentInformationObj = exports.paymentStatusObj = exports.paymentObj = void 0;
var xml2js_1 = __importDefault(require("xml2js"));
var paymentObj = function (initialData, response, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var xmlData = result.TKKPG.Response;
        var orderId = parseInt(xmlData.Order.OrderID);
        var url = xmlData.Order.URL;
        var sessionId = xmlData.Order.SessionID;
        callback({
            amount: initialData.amount,
            orderId: orderId,
            sessionId: sessionId,
            url: url,
            status: xmlData.Status,
            description: initialData.description,
            currency: initialData.currency,
            lang: initialData.lang,
            paymentUrl: "".concat(url, "?ORDERID=").concat(orderId, "&SESSIONID=").concat(sessionId)
        });
    });
};
exports.paymentObj = paymentObj;
var paymentStatusObj = function (response, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var xmlData = result.TKKPG.Response;
        callback({
            orderId: parseInt(xmlData.OrderID),
            statusCode: xmlData.Status,
            orderStatus: xmlData.OrderStatus
        });
    });
};
exports.paymentStatusObj = paymentStatusObj;
var paymentInformationObj = function (response, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var xmlData = result.Order.row;
        var createDate = xmlData.createDate;
        var payDate = xmlData.payDate;
        var lastUpdateDate = xmlData.lastUpdateDate;
        var refundDate = xmlData.RefundDate === '0000-00-00 00:00:00' ? '' : xmlData.RefundDate;
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
        });
    });
};
exports.paymentInformationObj = paymentInformationObj;
