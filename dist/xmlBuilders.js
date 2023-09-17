"use strict";
exports.__esModule = true;
exports.getOrderInformationXml = exports.getOrderStatusXml = exports.reverseXml = exports.createOrderXml = exports.completionXml = void 0;
var createOrderXml = function (data, approveUrl, cancelUrl, declineUrl) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <TKKPG>\n            <Request>\n                <Operation>CreateOrder</Operation>\n                <Language>".concat(data.lang, "</Language>\n                <Order>\n                    <OrderType>").concat(data.orderType, "</OrderType>\n                    <Merchant>").concat(data.merchant, "</Merchant>\n                    <Amount>").concat(data.amount, "</Amount>\n                    <Currency>").concat(data.currency, "</Currency>\n                    <Description>").concat(data.description, "</Description>\n                    <ApproveURL>").concat(approveUrl, "</ApproveURL>\n                    <CancelURL>").concat(cancelUrl, "</CancelURL>\n                    <DeclineURL>").concat(declineUrl, "</DeclineURL>\n                </Order>\n            </Request>\n        </TKKPG>");
};
exports.createOrderXml = createOrderXml;
var getOrderStatusXml = function (data) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <TKKPG>\n            <Request>\n                <Operation>GetOrderStatus</Operation>\n                <Language>".concat(data.lang, "</Language>\n                <Order>\n                    <Merchant>").concat(data.merchant, "</Merchant>\n                    <OrderID>").concat(data.orderId, "</OrderID>\n                </Order>\n                <SessionID>").concat(data.sessionId, "</SessionID>\n            </Request>\n        </TKKPG>");
};
exports.getOrderStatusXml = getOrderStatusXml;
var getOrderInformationXml = function (data) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <TKKPG>\n        <Request>\n            <Operation>GetOrderInformation</Operation>\n            <Language>".concat(data.lang, "</Language>\n            <Order>\n                <Merchant>").concat(data.merchant, "</Merchant>\n                <OrderID>").concat(data.orderId, "</OrderID>\n            </Order>\n            <SessionID>").concat(data.sessionId, "</SessionID>\n        </Request>\n    </TKKPG>");
};
exports.getOrderInformationXml = getOrderInformationXml;
var completionXml = function (data) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<TKKPG>\n      <Request>\n              <Operation>Completion</Operation>\n              <Language>".concat(data.lang, "</Language>\n              <Order>\n                    <Merchant>").concat(data.merchant, "</Merchant>\n                    <OrderID>").concat(data.orderId, "</OrderID>\n              </Order>\n              <SessionID> ").concat(data.sessionId, " </SessionID>\n              <Amount>").concat(data.amount, "</Amount>\n              <Description> ").concat(data.description, "</Description>\n      </Request>\n</TKKPG>");
};
exports.completionXml = completionXml;
var reverseXml = function (merchantId, data) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <TKKPG>\n        <Request>\n            <Operation>Reverse</Operation>\n            <Language>".concat(data.lang, "</Language>\n            <Order>\n                <Merchant>").concat(merchantId, "</Merchant>\n                <OrderID>").concat(data.orderId, "</OrderID>\n                <Positions>\n                    <Position>\n                        <PaymentSubjectType>1</PaymentSubjectType>\n                        <Quantity>1</Quantity>\n                        <PaymentType>2</PaymentType>\n                        <PaymentMethodType>1</PaymentMethodType>\n                    </Position>\n                </Positions>\n            </Order>\n            <Description>").concat(data.description, "</Description>\n            <SessionID>").concat(data.sessionId, "</SessionID>\n            <TranId></TranId>\n            <Source>1</Source>\n        </Request>\n    </TKKPG>");
};
exports.reverseXml = reverseXml;
