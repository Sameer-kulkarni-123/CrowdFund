import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { contractAddress, contractABI } from '../constants/constants'
import { ethers } from 'ethers'
import FindTotalRaised from '../utils/findTotalRaised'

const DonatePage = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [CampaignJson, setCampaignJson] = useState({})
  const [Amt, setAmt] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  async function handleRetrieve() {
    try {
      setIsLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)
      const tx = await contractInstance.getCampaign(params.campaignID)

      const CampaignJson = {
        owner: tx[0],
        campaignName: tx[1],
        target: ethers.utils.formatEther(tx[2]),
        deadline: new Date(Number(tx[3]) * 1000).toLocaleDateString(),
        thumbnail: tx[4],
        collectedAmt: tx[5],
        donators: tx[6],
        donations: tx[7]
      }

      setCampaignJson(CampaignJson)
    } catch (e) {
      window.alert(e)
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleRetrieve()
  }, [])

  function handleNumChange(e) {
    if (e.target.value >= 0) {
      setAmt(e.target.value)
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)

      const donationAmt = ethers.utils.parseEther(Amt)
      const tx = await contractInstance.donateToCampaign(params.campaignID, { value: donationAmt })
      await tx.wait()
      alert("Donation successful!")
      handleRetrieve()
    } catch (e) {
      window.alert(e.message)
      console.error(e)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 relative">
      {/* LOADING OVERLAY */}
      {/* {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )} */}
      {isLoading && (
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="text-white text-xl animate-pulse">Donating to campaign... Please wait</div>
      </div>
    )}

      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        ← Back to Campaigns
      </button>

      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg space-y-4 z-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Donate to Campaign</h1>

        <div className="space-y-2">
          <p><span className="font-semibold">Campaign ID:</span> {params.campaignID}</p>
          <p><span className="font-semibold">Owner:</span> {CampaignJson.owner}</p>
          <p><span className="font-semibold">Name:</span> {CampaignJson.campaignName}</p>
          <p><span className="font-semibold">Target:</span> {CampaignJson.target} ETH</p>
          <p><span className="font-semibold">Collected:</span> {ethers.utils.formatEther(FindTotalRaised(CampaignJson.donations))} ETH</p>
          <p><span className="font-semibold">Deadline:</span> {CampaignJson.deadline}</p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <input
            type="number"
            placeholder="Enter donation amount (ETH)"
            onChange={handleNumChange}
            value={Amt}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 placeholder-gray-400"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-bold cursor-pointer"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  )
}

export default DonatePage
