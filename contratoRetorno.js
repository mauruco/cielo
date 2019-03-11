/*
https://developercielo.github.io/manual/cielo-ecommerce#requisi%C3%A7%C3%A3o
*/

{
  "MerchantOrderId": "ID iNTERNO DA VENDA",
  "Customer": {
    "Name": "[Guest] OPCIONAL, NOME DO CLIENTE, CARTÃO DE  CRÉDITO"
  },
  "Payment": {
    "ServiceTaxAmount": 0,
    "Installments": 1,
    "Interest": 0,
    "Capture": true,
    "Authenticate": false,
    "Recurrent": false,
    "CreditCard": {
      "CardNumber": "000000******0004",
      "ExpirationDate": "12/2021",
      "SaveCard": false,
      "Brand": "Visa"
    },
    "Tid": "0225094441850",
    "ProofOfSale": "20190225094441850",
    "AuthorizationCode": "787759",
    "SoftDescriptor": "123456789ABCD",
    "Provider": "Simulado",
    "Amount": 300,
    "ReceivedDate": "2019-02-25 09:44:41",
    "CapturedAmount": 300,
    "CapturedDate": "2019-02-25 09:44:41",
    "Status": 2,
    "IsSplitted": false,
    "ReturnMessage": "Operation Successful",
    "ReturnCode": "6",
    "PaymentId": "1649df0e-9d97-4bd4-8017-8eb112bae07f",
    "Type": "CreditCard",
    "Currency": "BRL",
    "Country": "BRA",
    "Links": [
      {
        "Method": "GET",
        "Rel": "self",
        "Href": "https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/1649df0e-9d97-4bd4-8017-8eb112bae07f"
      },
      {
        "Method": "PUT",
        "Rel": "void",
        "Href": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/1649df0e-9d97-4bd4-8017-8eb112bae07f/void"
      }
    ]
  }
}
