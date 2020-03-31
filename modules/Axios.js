const axios = require("axios");
module.exports = class Axios {
  constructor(url) {
    this._instance = axios.create({
      baseURL: url
    });
  }

  async get(path) {
    const response = await this._instance.get(path);
    return response;
  }

  async post(path, body, header) {
    var postBody = JSON.stringify(body);
    try {
      return await this._instance.post(path, {
        headers: header,
        data: body
      });
    } catch (e) {
      console.log(e);
    }
  }
};
