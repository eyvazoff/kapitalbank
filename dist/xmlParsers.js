"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.reversePaymentObj = exports.completePaymentObj = exports.paymentInformationObj = exports.paymentStatusObj = exports.paymentObj = void 0;
var xml2js_1 = __importDefault(require("xml2js"));
var messages_1 = require("./messages");
var paymentObj = function (initialData, response, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var _a = result.TKKPG.Response, status = _a.Status, data = __rest(_a, ["Status"]);
        if (status !== '00') {
            callback({
                success: false,
                operation: 'CreateOrder',
                message: messages_1.errorMessages[initialData.lang][status]
            });
        }
        else {
            var orderId = parseInt(data.Order.OrderID);
            var sessionId = data.Order.SessionID;
            var url = data.Order.URL;
            callback({
                success: true,
                data: {
                    amount: initialData.amount,
                    orderId: orderId,
                    sessionId: sessionId,
                    description: initialData.description,
                    currency: initialData.currency,
                    lang: initialData.lang,
                    paymentUrl: "".concat(url, "?ORDERID=").concat(orderId, "&SESSIONID=").concat(sessionId),
                    orderType: initialData.orderType
                }
            });
        }
    });
};
exports.paymentObj = paymentObj;
var paymentStatusObj = function (response, language, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var _a = result.TKKPG.Response, status = _a.Status, data = __rest(_a, ["Status"]);
        if (status !== '00') {
            callback({
                success: false,
                operation: 'GetOrderStatus',
                message: messages_1.errorMessages[language][status]
            });
        }
        else {
            var order = data.Order;
            callback({
                success: true,
                data: {
                    orderId: parseInt(order.OrderID),
                    orderStatus: order.OrderStatus
                }
            });
        }
    });
};
exports.paymentStatusObj = paymentStatusObj;
var paymentInformationObj = function (response, language, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var row = result.Order.row;
        if (!row) {
            callback({
                success: false,
                operation: 'GetOrderInformation',
                message: messages_1.errorMessages[language]['100']
            });
        }
        else {
            var createDate = row.createDate;
            var payDate = row.payDate;
            var lastUpdateDate = row.lastUpdateDate;
            var refundDate = row.RefundDate === '0000-00-00 00:00:00' ? '' : row.RefundDate;
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
            });
        }
    });
};
exports.paymentInformationObj = paymentInformationObj;
var completePaymentObj = function (response, language, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var _a = result.TKKPG.Response, status = _a.Status, data = __rest(_a, ["Status"]);
        if (status !== '00') {
            callback({
                success: false,
                operation: 'Completion',
                message: messages_1.errorMessages[language][status]
            });
        }
        else {
            callback({
                success: true,
                data: data
            });
        }
    });
};
exports.completePaymentObj = completePaymentObj;
var reversePaymentObj = function (response, language, callback) {
    xml2js_1["default"].parseString(response, { explicitArray: false }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        var _a = result.TKKPG.Response, status = _a.Status, data = __rest(_a, ["Status"]);
        if (status !== '00') {
            callback({
                success: false,
                operation: 'Reverse',
                message: messages_1.errorMessages[language][status]
            });
        }
        else {
            callback({
                success: true,
                data: {
                    orderId: data.Order.OrderID,
                    respCode: data.Reversal.RespCode,
                    respMessage: data.Reversal.RespMessage
                }
            });
        }
    });
};
exports.reversePaymentObj = reversePaymentObj;
