module.exports = class CryptoOTP {
  exchange(exchange, type = "rest", key, secret) {
    const Ex = require(`./modules/exchanges/${exchange}/${type}`);
    const ex = new Ex(key, secret);
    ex.connect();
  }
};
