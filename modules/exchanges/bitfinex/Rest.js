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


  /** The Public Books endpoint allows you to keep track of the state of Bitfinex order books */

  async getBook(data) {
    var body = data;
    var path = (body.symbol && body.precision) ? `/v2/book/${body.symbol}/${body.precision}` : "/v2/book";
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

    /** The trades endpoint allows the retrieval of past public trades and includes details such as price, size, and time.  */

    async getTrades(data) {
      var body = data;
      var path = `/v2/trades/${body.symbol}/hist`;
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


    /** The Stats endpoint provides various statistics on a specified trading pair or funding currency.   */

    async getStats(data) {
    var body = data;
    var path = `/v2/stats1/${body.key}:${body.size}:${body.symbol}:${body.symbol}/${body.section}`;
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

  /**  The leaderboards endpoint allows you to retrieve leaderboard standings for unrealized profit (period delta), unrealized profit (inception), volume, and realized profit. */

  async getLeaderboards(data) {
    var body = data;
    var path =`/v2/rankings/${body.key}:${body.timeFrame}:${body.symbol}/hist`;
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

  /** Endpoint to retrieve liquidations.  */

  async getLiquidationFeeds(data) {
    var body = data;
    var path ="/v2/liquidations/hist";
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


   /** The Candles endpoint provides OCHL (Open, Close, High, Low) and volume data for the specified funding currency or trading pair. */

   async getCandles(data) {
    var body = data;
    var path =`/v2/candles/trade:${body.timeFrame}:${body.symbol}/${body.section}`;
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


   /** Fetch currency and symbol site configuration data. */

   async getConfigs(data) {
    var body = data;
    var path =`/v2/conf/pub:${body.action}:${body.object}:${body.detail}`;
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
  

  
  /*** Calculate the average execution price for Trading or rate for Margin funding. */

  async marketAveragePrice(data) {
    var body = data;
    var path = `/v2/calc/trade/avg?symbol=${body.symbol}&amount=${body.amount}`;
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

    /*** Calculate the exchange rate between two currencies */

    async foreignExchangeRate(data) {
      var body = data;
      var path = "/v2/calc/fx";
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

  /*** Get Trades generated by an Order   */

  async orderTrades(data) {
    var body = data;
    var path = `/v2/auth/r/order/${body.symbol}:${body.id}/trades`;
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

   /*** Retrieve your trades  */

  async Trades(data) {
    var body = data;
    var path = `/v2/auth/r/trades/${body.symbol}/hist`;
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


   /*** View your past ledger entries  */

  async Ledgers(data) {
    var body = data;
    var path = `/v2/auth/r/ledgers/${body.symbol}/hist`;
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

   /*** Get account margin information  */

  async marginInfo(data) {
    var body = data;
    var path = `/v2/auth/r/info/margin/${body.symbol}`;
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


   /*** Get active positions  */

  async retrievePositions(data) {
    var body = data;
    var path = "/v2/auth/r/positions";
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

  /*** use of funds you have in your Margin Wallet to settle a leveraged position */

  async claimPosition(data) {
    var body = data;
    var path = "/v2/auth/w/position/claim";
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

  /*** Returns data on past positions*/

  async positionHistory(data) {
    var body = data;
    var path = "/v2/auth/r/positions/hist";
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

   /*** Return an audit of your positions. */

   async positionAudit(data) {
    var body = data;
    var path = "/v2/auth/r/positions/audit";
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

     /*** Update the amount of collateral for a Derivative position */

  async derivativePosition(data) {
    var body = data;
    var path = "/v2/auth/w/deriv/collateral/set";
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

  /*** Update the amount of collateral for a Derivative position */

  async fundOffers(data) {
    var body = data;
    var path = `/v2/auth/r/funding/offers/${body.symbol}`;
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

   /*** Submit a new funding offer. */

   async submitFundOffers(data) {
    var body = data;
    var path = "/v2/auth//w/funding/offer/submit";
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


  /*** Cancels an existing Funding Offer based on the offer ID entered. */

  async cancelFundingOffer(data) {
    var body = data;
    var path = "/v2/auth/w/funding/offer/cancel";
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

  /*** Cancel all of your current funding offers. */

  async cancelAllFundingOffer(data) {
    var body = data;
    var path = "/v2/auth/w/funding/offer/cancel/all";
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

  /*** Return Taken "Used" or "Unused" funding. */

  async closeFund(data) {
    var body = data;
    var path = "/v2/auth/w/funding/close";
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

  /*** Return Taken "Used" or "Unused" funding. */

  async closeFund(data) {
    var body = data;
    var path = "/v2/auth/w/funding/close";
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

  /*** Activate or deactivate auto-renew.  */

  async autoRenewFund(data) {
    var body = data;
    var path = "/v2/auth/w/funding/auto";
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

    /*** Toggle to keep funding taken */

  async keepFunding(data) {
    var body = data;
    var path = "/v2/auth/w/funding/keep";
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

  /*** Get past inactive funding offers.  */

  async fundOffersHistory(data) {
    var body = data;
    var path = `/v2/auth/r/funding/offers/${body.symbol}/hist`;
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

  /*** Funds not used in active positions  */

  async fundLoans(data) {
    var body = data;
    var path = `/v2/auth/r/funding/loans/${body.symbol}`;
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


  /*** Inactive funds not used in positions.  */

  async fundLoansHistory(data) {
    var body = data;
    var path = `/v2/auth/r/funding/loans/${body.symbol}/hist`;
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

    /*** Funds used in active positions  */

    async fundCredits(data) {
      var body = data;
      var path = `/v2/auth/r/funding/credits/${body.symbol}`;
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
  
   /*** Inactive funds used in positions. */

   async fundCreditsHistory(data) {
    var body = data;
    var path = `/v2/auth/r/funding/credits/${body.symbol}/hist`;
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

  /*** Get funding trades */

  async fundingTrades(data) {
    var body = data;
    var path = `/v2/auth/r/funding/trades/${body.symbol}/hist`;
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


  /*** Get account funding info */

  async fundingInfo(data) {
    var body = data;
    var path = `/v2/auth/r/info/funding/${body.symbol}`;
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

  /*** Retrieve the user ID, email, username and timezone setting for the account associated with the API key used. */

  async userInfo(data) {
    var body = data;
    var path = "/v2/auth/r/info/user";
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

  /*** Retrieve a list of past logins. */

  async loginHistory(data) {
    var body = data;
    var path = "/v2/auth/r/login/hist";
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

  /*** Transfer funds between wallets.  */

  async walletTransfer(data) {
    var body = data;
    var path = "/v2/auth/w/transfer";
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

   /*** Retrieve your deposit address or generate a new deposit address for a specific currency and wallet. */

   async depositAddress(data) {
    var body = data;
    var path = "/v2/auth/w/deposit/address";
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

  
  /*** Retrieve your deposit address or generate a new deposit address for a specific currency and wallet. */

  async generateInvoice(data) {
    var body = data;
    var path = "/v2/auth/w/deposit/invoice";
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


    /*** Allows you to request a withdrawal from one of your wallets. */

  async Withdrawal(data) {
    var body = data;
    var path = "/v2/auth/w/withdraw";
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

  /*** Allows you to request a withdrawal from one of your wallets. */

  async Withdrawal(data) {
    var body = data;
    var path = "/v2/auth/w/withdraw";
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

  /*** View your past deposits/withdrawals. */

  async movements(data) {
    var body = data;
    var path = `/v2/auth/r/movements/${body.currency}/hist`;
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

   /*** Retrieve a list of active price alerts. */

   async alertList(data) {
    var body = data;
    var path = "/v2/auth/r/alerts";
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


  /*** Sets up a price alert at the given value */

  async alertSet(data) {
    var body = data;
    var path = "/v2/auth/w/alert/set";
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

  /*** Delete an active alert. */

  async deleteAlert(data) {
    var body = data;
    var path = `/v2/auth/w/alert/price:${body.symbol}:${body.price}/del`;
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

  /*** Calculate the balance available for orders/offers */

  async availableBalance(data) {
    var body = data;
    var path = "/v2/auth/calc/order/avail";
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

  /*** Allows you to create custom settings by creating key: value pairs. */

  async userSettingWrite(data) {
    var body = data;
    var path = "/v2/auth/w/settings/set";
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


   /*** Allows you to read custom settings by providing a key. */

   async userSettingRead(data) {
    var body = data;
    var path = "/v2/auth/r/settings";
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

     /*** Allows you to delete custom settings. */

     async userSettingDelete(data) {
      var body = data;
      var path = "/v2/auth/w/settings/del";
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
