import React from 'react'
import "./campaignCard.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function CampaignCard(props) {
  const navigate = useNavigate()
  return (
    <Link to={`/donate/${props.campaignID}`}>
    <div className='campaignCard'>
      <img src='https://picsum.photos/300/200'/>
      <div className='content'>
        <p>{props.campaignName}</p>
        <div className='target-and-deadline-con'>
          <div className='target-con'>
            <p>{props.totalMoneyRaised} ETH</p>
            <p1>{props.target} ETH</p1>
          </div>
          <div className='deadline-con'>
            <p>{props.timeToDeadline}</p>
            <p1>days left</p1>
          </div>
        </div>
        <p className='owner-p'>by {props.owner}</p>
      </div>
    </div> 
    </Link>
  )
}

// function CampaignCard(props) {
//   return (
//    <div className='campaignCard'>
//     <img src='https://picsum.photos/300/200'/>
//     <div className='content'>
//       <p>campaignName</p>
//       <div className='target-and-deadline-con'>
//         <div className='target-con'>
//           <p>totMnRzd</p>
//           <p1>trgtMn</p1>
//         </div>
//         <div className='deadline-con'>
//           <p>dedline</p>
//           <p1>days left</p1>
//         </div>
//       </div>
//       <p>by addOfOwn</p>
//     </div>
//    </div> 
//   )
// }

export default CampaignCard
