import Web3 from 'web3';

//window is a referene to the global variable.   window.web3 --> copy of metamask library
//const web3 = new Web3(window.web3.currentProvider);
let web3;
// typeof window --> undefined in the server but in the browser returns object
if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
  //we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else{
  //we are on the server or the user is not running metamask
  //make own provider
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/0fa3022da24d4b04a1b3d6274bd9c0e4'
  );
  web3 = new Web3(provider);
}

export default web3;
