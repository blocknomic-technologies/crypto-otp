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
var data1={orderID:"lsaskas"}
var wallet = { currency: "XBt" };
var ticker = { symbols: "tBTCUSD" };
var bitwallet = {};
async function test() {
  //  var response = await Bitmex.getUserWallet(wallet);

  //   var response = await Bitmex.postOrder(data);
  //   var response = await Bitfinex.postWallets(bitwallet);
 var response1= await Bitmex.deleteOrder(data1);
  console.log(response1);
}

test();
