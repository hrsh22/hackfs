const express = require("express");
const router = express.Router();

const {
  deployCollection,
} = require("../blockchain/functions/deployCollection");

const { setupLaunch } = require("../blockchain/functions/setupLaunch");
const { presaleMint } = require("../blockchain/functions/presaleMint");
const { publicMint } = require("../blockchain/functions/publicMint");

router.get("/", (req, res) => {
  res.send("We are on collections");
});

//POST
router.post("/deploy", async (req, res) => {
  const { name, symbol, maxSupply, teamReserve, ownerAddress } = req.body;
  try {
    const collectionAddress = await deployCollection(
      name,
      symbol,
      maxSupply,
      teamReserve,
      ownerAddress
    );
    res.status(200).json({ collectionAddress });
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
  } = req.body;
  try {
    const launchDetails = await setupLaunch(
      contractAddress,
      publicMintPrice_,
      presaleMintPrice_,
      presaleStartTime_,
      publicSaleStartTime_,

    );
    res.status(200).json({ launchDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//POST
router.post("/presalemint", async (req, res) => {
  const {
    contractAddress, presaleMintPrice
  } = req.body;
  try {
    const presaleMintTx = await presaleMint(
      contractAddress, presaleMintPrice
    );
    res.status(200).json({ presaleMintTx });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//POST
router.post("/publicsalemint", async (req, res) => {
  const {
    contractAddress, publicsaleMintPrice
  } = req.body;
  try {
    const publicsaleMintTx = await publicMint(
      contractAddress, publicsaleMintPrice
    );
    res.status(200).json({ publicsaleMintTx });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
