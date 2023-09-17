const createOrderXml = (data: any, approveUrl: string, cancelUrl: string, declineUrl: string): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <TKKPG>
            <Request>
                <Operation>CreateOrder</Operation>
                <Language>${data.lang}</Language>
                <Order>
                    <OrderType>${data.orderType}</OrderType>
                    <Merchant>${data.merchant}</Merchant>
                    <Amount>${data.amount}</Amount>
                    <Currency>${data.currency}</Currency>
                    <Description>${data.description}</Description>
                    <ApproveURL>${approveUrl}</ApproveURL>
                    <CancelURL>${cancelUrl}</CancelURL>
                    <DeclineURL>${declineUrl}</DeclineURL>
                </Order>
            </Request>
        </TKKPG>`;
}


const getOrderStatusXml = (data: any): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <TKKPG>
            <Request>
                <Operation>GetOrderStatus</Operation>
                <Language>${data.lang}</Language>
                <Order>
                    <Merchant>${data.merchant}</Merchant>
                    <OrderID>${data.orderId}</OrderID>
                </Order>
                <SessionID>${data.sessionId}</SessionID>
            </Request>
        </TKKPG>`;
}


const getOrderInformationXml = (data: any): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <TKKPG>
        <Request>
            <Operation>GetOrderInformation</Operation>
            <Language>${data.lang}</Language>
            <Order>
                <Merchant>${data.merchant}</Merchant>
                <OrderID>${data.orderId}</OrderID>
            </Order>
            <SessionID>${data.sessionId}</SessionID>
        </Request>
    </TKKPG>`;
}

const completionXml = (data: any): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
      <Request>
              <Operation>Completion</Operation>
              <Language>${data.lang}</Language>
              <Order>
                    <Merchant>${data.merchant}</Merchant>
                    <OrderID>${data.orderId}</OrderID>
              </Order>
              <SessionID> ${data.sessionId} </SessionID>
              <Amount>${data.amount}</Amount>
              <Description> ${data.description}</Description>
      </Request>
</TKKPG>`;
}

const reverseXml = (merchantId: string, data: any): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <TKKPG>
        <Request>
            <Operation>Reverse</Operation>
            <Language>${data.lang}</Language>
            <Order>
                <Merchant>${merchantId}</Merchant>
                <OrderID>${data.orderId}</OrderID>
                <Positions>
                    <Position>
                        <PaymentSubjectType>1</PaymentSubjectType>
                        <Quantity>1</Quantity>
                        <PaymentType>2</PaymentType>
                        <PaymentMethodType>1</PaymentMethodType>
                    </Position>
                </Positions>
            </Order>
            <Description>${data.description}</Description>
            <SessionID>${data.sessionId}</SessionID>
            <TranId></TranId>
            <Source>1</Source>
        </Request>
    </TKKPG>`;
}


export {
    completionXml,
    createOrderXml,
    reverseXml,
    getOrderStatusXml,
    getOrderInformationXml
}