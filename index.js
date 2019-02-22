const tiny = require('tiny-json-http');

class Cielo {
  
  constructor(config) {

    this.MerchantId = config.MerchantId;
    this.MerchantKey = config.MerchantKey;
    this.apiUrl = config.apiUrl;
    this.apiQueryUrl = config.apiQueryUrl;
    this.headers = {
      "Content-Type" : 'application/json',
      "MerchantId": this.MerchantId,
      "MerchantKey": this.MerchantKey
    };
  }

  creditCardAuthMin(data) {

    return new Promise((resolve, reject) => {

      let expected = {
        MerchantOrderId: "id interno -> string: max 50",
        Payment: {
          Amount: "Valor em centavos -> integer: max 15",
          CreditCard: {
            CardNumber: "number:16",
            ExpirationDate: "string: MM/YYYY",
            Brand: "Visa ou Master ou Amex ou Elo ou Aura ou JCB ou Diners ou Discover ou Hipercard",
          }
        }
      };
      
      let check = this.validateObj(expected, data);
      if(!check)
        return resolve({httpStatusCode: 401, body: { Code: 'interno', Message: 'Cielo @creditCardAuthMin: JSON.body não corresponde ao padrão esperado' }});

      let cleanData = this.cleanData(data);

      tiny.post({
        url: `${this.apiUrl}/1/sales`,
        headers: this.headers,
        data: cleanData
      }, (error, res) => {

        let { httpStatusCode, body } = this.validateResponse(error, res, 2);
        let response = {httpStatusCode: httpStatusCode, body: body};
        resolve(response);
      });
    });
  }

  creditCardCancel(data) {

    return new Promise((resolve, reject) => {

      let expected = { PaymentId: "string" };

      let check = this.validateObj(expected, data);
      if (!check)
        return resolve({ httpStatusCode: 401, body: { Code: 'interno', Message: 'Cielo @creditCardAuthMin: JSON.body não corresponde ao padrão esperado' } });
      
      if (!data.PaymentId)
        return resolve({ httpStatusCode: 401, body: { Code: 'interno', Message: 'Cielo @creditCardAuthMin: PaymentId não corresponde ao padrão esperado' } });

      let cleanData = this.cleanData(data);

      tiny.put({
        url: `${this.apiUrl}/1/sales/${cleanData.PaymentId}/void`,
        headers: this.headers
      }, (error, res) => {

        let { httpStatusCode, body } = this.validateResponse(error, res, 10);
        let response = { httpStatusCode: httpStatusCode, body: body };
        resolve(response);
      });
    });
  }

  validateResponse(error, response, successStatus) {

    let httpStatusCode = 201;
    let body = error ? (error.body ? (error.body.length > 0 ? error.body[0] : error.body) : error) : null;
    body = response ? (response.body ? response.body : response) : body;

    if(error || body && body.Payment && body.Payment.Status && body.Payment.Status !== successStatus)
      httpStatusCode = 401;

    return { httpStatusCode, body };
  }

  cleanData(data) {

    return {
      "MerchantOrderId": data.MerchantOrderId,
      "Payment": {
        "Type": "CreditCard",
        "Amount": data.Payment.Amount,
        "Installments": 1,
        "Capture": true,
        "Recurrent": true,
        "SoftDescriptor": data.Payment.SoftDescriptor || '',
        "CreditCard": {
          "CardNumber": data.Payment.CreditCard.CardNumber,
          "ExpirationDate": data.Payment.CreditCard.ExpirationDate,
          "Brand": data.Payment.CreditCard.Brand
        }
      }
    };
  }

  validateObj(expected, received) {

    for(let k in expected) {

      if(typeof received[k] === 'undefined')
        return false;
      if(typeof expected[k] === 'object')
        return this.validateObj(expected[k], received[k]);
    }

    return true;
  }
}

module.exports = Cielo;