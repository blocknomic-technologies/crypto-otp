var crypto = require("crypto");
var axios = require("axios");
module.exports = class Bitfinex {
  constructor(key, secret) {
    this._apiKey = key;
    this._apiSecret = secret;
    this._urlAuthenticated = "https://api.bitfinex.com";
    this._urlPublic = "https://api-pub.bitfinex.com";
    this._instanceAuthenticated = axios.create({
      baseURL: this._urlAuthenticated
    });
    this._instancePublic = axios.create({
      baseURL: this._urlPublic
    });
  }


  async getTickers(data) {
    var body = data;
    var path = "/v2/tickers";
    var method = "get";
    try {
      return await this._instancePublic({
        url: path,
        method: method,
        data: body
      });
    } catch (e) {
      console.log(e);
    }
  }

  async postWallets(data) {
    var body = data;
    var path = "/v2/auth/r/wallets";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  
  /*** Get account wallet balances for a specific point in time using the "end" param. */

  async walletHistory(data) {
    var body = data;
    var path = "/v2/auth/r/wallets/hist";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*** Get active orders  */

  async retrieveOrders(data) {
    var body = data;
    var path = "/v2/auth/r/orders";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*** Submit an Order.  */

  async submitOrder(data) {
    var body = data;
    var path = "/v2/auth/w/order/submit";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*** Cancel an existing order, can be used to cancel margin, exchange, and derivative orders.  */

  async updateOrder(data) {
    var body = data;
    var path = "/v2/auth/w/order/update";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*** Cancel an existing order, can be used to cancel margin, exchange, and derivative orders.  */

  async cancelOrder(data) {
    var body = data;
    var path = "/v2/auth/w/order/cancel";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*** Send Multiple order-related operations.  */

  async multiOrder(data) {
    var body = data;
    var path = "/v2/auth/w/order/multi";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /*** Cancel multiple orders simultaneously.  */

  async cancelMultiOrder(data) {
    var body = data;
    var path = "/v2/auth/w/order/cancel/multi";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*** Returns the most recent closed or canceled orders up to circa two weeks ago   */

  async orderHistory(data) {
    var body = data;
    var path = "/v2/auth/r/orders/hist";
    var method = "post";
    var header = this.authenticatedHeader(path, body);
    try {
      return await this._instanceAuthenticated({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }




  authenticatedHeader(path, body = "") {
    var nonce = (Date.now() * 10000).toString();
    let signature = `/api/${path}${nonce}${JSON.stringify(body)}`;
    var sig = crypto
      .createHmac("sha384", this._apiSecret)
      .update(signature)
      .digest("hex");
    var headers = {
      "bfx-nonce": nonce,
      "bfx-apikey": this._apiKey,
      "bfx-signature": sig
    };
    return headers;
  }
};
