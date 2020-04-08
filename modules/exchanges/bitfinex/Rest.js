const crypto = require("crypto");
const axios = require("axios");
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

  
  /*** Get account wallet balances for a specific point in time using the "end" param. */

  walletHistory = async (data) => {
    const body = data;
    const path = "/v2/auth/r/wallets/hist";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  retrieveOrders = async (data) => {
    const body = data;
    const path = "/v2/auth/r/orders";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  submitOrder = async (data) => {
    const body = data;
    const path = "/v2/auth/w/order/submit";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  updateOrder = async (data) => {
    const body = data;
    const path = "/v2/auth/w/order/update";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  cancelOrder = async (data) => {
    const body = data;
    const path = "/v2/auth/w/order/cancel";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  multiOrder = async (data) => {
    const body = data;
    const path = "/v2/auth/w/order/multi";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  cancelMultiOrder = async (data) => {
    const body = data;
    const path = "/v2/auth/w/order/cancel/multi";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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

  orderHistory = async (data) => {
    const body = data;
    const path = "/v2/auth/r/orders/hist";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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
  
  orderHistory = async (data) => {
    const body = data;
    const path = "/v2/auth/r/orders/hist";
    const method = "post";
    const header = this.authenticatedHeader(path, body);
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
