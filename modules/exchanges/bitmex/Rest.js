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

  /**  get the user model */

  async getUser(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/user";
    var method = "get";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

   /**  Get your current affiliate/referral status. */

   async getAffilitateStatus() {
    var path = "/api/v1/user/getAffiliateStatus";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

   /**  Cancel a withdrawal */

   async cancelWithdrawal(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/user/cancelWithdrawal";
    var method = "post";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }



   /** Check if a referral code is valid. */

   async checkReferralCode(data) {
    var path = `/api/v1/user/checkReferralCode?referralCode=${data.referralCode}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


   /** Get your account's commission status. */

   async getcommission() {
    var path = `/api/v1/user/commission`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Register your communication token for mobile clients
   * token and platformAgent is required
   */

  async communicationToken(data) {
    var body = JSON.stringify(data);
    var path = `/api/v1/user/communicationToken`;
    var method = "post";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


   /** Register your communication token for mobile clients 
    * token is required
   */

   async confirmEmail(data) {
    var body = JSON.stringify(data);
    var path = `/api/v1/user/confirmEmail`;
    var method = "post";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


     /** Confirm a withdrawal
    * token is required
   */

  async confirmEmail(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/user/confirmWithdrawal";
    var method = "post";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Get a deposit address */

  async getDepositAddress(data) {
    var path = `/api/v1/user/depositAddress?currency=${data.currency}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

   /** Get the execution history by days */

   async getExecutionHistory(data) {
    var path = `/api/v1/user/executionHistory?symbol=${data.symbol}&timestamp=${data.timestamp}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Log out of BitMEX */

  async logout() {
    var path = "/api/v1/user/logout";
    var method = "post";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Get your account's margin status. Send a currency of "all" to receive an array of all supported currencies */

  async getUserMargin(data) {
    var path = `/api/v1/user/margin?currency=${data.currency}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }



  /** Get the minimum withdrawal fee for a currency */

  async getMinWithdrawalFee(data) {
    var path = `/api/v1/user/minWithdrawalFee?currency=${data.currency}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

         /** Save user preferences
    * prefs and overwrite is required
    * overwrite: fa/se/true if true overwrite all exisiting preferences
   */

  async saveUserPreferences(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/user/preferences";
    var method = "post";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Get 7 days worth of Quote Fill Ratio statistics */

  async getQuoteFillRatio(data) {
    var path = "/api/v1/user/quoteFillRatio";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Request a withdrawal to an external wallet. 
   * otpToken Required if 2 factor is enabled on the user account
   * currency, amount (Required), address, addressId, fee, text
  */

  async requestWithdrawal(data) {
    var body = JSON.stringify(data);
    var path = "/api/v1/user/requestWithdrawal";
    var method = "post";
    var header = this.authenticatedHeader(method, path,body);
    try {
      return await this._instance({
        method: method,
        data:body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Get a history of all of your wallet transactions (deposits, withdrawals, PNL)
   * currency, count(number of results to befetched), start( starting points of results)
  */

  async getUserWalletHistory(data) {
    var body = JSON.stringify(data);
    var path = `/api/v1/user/walletHistory?currency=${data.currency}&count=${data.count}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

   /** Get your user events */

  async getUserEvent(data) {
    var body = JSON.stringify(data);
    var path = `/api/v1/userEvent?count=${data.count}&startId=${data.startId}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

   /** Get trades 
    * reverse true/false
   */

   async getTrade(data) {
    var body = JSON.stringify(data);
    var path = (data.symbol) ? `/api/v1/trade?count=${data.count}&reverse=${data.reverse}&symbol=${data.symbol}` : `/api/v1/trade?count=${data.count}&reverse=${data.reverse}`  ;
    var method = "get";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

    /** Get previous trades in time buckets 
     * binSize - Time interval to bucket by. Available options: [1m,5m,1h,1d].
    * reverse true/false
    *  partial true/false - If true, will send in-progress (incomplete) bins for the current time period.
    * count - number of results to be returned
   */

  async getPrevTradeBuckets(data) {
    var body = JSON.stringify(data);
    var path = `/api/v1/trade/bucketed?binSize=${data.binSize}&partial=${data.partial}&count=${data.count}&reverse=${data.reverse}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path, body);
    try {
      return await this._instance({
        method: method,
        data: body,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Get exchange-wide and per-series turnover and volume statistics. */

  async getStats() {
    var path = "/api/v1/stats";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Get historical exchange-wide and per-series turnover and volume statistics */

  async getStatsHistory() {
    var path = "/api/v1/stats/history";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Get a summary of exchange statistics in USD. */

  async getStatsHistoryUSD() {
    var path = "/api/v1/stats/historyUSD";
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Get settlement history. */

  async getSettlement(data) {
    var path = (data.symbol) ? `/api/v1/settlement?count=${data.count}&reverse=${data.reverse}&symbol=${data.symbol}` : `/api/v1/settlement?count=${data.count}&reverse=${data.reverse}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


  /** Get model schemata for data objects returned by this API. */

  async getSchema(data) {
    var path = (data.model) ? `/api/v1/schema?model=${data.model}` : `/api/v1/schema`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

   /** Returns help text & subject list for websocket usage. */

   async getWebsocketHelp(data) {
    var path = `/api/v1/schema/websocketHelp`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Get your API Keys. */

  async getApiKeys(data) {
    var path = `/api/v1/apiKey?reverse=${data.reverse}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }


   /** Get funding history */

   async fundHistory(data) {
    var path = `/api/v1/funding?count=${data.count}&reverse=${data.reverse}`;
    var method = "get";
    var header = this.authenticatedHeader(method, path);
    try {
      return await this._instance({
        method: method,
        url: path,
        headers: header
      });
    } catch (e) {
      console.log(e);
    }
  }

    /** Get your current GlobalNotifications. currently been worked on by bitmex. */

    async globalNotification() {
      var path = "/api/v1/globalNotification";
      var method = "get";
      var header = this.authenticatedHeader(method, path);
      try {
        return await this._instance({
          method: method,
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
