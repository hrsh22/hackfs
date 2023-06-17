const PushAPI = require("@pushprotocol/restapi");

const { ethers } = require("ethers");

const PK = process.env.PUSH_PRIVATE_KEY;
const Pkey = `0x${PK}`;
const channelKey = process.env.PUSH_CHANNEL_KEY;
const _signer = new ethers.Wallet(Pkey);

const deployCollectionNotification = async (
  name,
  symbol,
  maxSupply,
  teamReserve,
  ownerAddress,
  transactionHash
) => {
  const address = ownerAddress;

  const tableBody = `
  Name: ${name}
  Symbol: ${symbol}
  Max Supply: ${maxSupply}
  Team Reserve: ${teamReserve}
  Owner Address: ${ownerAddress}
    Transaction Hash: ${transactionHash}
  `;
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, // target
      identityType: 0, // minimal payload
      notification: {
        title: "Collection has been deployed Successfully!🎉",
        body: tableBody,
      },
      payload: {
        title: "Collection has been deployed Successfully!🎉",
        body: tableBody,
        cta: "",
        img: "",
      },
      recipients: address, // recipients addresses
      channel: channelKey, // your channel address
      env: "staging",
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};


module.exports = {
    deployCollectionNotification,
};
