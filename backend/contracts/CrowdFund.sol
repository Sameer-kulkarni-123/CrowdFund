// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {

    struct Campaign {
        address owner;
        string campaignName;
        uint256 target;
        uint256 deadline;
        string thumbnail;
        uint256 collectedAmt;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _campiagnName, uint256 _target, uint256 _deadline, string memory _thumbnail) public returns(uint256){
      Campaign storage campaign = campaigns[numberOfCampaigns];
        require(_deadline >  block.timestamp, "deadline should be a time in the future.");

        campaign.owner = _owner;
        campaign.campaignName = _campiagnName;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.thumbnail = _thumbnail;

        numberOfCampaigns++;

        return numberOfCampaigns -1;
    }

    function donateToCampaign(uint256 campaignID) public payable returns(uint256){
        address sender = msg.sender;
        uint256 val = msg.value;

        Campaign storage campaignToDonate = campaigns[campaignID];
        address campaignOwner = campaignToDonate.owner;

        (bool sent,) = payable(campaignOwner).call{value: val}("");

        if(sent){
            campaignToDonate.donators.push(sender);
            campaignToDonate.donations.push(val);
        }

        return val;
    }

    function getDonators(uint256 campaignID) public view returns(address[] memory, uint256[] memory){
        Campaign storage selectedCampaign = campaigns[campaignID];
        
        return(selectedCampaign.donators, selectedCampaign.donations);
    }

    function getCampaigns() public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint256 i=0; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;

    }

    function getCampaign(uint256 idx) public view returns(Campaign memory){
       Campaign storage selectedCampaign = campaigns[idx];
       return selectedCampaign;
       
    }

}