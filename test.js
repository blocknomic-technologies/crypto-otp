var bitmex = require("./modules/exchanges/bitmex/Rest");
var bitfinex = require("./modules/exchanges/bitfinex/Rest");
var Bitfinex = new bitfinex(
  "IbvNB5mlFJH2o2JLj2r3fRXpn45y8HUAYXElOHcK7lP",
  "x56I1fa7pMcmrv5ZRLrkQwd4eZKlRtVl4KPqIXGlust"
);

var Bitmex = new bitmex(
  "amTL02nRYRAHi1xJOoPQEXke",
  "FsU9xtC1l1Dr87kcWzHTdCGh_52VNPiOWD1eBTbRcmEBh-KW"
);

// Bitmex.getAnnouncement();
// Bitmex.getPositions();

var data = { symbol: "XBTUSD", orderQty: 1, price: 5900, ordType: "Limit" };
var wallet = { currency: "XBt" };
var ticker = { symbols: "tBTCUSD" };
var bitwallet = {};
var order = {  type: 'LIMIT', symbol: 'tBTCUSD', price: '15', amount: '0.001' };
var updOrder = { id: 12345, price: '15', amount: '0.001' };
async function test() {
  //  var response = await Bitmex.getUserWallet(wallet);
   // var response = await Bitfinex.getTickers(ticker);
     var response = await Bitmex.postOrder(data);
  console.log(response);
}

test();
