const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Test Daylight Token Contract', function () {
  let DaylightFactory
  let daylight
  let owner, daylightVault, treasury, rfv, addr1, addr2
  before(async () => {
    [owner, daylightVault, treasury, rfv, addr1, addr2, addr3] = await ethers.getSigners()

    DaylightFactory = await ethers.getContractFactory('Daylight')
  })

  beforeEach(async () => {
    // daylight = await DaylightFactory.connect(owner).deploy(daylightVault.address, treasury.address, rfv.address)
    // await daylight.deployed()
  })

  it('Send Presale', async () => {
    /*
    expect((await daylight.totalSupply()).toString()).to.equal('240000000000000000000000000')
    expect(await daylight.owner()).to.equal(treasury.address)
    await (await daylight.connect(treasury).sendPresale([addr1.address], ['1000000'])).wait()
    expect((await daylight.balanceOf(addr1.address)).toString()).to.equal('1000000')
    */
  })
  /*
    it('Auto-Staking', async () => {
      await (await daylight.connect(treasury).sendPresale([addr1.address, addr2.address, addr3.address], ['1000000', '1000000', '1000000']))
      expect((await daylight.balanceOf(addr1.address)).toString()).to.equal('1000000')
      expect((await daylight.balanceOf(addr2.address)).toString()).to.equal('1000000')
      expect((await daylight.balanceOf(addr3.address)).toString()).to.equal('1000000')
      await (await daylight.connect(treasury).setInitialDistributionFinished()).wait()
      await (await daylight.connect(addr2).transfer(addr3.address, '1000')).wait()
      expect((await daylight.balanceOf(addr2.address)).toString()).to.equal('999000')
      expect((await daylight.balanceOf(addr3.address)).toString()).to.equal('1001000')
      const tenMinutes = 10 * 60
      await ethers.provider.send('evm_increaseTime', [tenMinutes])
      await ethers.provider.send('evm_mine')
      await (await daylight.connect(addr2).transfer(addr3.address, '1000')).wait()
      expect((await daylight.balanceOf(addr2.address)).toString()).to.equal('998000')
      expect((await daylight.balanceOf(addr3.address)).toString()).to.equal('1002000')
      expect((await daylight.balanceOf(addr1.address)).toString()).to.equal('1000000')
      const twentyMinutes = 20 * 60
      await ethers.provider.send('evm_increaseTime', [twentyMinutes])
      await ethers.provider.send('evm_mine')
      await (await daylight.connect(addr2).transfer(addr3.address, '1000')).wait()
      expect((await daylight.balanceOf(addr1.address)).toString()).to.equal('1014985')
      const thirtyMinutes = 30 * 60
      await ethers.provider.send('evm_increaseTime', [thirtyMinutes])
      await ethers.provider.send('evm_mine')
      await (await daylight.connect(addr2).transfer(addr3.address, '1000')).wait()
      expect((await daylight.balanceOf(addr1.address)).toString()).to.equal('1030194')
    })
    */
});
