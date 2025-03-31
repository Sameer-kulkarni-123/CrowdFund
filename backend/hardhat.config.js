require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
/** @type import('hardhat/config').HardhatUserConfig */

const {SEPOLIA_END_POINT_URL, METAMASK_ACCOUNT_PRIVATE_KEY} = process.env;

module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia: {
      url: SEPOLIA_END_POINT_URL,
      accounts: [
        `0x${METAMASK_ACCOUNT_PRIVATE_KEY}`
      ]
    }
  }
};
