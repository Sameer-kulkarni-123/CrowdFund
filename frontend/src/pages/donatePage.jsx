import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { contractAddress, contractABI } from '../constants/constants'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'





const DonatePage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [Campaign, setCampaign] = useState([])
    const [CampaignJson, setCampaignJson] = useState([])
    const [Amt, setAmt] = useState(0)

    async function handleRetrieve(){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Request accounts first
        const signer = provider.getSigner();
  
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
        const tx = await contractInstance.getCampaign(params.campaignID)
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
      const Campaign = await handleRetrieve()
      setCampaign(Campaign)

      const CampaignJson = {
            owner: Campaign[0],
            campaignName: Campaign[1],
            target: Campaign[2].toString(),
            deadline: Campaign[3].toString(),
            thumbnail: Campaign[4],
            collectedAmt: Campaign[5],
            donators: Campaign[6],
            donations: Campaign[7] 
          }
      setCampaignJson(CampaignJson)
    }

    fetchCampaigns();
    return () => {
      null
    }
  }, [])

  function handleNumChange(e){
    setAmt(e.target.value)
  }

  async function handleSubmit(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts first
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
      const donationAmt = ethers.utils.parseEther(Amt)
      console.log(donationAmt)
      const tx = await contractInstance.donateToCampaign(params.campaignID,{
        value: donationAmt
      });
      const receipt = await tx.wait()
      console.log("tx: ", tx)
      console.log("receipt: ", receipt)
      return(tx)
      // const campaignID = receipt.events[0].args[0]
      // window.alert("The campaign ID is: ", campaignID)
    }catch(e){
      window.alert(e)
      console.error(e)
    }
  }



  return (
    <div>
    <button onClick={() => navigate('/')} className='text-white border absolute top-1/20 left-1/30 p-2 rounded font-bold'>Go Back to Campaigns</button>
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
    <div className='flex flex-1 flex-col gap-4 items-center border border-white w-fit p-5 rounded-lg'>
      <p className='text-white'>{params.campaignID}</p>
      <p className='text-white'>{CampaignJson.owner}</p>
      <p className='text-white'>{CampaignJson.campaignName}</p>
      <p className='text-white'>{CampaignJson.target}</p>
      <p className='text-white'>{CampaignJson.deadline}</p>
      <p className='text-white'>{CampaignJson.thumbnail}</p>
      <input onChange={handleNumChange} className='placeholder-white border border-white p-2 text-white' placeholder='enter donation amt (ETH)' />
      <button className='text-white border p-2 cursor-pointer' onClick={handleSubmit}>donate</button>
      
    </div>
    </div>
    </div>

  )
}

export default DonatePage
