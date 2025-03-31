import { React, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from './constants/constants'
// import  './App.css'
import TestPage from './pages/testPage'
import TestLoggedIn from './pages/testLoggedIn'
import OnBoardingPage from './pages/onBoardingPage'
import HomePage from './pages/homePage'
import { useNavigate } from 'react-router-dom'
import "./App.css"

const App = () => {
  const navigate = useNavigate();
  
  const [Provider, setProvider] = useState(null)
  const [Account, setAccount] = useState(null)
  const [isConnected, setisConnected] = useState(false)

  useEffect(() => {
    if(window.ethereum){
      window.ethereum.on('accountsChanged', handleAccountChanged);
    }
  
    return () => {
      if(window.ethereum){
        window.ethereum.removeListener('accountsChanged', handleAccountChanged);
      }
    }
  }, []);

  function handleAccountChanged(accounts){
    if(accounts.length > 0 && Account !== accounts[0]){
      setAccount(accounts[0])
    }else{
      setisConnected(false);
      setAccount(null);
    }
  }
  
  
  async function connectToMetamask(){
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        const accountsReturned = await provider.send("eth_requestAccounts", []);
        // const signers = provider.getSigner();
        // const address = await signers.getAddress();
        // console.log("metamask is connected: ", address);
        setAccount(accountsReturned[0])
        setisConnected(true);
        // navigate("/homepage")

      }catch(e) {console.error(e)}
    }
    else{
      window.alert("You do not have Metamask installed");
    }
  }



  return(
    <div className="root-div">
      { isConnected ? (<HomePage signedInAccount={Account}/>) : (<OnBoardingPage account={Account} handleClick={connectToMetamask}/>)}
      {/* <OnBoardingPage account={Account} handleClick={connectToMetamask}/> */}
    </div>
  )
}

export default App