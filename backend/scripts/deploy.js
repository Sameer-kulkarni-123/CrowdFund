const hre = require("hardhat")

async function main() {
  const CrowdFund = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFund = await CrowdFund.deploy();

  await crowdFund.deployed()
  console.log(`The contract is deployed at address: ${crowdFund.address}`)
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
})