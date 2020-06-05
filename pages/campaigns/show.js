import React, { Component } from 'react';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/campaign';
import { Button, Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component{

  static async getInitialProps(props){
    console.log('direccion',props.query.address);
    const campaign = Campaign(props.query.address);
    const summery = await campaign.methods.getSummary().call();
    console.log(summery);
    return {
      address: props.query.address,
      minimumcontribution:summery[0],
      balance:summery[1],
      requests:summery[2],
      approversCount:summery[3],
      manager:summery[4]
    };
  }

  renderCards(){
    const {
      minimumcontribution,
      balance,
      requests,
      approversCount,
      manager
    } = this.props;
    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager create this campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumcontribution,
        meta: 'Minimun Contribution',
        description: 'you must contribute  at least  this much wei',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requests,
        meta: 'Number of requests',
        description: 'A request tries to withdraw money from the contract.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description: 'Number of people have already donated to this campaign.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'the balance is how much money this campaign has left to spend.',
        style: { overflowWrap: 'break-word' }
      }
    ];
    return <Card.Group items={items} />;
  }

  render(){
    return (
      <Layout>
        <h3>Campaign show </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}

            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }

}

export default CampaignShow;
