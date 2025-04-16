import { ethers } from "ethers";

function FindTotalRaised(donations){
  if(donations && donations.length > 0){
    // var sum = 0;
    let sum = ethers.BigNumber.from(0);
    donations.forEach(num => {
      sum = sum.add(num) 
    })
    return sum;
  }else{
    return 0;
  }


  }

export default FindTotalRaised