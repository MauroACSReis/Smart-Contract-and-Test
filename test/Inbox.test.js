// Require Modules
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3') //// Constructor
//// This line will create an instance of web3 and tell it to connect to the local test network: Ganache. Web3 always needs a provider
const web3 = new Web3(ganache.provider()) //// Instance
const { interface, bytecode } = require('../compile')

let accounts
let inbox
const INITIAL_STRING = 'Hi there!'

// Test

// beforeEach (will run before each it code below)
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy the contract
  inbox = await //// teaches web3 about what methoads an Inbox contract has
  new web3.eth.Contract(JSON.parse(interface))
    //// tells web3 that we want to deploy a new copy of this contract
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING]
      //// Instructs web3 to send out a transaction that creates this contract
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    })
})

// its - test
describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })
  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_STRING)
  })

  it('can change the message.', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'bye')
  })
})
