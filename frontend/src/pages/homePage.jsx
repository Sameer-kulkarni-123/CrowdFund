import React, { useEffect, useState } from 'react'
import CampaignCard from '../components/campaignCard'
import "./homePage.css"
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../constants/constants'
import UnixToDaysLeft from '../utils/unixToDays'
import FindTotalRaised from '../utils/findTotalRaised'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import CreateCampaignPage from './createCampaignPage'
import { Link, useNavigate } from 'react-router-dom'

function HomePage(props) {

  const navigate = useNavigate();
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: ''
  //   }
  // ])

  const [AllCampaigns, setAllCampaigns] = useState([])
  const [AllCampaignsJson, setAllCampaignsJson] = useState([])

  async function handleRetrieve(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts first
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
      const tx = await contractInstance.getCampaigns()
      // const receipt = await tx.wait()
      console.log("tx: ", tx)
      return(tx)
      // console.log("receipt: ", receipt)
      // const campaignID = receipt.events[0].args[0]
      // window.alert("The campaign ID is: ", campaignID)
    }catch(e){
      window.alert(e)
      console.error(e)
    }

  }

  useEffect(() => {
    async function fetchCampaigns(){
      const allCampaigns = await handleRetrieve()
      setAllCampaigns(allCampaigns)

      const allCampaignsJson = allCampaigns.map((campaign) => {
        return(
          {
            owner: campaign[0],
            campaignName: campaign[1],
            target: campaign[2].toString(),
            deadline: campaign[3].toString(),
            thumbnail: campaign[4],
            collectedAmt: campaign[5],
            donators: campaign[6],
            donations: campaign[7] 
          }
        )
      })
      setAllCampaignsJson(allCampaignsJson)
      // console.log(" this is campaigns array simply", allCampaigns)
      // console.log(" this is campaigns array from useState", AllCampaigns)
      // console.log(" this is campaigns json simply", allCampaignsJson)
      // console.log("this is campaigns json from useState", AllCampaignsJson)
      // console.log("this is inside useEffect only one thing in the json", allCampaignsJson[0].campaignName)
      // console.log("this is inside useEffect", allCampaigns[0])
      // console.log("this should be sam hopefully", allCampaigns[0][1])
      // console.log("this is displaying AllCampaignsJson: ", AllCampaignsJson)
      // console.log("this is to log the deadline straight from the json: ",AllCampaignsJson[0].deadline)
      // console.log("this is the UnixToDays test: ", UnixToDaysLeft(AllCampaignsJson[0].deadline))
      // console.log("test for total raised", FindTotalRaised(AllCampaignsJson[0].donations))
    

    }

    fetchCampaigns();
    return () => {
      null
    }
  }, [])

  useEffect(() => {
    
      // console.log(" this is campaigns array simply", allCampaigns)
      console.log(" this is campaigns array from useState", AllCampaigns)
      // console.log(" this is campaigns json simply", allCampaignsJson)
      console.log("this is campaigns json from useState", AllCampaignsJson)
      console.log("this is displaying one object in  AllCampaignsJson: ", AllCampaignsJson[0])
      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign owners: ", index , campaign.owner)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign Names: ", index , campaign.campaignName)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign Target: ", index , campaign.target)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      // if(AllCampaignsJson.length > 0){
      //   console.log("this is to log the deadline straight from the json: ",AllCampaignsJson[0].deadline.toString())

      // }else{
      //   console.log("Empty AllCampaignsJson")
      // }

      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign deadline: ", index , campaign.deadline)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign thumbnail: ", index , campaign.thumbnail)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign donators: ", index , campaign.donators)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      if(AllCampaignsJson.length > 0){
        AllCampaignsJson.map((campaign, index) => {
          console.log("campaign donations: ", index , campaign.donations)
        })

      }else{
        console.log("Empty AllCampaignsJson")
      }

      // if(AllCampaignsJson.length > 0){
      //   console.log("this is the UnixToDays test of index 8: ", UnixToDaysLeft(AllCampaignsJson[8].deadline))

      // }else{
      //   console.log("Empty AllCampaignsJson")
      // }
      // console.log("this is to log the deadline straight from the json: ",AllCampaignsJson[0].deadline)
      // console.log("this is the UnixToDays test: ", UnixToDaysLeft(AllCampaignsJson[0].deadline.toString()))
      // console.log("test for total raised", FindTotalRaised(AllCampaignsJson[0].donations))
  
    return () => {
      null
    }
  }, [AllCampaignsJson])
  
  


  return (
    <div className='home-main-div'>
      <div className='main-div-header'>
        <h1 className='text-3xl'>All Campaigns</h1>
        <p className='text-white text-xl'>Signed is as: {props.signedInAccount}</p>
        <button className="cursor-pointer text-xl" onClick={() => navigate("/create-campaign")}>Create a Campaign</button>
        {/* <Link to="/create-campaign">Create Campaign</Link> */}
        {/* <button onClick={}>Create Campaign</button> */}
      </div>
      <div className='home-p-campaign'>
        {/* {AllCampaignsJson.map((campaign, index) => (
          <CampaignCard campaignID={index} campaignName={campaign.campaignName} timeToDeadline={UnixToDaysLeft(campaign.deadline)} totalMoneyRaised={ethers.utils.formatEther(FindTotalRaised(campaign.donations))} target={campaign.target} owner={campaign.owner} />
        ))} */}
        {AllCampaignsJson.map((campaign, index) => {
         if (UnixToDaysLeft(campaign.deadline) > 0)  {
            console.log(UnixToDaysLeft(campaign.deadline))
            return <CampaignCard campaignID={index} campaignName={campaign.campaignName} timeToDeadline={UnixToDaysLeft(campaign.deadline)} totalMoneyRaised={ethers.utils.formatEther(FindTotalRaised(campaign.donations))} target={ethers.utils.formatEther(campaign.target)} owner={campaign.owner} />
          }else{
            null
          }
          
        }
        )}
      </div>
    </div>
  )
}

export default HomePage
