# KapitalBank Payment API with Node.js

The KapitalBank Payment Integration library is a Node.js module that facilitates seamless integration with KapitalBank's payment gateway. This library allows you to create orders, complete transactions, reverse transactions, and retrieve payment status and information with ease.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
    - [Initialize](#initialize)
    - [Create an Order](#create-an-order)
    - [Complete an Order](#complete-an-order)
    - [Reverse a Transaction](#reverse-a-transaction)
    - [Get Order Status](#get-order-status)
    - [Get Order Information](#get-order-information)
5. [License](#license)
6. [Disclaimer](#disclaimer)

## Introduction

The KapitalBank Payment Integration library simplifies the integration of KapitalBank's payment gateway into Node.js applications. It provides methods to interact with the payment gateway, enabling the creation and management of payment orders.

## Prerequisites

Before using this library, ensure you have the following prerequisites:

1. Node.js installed on your server or development environment.
2. Valid KapitalBank merchant credentials.
3. SSL certificate and private key files for secure communication.

## Installation

To use the KapitalBank Payment Integration library in your Node.js project, you need to install it via npm. Open a terminal and run the following command:

```bash
npm install kapitalbank@latest
```

## Usage

### Initialize

Import the `KapitalBank` class and initialize it with the required parameters:

```javascript
const KapitalBank = require('kapitalbank');

const kb = new KapitalBank({
   merchantId: "YOUR_MERCHANT_ID",
   approveUrl: "APPROVE_URL",
   cancelUrl: "CANCEL_URL",
   declineUrl: "DECLINE_URL",
   liveMode: false,
   certFilePath: "CERT_FILE_PATH",
   keyFilePath: "KEY_FILE_PATH",
   defaultLanguage: "EN",
   currency: "944"
});
```

### Configuration parameters

The `KapitalBank` class can be configured by passing appropriate values to its constructor. The available configuration options are:

- `merchantId`: Your merchant ID.
- `approveUrl`: The URL where successful payments will be redirected.
- `cancelUrl`: The URL where canceled payments will be redirected.
- `declineUrl`: The URL where declined payments will be redirected.
- `liveMode`: Set to `true` for live mode, `false` for test mode.
- `certFilePath`: The path to your SSL certificate file.
- `keyFilePath`: The path to your SSL key file.
- `defaultLanguage`: The default language for orders (optional, defaults to 'EN').
- `currency`: The default currency for orders (optional, defaults to '944').

Ensure that you provide the correct values for your environment.

## Create an Order

Use the `createOrder` method to create a new payment order:

```javascript
const amount = 100;
const description = "ORDER_DESCRIPTION";
const preAuth = false;

const orderResult = await kb.createOrder(amount, description, preAuth);
console.log(orderResult);
```

Response:

```json
{
   "success": true,
   "data": {
      "amount": 100,
      "orderId": "ORDER_ID",
      "sessionId": "SESSION_ID",
      "description": "ORDER_DESCRIPTION",
      "currency": 944,
      "lang": "EN",
      "paymentUrl": "https://tstpg.kapitalbank.az/index.jsp?ORDERID=ORDER_ID&SESSIONID=SESSION_ID",
      "orderType": "ORDER_TYPE"
   }
}
```

## Complete an Order

Complete a payment order using the `completeOrder` method:

```javascript
const orderId = "ORDER_ID";  // Replace with your order ID
const sessionId = "SESSION_ID";  // Replace with your session ID

const completionResult = await kb.completeOrder(orderId, sessionId, amount, description, lang);
console.log(completionResult);
```

## Reverse a Transaction

Reverse a payment transaction with the `reverseOrder` method:

```javascript
const orderId = "ORDER_ID";  // Replace with your order ID
const sessionId = "SESSION_ID";  // Replace with your session ID

const reversalResult = await kb.reverseOrder(orderId, sessionId, description, lang);
console.log(reversalResult);
```

Response: 
```json
{
  "success": true,
  "data": { 
     "orderId": 662685, 
     "respCode": "", 
     "respMessage": ""
  }
}

```

## Get Order Status

Retrieve the status of a payment order using the `getOrderStatus` method:

```javascript
const orderId = "ORDER_ID";  // Replace with your order ID
const sessionId = "SESSION_ID";  // Replace with your session ID

const status = await kb.getOrderStatus(orderId, sessionId, lang);
console.log(status);
```

Response:
```json
{
   "success": true,
   "data": {
      "orderId": "ORDER_ID",
      "orderStatus": "ORDER_STATUS"
   }
}

```

## Get Order Information

Obtain detailed information about a payment order with the `getOrderInformation` method:

```javascript
const orderId = "ORDER_ID";  // Replace with your order ID
const sessionId = "SESSION_ID";  // Replace with your session ID

const info = await kb.getOrderInformation(orderId, sessionId, lang);
console.log(info);
```

Response: 
```json
{
   "success": true,
   "data": {
      "orderId": "ORDER_ID",
      "orderStatus": "ORDER_STATUS",
      "sessionId": "SESSION_ID",
      "createDate": "2023-09-17T09:39:05.000Z",
      "lastUpdateDate": null,
      "payDate": null,
      "amount": 100,
      "currency": "944",
      "orderLanguage": "EN",
      "description": "ORDER_DESCRIPTION",
      "approveUrl": "APPROVE_URL",
      "cancelUrl": "CANCEL_URL",
      "declineUrl": "DECLINE_URL",
      "receipt": "",
      "twoId": "",
      "refundAmount": "",
      "refundCurrency": null,
      "refundDate": null,
      "extSystemProcess": "0",
      "orderType": "Purchase",
      "orderSubType": "",
      "fee": 0,
      "TWODate": "",
      "TWOTime": ""
   }
}

```

## License

This library is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This library is not officially maintained or endorsed by KapitalBank. Use it at your own risk.