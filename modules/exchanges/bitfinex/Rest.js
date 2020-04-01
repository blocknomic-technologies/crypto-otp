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

  // getting a single Ticker
  async getTicker(data) {
    const url = "v2/ticker";
    const method = "get";
    try {
      return await axios._instancePublic({ url, method, data});
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
