const crypto = require("crypto");
const axios = require("axios");

// key : Oe_joODn15hUijTQ-Arnj0ah
//secret : OP9DOaYxfiLZeRldRO1ReZWr_uk6cFsDD7_H7jR9aIwSBMYa
module.exports = class Bitmex {
  constructor(key, secret) {
    this._apiKey = key;
    this._apiSecret = secret;
    this._url = "https://testnet.bitmex.com";
    this._instance = axios.create({
      baseURL: this._url
    });
  }

  async getAnnouncement() {
    var path = "/api/v1/announcement";
    var method = "get";
    try {
      return await this._instance({
        url: path,
        method: method,
        headers: this.authenticatedHeader(method, path)
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getApikey() {
    var path = "/api/v1/apiKey";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        url: path,
        method: method,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getPositions() {
    var path = "/api/v1/position";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        url: path,
        method: method,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  async postOrder(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/order";
    var method = "post";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: "post",
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUserWallet(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/user/wallet";
    var method = "get";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: "get",
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }
async getExecution(){
  
  var path = "/api/v1/execution";
  var method = "get";
  var header = this.authenticatedHeader(method, path);
  try {
    return await this._instance({
      method: "get",
      
      url: path,
      headers: header
    });
  } catch (e) {
    console.log(e);
  }
}

async getFunding(){
  
  var path = "/api/v1/funding";
  var method = "get";
  var header = this.authenticatedHeader(method, path);
  try {
    return await this._instance({
      method: "get",
      
      url: path,
      headers: header
    });
  } catch (e) {
    console.log(e);
  }
}


  authenticatedHeader(verb, path, body = "") {
    var expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
    var signature = crypto
      .createHmac("sha256", this._apiSecret)
      .update(verb.toUpperCase() + path + expires + body)
      .digest("hex");
    var headers = {
      "content-type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "api-expires": expires,
      "api-key": this._apiKey,
      "api-signature": signature
    };
    return headers;
  }
};
