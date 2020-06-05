const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'gold sell citizen notable bar close diesel habit street until drip sword',
  'https://rinkeby.infura.io/v3/0fa3022da24d4b04a1b3d6274bd9c0e4'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('attemping to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode, arguments: ['Hi there!'] })
      .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deploy to ', result.options.address);
};

deploy();
