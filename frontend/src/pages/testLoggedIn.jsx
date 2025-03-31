import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../constants/constants'

function TestLoggedIn(props) {
  const Account = props.WalletAddress
  const [Campaign, setCampaign] = useState("")
  const [Deadline, setDeadline] = useState("")
  const [Target, setTarget] = useState(null)
  const [ Thumbnail, setThumbnail ] = useState("abcdefg")



  function handleCampaignChange(e) {
    setCampaign(e.target.value)
  }

  function handleDeadlineChange(e){

    setDeadline(Math.floor(new Date(e.target.value).getTime() / 1000))
  }

  function handleTargetChange(e){
    setTarget(e.target.value)
  }


  async function handleSubmit(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts first
      const signer = provider.getSigner();

      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer )
      const tx = await contractInstance.createCampaign(Account, Campaign, Number(Target), Number(Deadline), Thumbnail)
      const tx1 = await contractInstance.numberOfCampaigns()
      const receipt = await tx.wait()
      console.log("tx: ", tx)
      console.log("tx1: ", tx1)
      // console.log("receipt: ", receipt)
      // const campaignID = receipt.events[0].args[0]
      // window.alert("The campaign ID is: ", campaignID)
    }catch(e){
      window.alert(e)
      console.error(e)
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
      <h1>you are logged in!!!! as {props.WalletAddress}</h1>  
      <label>enter campaign name: {Campaign}</label>
      <input title='' placeholder='enter campaign name' onChange={handleCampaignChange}/>
      <br/>
      <label>enter deadline in yyyy-mm-dd:  {Deadline}</label>
      <input title='' placeholder='enter campaign deadline in yyyy-mm-dd' onChange={handleDeadlineChange}/>
      <br/>
      <label>Target fund: {Target}</label>
      <input title='' placeholder='enter target fund' onChange={handleTargetChange}/>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
      <br/>
      <button onClick={handleRetrieve}>retrieve</button>
      <br/>
      <button onClick={handleNumberOfCampaigns}>NUmberOfCampaigns</button>
    </div>
  )
}

export default TestLoggedIn
