import React from 'react'
import './OnBoardingPage.css'

function OnBoardingPage(props) {
  return (
    <div className='on-board-container'>
      <div className='head-container'>
        <h2>Welcome to CrowdFund</h2> 
        <h3>The Crowd Funding website powered by blockchain</h3>
        <p>{props.account}</p>
      </div>
      <button className='connect-to-mm-btn' onClick={props.handleClick}>Connect to Metamask</button>
    </div>
  )
}

export default OnBoardingPage
