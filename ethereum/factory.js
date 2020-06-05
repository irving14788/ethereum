import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0x930AD69e9a44Df054aFAb1eaD60dfD262e0F6b34'
);


export default instance;
