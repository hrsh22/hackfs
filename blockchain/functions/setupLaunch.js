const { ethers } = require("ethers");
const { MintBoxxCollectionFactoryABI } = require("../constants/constants");

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

const setupLaunch = async (
  contractAddress,
  publicMintPrice_,
  presaleMintPrice_,
  presaleStartTime_,
  publicSaleStartTime_,
) => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      MintBoxxCollectionFactoryABI,
      signer
    );

    const transaction = await contract.setUpLaunch(
      publicMintPrice_,
      presaleMintPrice_,
      presaleStartTime_,
      publicSaleStartTime_,
    );
    const txHash = transaction.hash;
    console.log("transaction Hash:", txHash); // log the transaction hash for debugging purposes
    await transaction.wait();

    return {
      transactionHash: txHash,
      presaleMintPrice: presaleMintPrice_,
      presaleStartTime: presaleStartTime_,
      publicMintPrice: publicMintPrice_,
      publicSaleStartTime: publicSaleStartTime_,
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setupLaunch };
