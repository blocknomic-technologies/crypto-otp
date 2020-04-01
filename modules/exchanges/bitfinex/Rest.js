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
    } catch(e) {
      console.log(e);
    }
  }

  // getting a single Ticker
  // {baseUrl}/v2/ticker/<Symbol>
  async getTicker(data) {
    const method = "get";
    const url = "/v2/ticker/";
    try {
      return await this._instancePublic({ url, method, data });
    } catch(e) {
      console.log(e);
    }
  }

  //retrieval of past public trades
  // {baseUrl}/v2/trades/<Symbol>/hist
  async getTrades(data) {
    const method = "get";
    const url = "/v2/trades/";
    try {
      return await this._instancePublic({ url, method, data });
    } catch(e) {
      console.log(e);
    }
  }

  //keeping track of the state of Bitfinex order books
  // {baseUrl}/v2/book/<Symbol>/<Precision>
  async getBook(data) {
    const method = "get";
    const url = "/v2/book/";
    try {
      return await this._instancePublic({url, method, data});
    } catch(e) {
      console.log(e);
    }
  }

  //retrieval of statistics on a specified trading pair or funding currency
  // {baseUrl}/v2/stats1/<Key>:<Size>:<Symbol>:<Side/Section>
  async getStats(data) {
    const method = "get";
    const url = "/v2/stats1/";
    try {
      return await this._instancePublic({ method, url, data });
    } catch(e) {
      console.log(e)
    }
  }

  // getting OCHL (Open, Close, High, Low) and volume data for the specified funding currency or trading pair
  // {baseUrl}/v2/candles/trade:<TimeFrame>:<Symbol/Section>
  async getCandles(data) {
    const method = "get";
    const url = "/v2/candles/trade:";
    try { 
      return await this._instancePublic({ method, url, data });
    } catch(e) {
      console.log(e);
    }
  }

  //Fetch currency and symbol site configuration data.
  //{baseUrl}/v2/conf/<pub>:<Action>:<Object>:<Detail>
  async getConfigs(data) {
    const method = "get";
    const url = "/v2/conf/pub:";
    try {
      return await this._instancePublic({ method, url, data });
    } catch(e) {
      console.log(e);
    }
  }

    // retrieval of different types of platform information
  // {baseUrl}/v2/status/<type>
  async getStatus(data) {
    const method = "get";
    const url = "/v2/status/";
    try {
      return await this._instancePublic({ method, url, data });
    } catch(e) {
      console.log(e)
    }
  }

  // retrieval of most recent liquidations and time-specific data if timestamp is provided
  // {baseUrl}/v2/liquidations/hist
  async getLiquidations(data) {
    const method = "get";
    const url = "/v2/liquidations/hist";
    try {
      return await this._instancePublic({ method, url, data });
    } catch(e) {
      console.log(e);
    }
  }

  // retrieval of leaderboard standings for unrealized profit (period delta), unrealized profit (inception), volume, and realized profit
  // {baseUrl}/v2/rankings/<Key>:<Time_Frame>:<Symbol/Section>
  async getLeaderBoards(data) {
    const method = "get";
    const url = "/v2/rankings/";
    try{
      return await this._instancePublic({ method, url, data });
    } catch(e) {
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
