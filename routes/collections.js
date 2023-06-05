const express = require("express");
const router = express.Router();

const {
  deployCollection,
} = require("../blockchain/functions/deployCollection");

const { setupLaunch } = require("../blockchain/functions/setupLaunch");

router.get("/", (req, res) => {
  res.send("We are on collections");
});

//POST
router.post("/deploy", async (req, res) => {
  const { name, symbol, maxSupply, teamReserve, ownerAddress } = req.body;
  try {
    const collectionDetails = await deployCollection(
      name,
      symbol,
      maxSupply,
      teamReserve,
      ownerAddress
    );
    res.status(200).json({ collectionDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//POST
router.post("/setupLaunch", async (req, res) => {
  const {
    contractAddress,
    publicMintPrice_,
    presaleMintPrice_,
    presaleStartTime_,
    publicSaleStartTime_,
    presaleWhitelistMerkelTreeRoot_,
  } = req.body;
  try {
    const launchDetails = await setupLaunch(
      contractAddress,
      publicMintPrice_,
      presaleMintPrice_,
      presaleStartTime_,
      publicSaleStartTime_,
      presaleWhitelistMerkelTreeRoot_
    );
    res.status(200).json({ launchDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get collection details
// router.get("/collectionDetails", async (req, res) => {
//   const { contractAddress, name, symbol, sort, select} =
//     req.query;
//   const queryObject = {};

//   if (contractAddress) {
//     queryObject.contractAddress = new RegExp(`^${contractAddress}$`, "i");
//   }
//   if (name) {
//     queryObject.name = new RegExp(`^${name}$`, "i");
//   }
//   if (symbol) {
//     queryObject.symbol = new RegExp(`^${symbol}$`, "i");
//   }

//   let apiData = NFTcollectionDetails.find(queryObject);

//   if (sort) {
//     apiData = apiData.sort(sort.replace(/,/g, ' '));
//   }
//   if (select) {
//     apiData = apiData.select(select.replace(/,/g, ' '));
//   }

//   console.log("NFT Collection - Query called!");

//   const collections = await apiData;
//   res.status(200).json({ total: collections.length, collections });
// });

//---------------------------------------------------------//

module.exports = router;
