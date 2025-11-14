const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleDex", function () {
  let SimpleDex, simpleDex, owner, addr1, addr2;
  let token1, token2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    // two adress of tokens for example 
    token1 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    token2 = "0xCf7Ed3Acca5a467e9e704C703E8D87F634fB0Fc9";
    
    SimpleDex = await ethers.getContractFactory("SimpleDex");
    simpleDex = await SimpleDex.deploy(token1, token2);
    await simpleDex.waitForDeployment();
  });

  it("Should set token addresses correctly", async function () {
    expect(await simpleDex.token1()).to.equal(token1);
    expect(await simpleDex.token2()).to.equal(token2);
  });

  it("Should calculate output amount correctly", async function () {
    const amountOut = await simpleDex.getAmountOut(1000, 10000, 20000);
    expect(amountOut).to.be.above(0);
  });
});
