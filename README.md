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
5. [Configuration](#configuration)
6. [License](#license)

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
npm install kapitalbank
```

## Usage

### Initialize

Import the `KapitalBank` class and initialize it with the required parameters:

```javascript
const KapitalBank = require('kapitalbank');

const kapitalBank = new KapitalBank(
    'YOUR_MERCHANT_ID',
    'APPROVE_URL',
    'CANCEL_URL',
    'DECLINE_URL',
    true,  // Set to true for live mode, false for test mode
    './certs/test.crt',  // Path to your SSL certificate file
    './certs/test.key',  // Path to your SSL key file
    'EN'   // Default language (optional, defaults to 'EN')
);
```

### Create an Order

Use the `createOrder` method to create a new payment order:

```javascript
const amount = 100;
const description = 'Sample Order';
const lang = 'EN';
const preAuth = false;

const orderResult = await kapitalBank.createOrder(amount, description, lang, preAuth);
console.log('Result', orderResult);
```

### Complete an Order

Complete a payment order using the `completeOrder` method:

```javascript
const orderId = 12345;  // Replace with your order ID
const sessionId = 'SESSION_ID';  // Replace with your session ID

const completionResult = await kapitalBank.completeOrder(orderId, sessionId, amount, description, lang);
console.log('Completion Result:', completionResult);
```

### Reverse a Transaction

Reverse a payment transaction with the `reverseOrder` method:

```javascript
const orderId = 12345;  // Replace with your order ID
const sessionId = 'SESSION_ID';  // Replace with your session ID

const reversalResult = await kapitalBank.reverseOrder(orderId, sessionId, description, lang);
console.log('Reversal Result:', reversalResult);
```

### Get Order Status

Retrieve the status of a payment order using the `getOrderStatus` method:

```javascript
const orderId = 12345;  // Replace with your order ID
const sessionId = 'SESSION_ID';  // Replace with your session ID

const status = await kapitalBank.getOrderStatus(orderId, sessionId, lang);
console.log('Order Status:', status);
```

### Get Order Information

Obtain detailed information about a payment order with the `getOrderInformation` method:

```javascript
const orderId = 12345;  // Replace with your order ID
const sessionId = 'SESSION_ID';  // Replace with your session ID

const info = await kapitalBank.getOrderInformation(orderId, sessionId, lang);
console.log('Order Information:', info);
```

## Configuration

The `KapitalBank` class can be configured by passing appropriate values to its constructor. The available configuration options are:

- `merchantId`: Your merchant ID.
- `approveUrl`: The URL where successful payments will be redirected.
- `cancelUrl`: The URL where canceled payments will be redirected.
- `declineUrl`: The URL where declined payments will be redirected.
- `liveMode`: Set to `true` for live mode, `false` for test mode.
- `certFilePath`: The path to your SSL certificate file.
- `keyFilePath`: The path to your SSL key file.
- `defaultLanguage`: The default language for orders (optional, defaults to 'EN').

Ensure that you provide the correct values for your environment.

## License

This library is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This library is not officially maintained or endorsed by KapitalBank. Use it at your own risk.