import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../constants/constants'
import { useNavigate } from "react-router-dom"

function CreateCampaignPage(props) {
  const navigate = useNavigate();
  // const Account = props.WalletAddress
  const [Campaign, setCampaign] = useState("")
  const [Deadline, setDeadline] = useState("")
  const [Target, setTarget] = useState(null)
  const [ Thumbnail, setThumbnail ] = useState("abcdefg")
  const [isLoading, setIsLoading] = useState(false);




  function handleCampaignChange(e) {
    setCampaign(e.target.value)
  }

  function handleDeadlineChange(e){

    setDeadline(Math.floor(new Date(e.target.value).getTime() / 1000))
  }

  function handleTargetChange(e){
    setTarget(e.target.value)
  }


  // async function handleSubmit(){
  //   try{
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []); // Request accounts first
  //     const signer = provider.getSigner();
  //     const Account = signer.getAddress();

  //     const targetInWei = ethers.utils.parseEther(Target);

  //     const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
  //     const tx = await contractInstance.createCampaign(Account, Campaign, targetInWei, Number(Deadline), Thumbnail)
  //     const tx1 = await contractInstance.numberOfCampaigns()
  //     const receipt = await tx.wait()
  //     console.log("tx: ", tx)
  //     console.log("tx1: ", tx1)
  //     // console.log("receipt: ", receipt)
  //     // const campaignID = receipt.events[0].args[0]
  //     // window.alert("The campaign ID is: ", campaignID)
  //   }catch(e){
  //     window.alert(e)
  //     console.error(e)
  //   }

  // }

  async function handleSubmit() {
    setIsLoading(true); // Start loading
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const Account = await signer.getAddress(); // <-- don't forget the await here
  
      const targetInWei = ethers.utils.parseEther(Target);
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
  
      const tx = await contractInstance.createCampaign(Account, Campaign, targetInWei, Number(Deadline), Thumbnail);
      const receipt = await tx.wait();
  
      console.log("tx: ", tx);
      console.log("receipt: ", receipt);
  
      window.alert("Campaign created successfully!");
  
      // optionally: navigate back to homepage
      navigate('/');
    } catch (e) {
      window.alert(e.message);
      console.error(e);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }
  

  async function handleRetrieve(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts first
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
      const tx = await contractInstance.getCampaigns()
      // const receipt = await tx.wait()
      console.log("tx: ", tx)
      // console.log("receipt: ", receipt)
      // const campaignID = receipt.events[0].args[0]
      // window.alert("The campaign ID is: ", campaignID)
    }catch(e){
      window.alert(e)
      console.error(e)
    }

  }

  async function handleNumberOfCampaigns(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts first
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
      const tx = await contractInstance.numberOfCampaigns()
      // const receipt = await tx.wait()
      console.log("NumebrOfCampaigns: ", tx)
      // console.log("receipt: ", receipt)
      // const campaignID = receipt.events[0].args[0]
      // window.alert("The campaign ID is: ", campaignID)
    }catch(e){
      window.alert(e)
      console.error(e)
    }

  }

  return (
    <div>
    <button onClick={() => navigate('/')} className='text-white border absolute top-1/20 left-1/30 p-2 rounded font-bold cursor-pointer'>Go Back to Campaigns</button>
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
    <div className='flex flex-1 flex-col gap-4 items-center border border-white w-fit p-5 rounded-lg'>
      <div>
        <p className='text-white text-3xl'>Create Campaign</p>
      </div>
      <div className='flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-2'>
          <label className='text-white'>Campaign Name</label>
          <input className='border border-white rounded placeholder-white text-white' title='' placeholder='' onChange={handleCampaignChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-white'>Target You want to achieve (in ETH)</label>
          <input className='border border-white rounded placeholder-white text-white' title='' placeholder='' onChange={handleTargetChange}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-white'>Deadline of you campaign (format: yyyy-mm-dd)</label>
          <input className='border border-white rounded placeholder-white text-white' title='' placeholder='' onChange={handleDeadlineChange}/>
        </div>
      </div>
      <div>
        {/* <button className='text-white'>Submit</button> */}
        <button className='text-white border border-white p-2 pl-5 pr-5 rounded cursor-pointer' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </div>
    {isLoading && (
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="text-white text-xl animate-pulse">Creating campaign... Please wait</div>
      </div>
    )}
    </div>

    
    // <div>
    //   <h1>you are logged in!!!! as {props.WalletAddress}</h1>  
    //   <label>enter campaign name: {Campaign}</label>
    //   <input title='' placeholder='enter campaign name' onChange={handleCampaignChange}/>
    //   <br/>
    //   <label>enter deadline in yyyy-mm-dd:  {Deadline}</label>
    //   <input title='' placeholder='enter campaign deadline in yyyy-mm-dd' onChange={handleDeadlineChange}/>
    //   <br/>
    //   <label>Target fund: {Target}</label>
    //   <input title='' placeholder='enter target fund' onChange={handleTargetChange}/>
    //   <br/>
    //   <button onClick={handleSubmit}>Submit</button>
    //   <br/>
    //   <button onClick={handleRetrieve}>retrieve</button>
    //   <br/>
    //   <button onClick={handleNumberOfCampaigns}>NUmberOfCampaigns</button>
    // </div>
  )
}

export default CreateCampaignPage;

