const { ethers } = require("ethers");
const { MintBoxxCollectionFactoryABI } = require("../constants/constants");

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

const presaleMint = async (
  contractAddress, presaleMintPrice
) => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      MintBoxxCollectionFactoryABI,
      signer
    );

  
    const transaction = await contract.presaleMint({ value: presaleMintPrice });
    console.log('1', 1)
    const receipt = await transaction.wait();

    const txHash = receipt.transactionHash;
    console.log('txHash', txHash)
    return {
      transactionHash: txHash,
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = { presaleMint };
