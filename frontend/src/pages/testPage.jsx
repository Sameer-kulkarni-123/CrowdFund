import { useState } from 'react'


const TestPage = (props) => {

  return(
    <div>
      <h1>This is the address: {props.WalletAddress}</h1>
      <button onClick={props.connectWallet}>connect to metamask</button>
    </div>
  )
}

export default TestPage;