pragma solidity ^0.4.17;  // version of solidity


contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimun) public{
        address newCampaign = new Campaign(minimun, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployCampaign() public view returns(address[]){
        return deployedCampaigns;
    }
}


contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumcontribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumcontribution = minimum;
    }

    function contribute() public payable{
        require(msg.value > minimumcontribution);

        approvers[msg.sender] = true;
        approversCount ++;
    }

    function createRequest(string description,uint value,address recipient) public restricted{
        Request memory newRequest = Request({
             description:description,
             value:value,
             recipient:recipient,
             complete:false,
             approvalCount:0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        //validate address exists like a approvers
        require(approvers[msg.sender]);
        //validate that approver has already voted
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
            minimumcontribution,
            this.balance, //the amount of money that the contract has available
            requests.length,
            approversCount,
            manager
          );
    }

    function getRequestCount() public view returns (uint){
        return requests.length;
    }
}
