"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
var https_1 = __importDefault(require("https"));
var xml2js_1 = __importDefault(require("xml2js"));
var xmlBuilders_1 = require("./xmlBuilders");
var xmlParsers_1 = require("./xmlParsers");
var KapitalBank = /** @class */ (function () {
    function KapitalBank(merchantId, approveUrl, cancelUrl, declineUrl, liveMode, certFilePath, keyFilePath, defaultLanguage) {
        if (liveMode === void 0) { liveMode = false; }
        if (certFilePath === void 0) { certFilePath = './certs/test.crt'; }
        if (keyFilePath === void 0) { keyFilePath = './certs/test.key'; }
        if (defaultLanguage === void 0) { defaultLanguage = 'EN'; }
        this.paymentInstance = null;
        this.paymentStatusInstance = null;
        this.paymentInformationInstance = null;
        this.liveMode = liveMode;
        this.baseUrl = this.liveMode ? 'https://3dsrv.kapitalbank.az' : 'https://tstpg.kapitalbank.az';
        this.port = '5443';
        this.certFile = certFilePath;
        this.keyFile = keyFilePath;
        this.merchantId = merchantId;
        this.approveUrl = approveUrl;
        this.cancelUrl = cancelUrl;
        this.declineUrl = declineUrl;
        this.defaultLanguage = defaultLanguage;
    }
    KapitalBank.prototype.post = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            headers: { 'Content-Type': 'application/xml' },
                            httpsAgent: new https_1["default"].Agent({
                                rejectUnauthorized: false,
                                cert: fs_1["default"].readFileSync(this.certFile),
                                key: fs_1["default"].readFileSync(this.keyFile)
                            })
                        };
                        return [4 /*yield*/, axios_1["default"].post("".concat(this.baseUrl, ":").concat(this.port, "/Exec"), data, headers)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    KapitalBank.prototype.getPayment = function () {
        return this.paymentInstance;
    };
    KapitalBank.prototype.getPaymentStatus = function () {
        return this.paymentStatusInstance;
    };
    KapitalBank.prototype.getPaymentInformation = function () {
        return this.paymentInformationInstance;
    };
    KapitalBank.prototype.createOrder = function (amount, currency, description, lang, preAuth) {
        if (currency === void 0) { currency = 944; }
        if (lang === void 0) { lang = this.defaultLanguage; }
        if (preAuth === void 0) { preAuth = false; }
        return __awaiter(this, void 0, void 0, function () {
            var orderData, xmlData, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderData = {
                            merchant: this.merchantId,
                            amount: amount,
                            currency: currency,
                            description: description,
                            lang: lang,
                            orderType: preAuth ? 'PreAuth' : 'Purchase'
                        };
                        xmlData = (0, xmlBuilders_1.createOrderXml)(orderData, this.approveUrl, this.cancelUrl, this.declineUrl);
                        return [4 /*yield*/, this.post(xmlData)];
                    case 1:
                        result = _a.sent();
                        (0, xmlParsers_1.paymentObj)(orderData, result, function (response) {
                            _this.paymentInstance = response;
                        });
                        return [2 /*return*/, this.getPayment()];
                }
            });
        });
    };
    KapitalBank.prototype.completeOrder = function (orderId, sessionId, amount, description, lang) {
        if (lang === void 0) { lang = this.defaultLanguage; }
        return __awaiter(this, void 0, void 0, function () {
            var orderData, xmlData, result, responseXml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderData = {
                            merchant: this.merchantId,
                            orderId: orderId,
                            sessionId: sessionId,
                            amount: amount,
                            description: description,
                            lang: lang
                        };
                        xmlData = (0, xmlBuilders_1.completionXml)(orderData);
                        return [4 /*yield*/, this.post(xmlData)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, xml2js_1["default"].parseStringPromise(result)];
                    case 2:
                        responseXml = _a.sent();
                        return [2 /*return*/, responseXml.TKKPG.Response.Status];
                }
            });
        });
    };
    KapitalBank.prototype.reverseOrder = function (orderId, sessionId, description, lang) {
        if (lang === void 0) { lang = this.defaultLanguage; }
        return __awaiter(this, void 0, void 0, function () {
            var orderData, xmlData, result, responseXml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderData = {
                            merchant: this.merchantId,
                            orderId: orderId,
                            sessionId: sessionId,
                            lang: lang,
                            description: description
                        };
                        xmlData = (0, xmlBuilders_1.reverseXml)(this.merchantId, orderData);
                        return [4 /*yield*/, this.post(xmlData)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, xml2js_1["default"].parseStringPromise(result)];
                    case 2:
                        responseXml = _a.sent();
                        return [2 /*return*/, responseXml.TKKPG.Response.Status];
                }
            });
        });
    };
    KapitalBank.prototype.getOrderStatus = function (orderId, sessionId, lang) {
        if (lang === void 0) { lang = this.defaultLanguage; }
        return __awaiter(this, void 0, void 0, function () {
            var orderData, xmlData, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderData = {
                            merchant: this.merchantId,
                            orderId: orderId,
                            sessionId: sessionId,
                            lang: lang
                        };
                        xmlData = (0, xmlBuilders_1.getOrderStatusXml)(orderData);
                        return [4 /*yield*/, this.post(xmlData)];
                    case 1:
                        result = _a.sent();
                        (0, xmlParsers_1.paymentStatusObj)(result, function (response) {
                            _this.paymentStatusInstance = response;
                        });
                        return [2 /*return*/, this.getPaymentStatus()];
                }
            });
        });
    };
    KapitalBank.prototype.getOrderInformation = function (orderId, sessionId, lang) {
        if (lang === void 0) { lang = this.defaultLanguage; }
        return __awaiter(this, void 0, void 0, function () {
            var orderData, xmlData, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderData = {
                            merchant: this.merchantId,
                            orderId: orderId,
                            sessionId: sessionId,
                            lang: lang
                        };
                        xmlData = (0, xmlBuilders_1.getOrderInformationXml)(orderData);
                        return [4 /*yield*/, this.post(xmlData)];
                    case 1:
                        result = _a.sent();
                        (0, xmlParsers_1.paymentInformationObj)(result, function (response) {
                            _this.paymentInformationInstance = response;
                        });
                        return [2 /*return*/, this.getPaymentInformation()];
                }
            });
        });
    };
    return KapitalBank;
}());
module.exports = KapitalBank;
