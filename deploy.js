const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const { abi, evm } = require('./compile')

provider = new HDWalletProvider(
  'delay kite jump tip pen play sound length level bundle memory surge',
  'https://rinkeby.infura.io/v3/02b3b14cb9f843a18ed1b090d9c606b5'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
  provider.engine.stop()
}
deploy()
