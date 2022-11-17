const { expect } = require("chai");
const { ethers, userConfig } = require("hardhat");
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");
const { Contract, ContractFactory, Wallet } = require("ethers");
const { Artifacts } = require("hardhat/internal/artifacts");
const { Artifact } = require("hardhat/types");

// import { waffle } from "hardhat";
// const { deployContract, provider, solidity, createFixtureLoader } = waffle;

// import Masterchef fom

// chai.use(solidity);

describe("Swapmining", function () {
  it("Should swap", async function () {
    let [owner, liquiidtyReceiver, treasury, rfv, addr1, addr2, ...addrs] = await ethers.getSigners()
    //JoeToken Smart Contract
    const JoeTokenFactory = await ethers.getContractFactory('JoeToken')
    const joeToken = await JoeTokenFactory.deploy()
    await joeToken.deployed()
    //JoeFactory Smart Contract
    const JoeFactory = await ethers.getContractFactory('JoeFactory')
    const joeFactory = await JoeFactory.deploy(owner.address)
    await joeFactory.deployed()
    //WAVAX Smart Contract
    const WAVAXFactory = await ethers.getContractFactory('WAVAX9Mock')
    const wavax = await WAVAXFactory.deploy()
    await wavax.deployed()
    //USDC Smart Contract
    const USDCFactory = await ethers.getContractFactory('ERC20MockDecimals')
    const usdc = await USDCFactory.deploy(6)
    await usdc.deployed()
    //Libraries
    //JoeLibrary
    const JoeLibraryFactory = await ethers.getContractFactory('contracts/TraderJoe/traderjoe/libraries/JoeLibrary.sol:JoeLibrary')
    const joeLibrary = await JoeLibraryFactory.deploy()
    await joeLibrary.deployed()
    //SafeMath Library
    const SafeMathFactory = await ethers.getContractFactory('contracts/TraderJoe/traderjoe/libraries/SafeMath.sol:SafeMathJoe')
    const safeMathLibrary = await SafeMathFactory.deploy()
    await safeMathLibrary.deployed()
    //TransferHelper Library
    const TransferHelperLibrary = await ethers.getContractFactory('contracts/TraderJoe/traderjoe/libraries/TransferHelper.sol:TransferHelper')
    const transferHelperLibrary = await TransferHelperLibrary.deploy()
    await transferHelperLibrary.deployed()
    //JoeRouter Smart Contract
    const JoeRouterFactory = await ethers.getContractFactory('JoeRouter02')
    const joeRouter = await JoeRouterFactory.deploy(
      joeFactory.address,
      wavax.address)
    await joeRouter.deployed()
    //Daylight Smart Contract
    const DaylightFactory = await ethers.getContractFactory('Daylight')
    const daylight = await DaylightFactory.connect(owner).deploy(liquiidtyReceiver.address, treasury.address, rfv.address, joeRouter.address, joeFactory.address, wavax.address, usdc.address)
    await daylight.deployed()
    await (await daylight.connect(treasury).sendPresale([addr1.address], ['1000000000000000000'])).wait()
    expect((await daylight.balanceOf(addr1.address)).toString()).to.equal('1000000000000000000')
    await (await usdc.connect(treasury).mint(treasury.address, '1000000')).wait()
    expect((await usdc.balanceOf(treasury.address)).toString()).to.equal('1000000')
    await (await usdc.connect(treasury).approve(joeRouter.address, '1000000')).wait()
    await (await daylight.connect(treasury).approve(joeRouter.address, '4000000000000000000')).wait()
    const res = await joeFactory.getPair(daylight.address, usdc.address)
    console.log('result:', res)
    let balance = await daylight.balanceOf(owner.address)
    console.log('daylight balance:', balance)
    balance = await usdc.balanceOf(owner.address)
    console.log('usdc balance:', balance)
    console.log('addresses:', joeFactory.address, daylight.address, usdc.address)
    const pairAddr = await joeLibrary.pairFor(joeFactory.address, daylight.address, usdc.address)
    console.log('pair address:', pairAddr)
    await (await joeRouter.connect(treasury).addLiquidity(daylight.address, usdc.address, '4000000000000000000', '1000000', '0', '0', treasury.address, Math.floor(Date.now() / 1000) + 10)).wait()
  });
});
