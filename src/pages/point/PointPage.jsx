// PointPage.js

import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import UserPointHistoryCard from './UserPointHistoryCard'
import { useStore } from '../../store/useStore'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { UserPointHistoryApi, CompanyPointHistoryApi } from '../../apis/point'
import CompanyPointHistoryCard from './CompanyPointHistoryCard'

const PointPage = () => {
  const { points, userData, mode, setPoints } = useStore()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [chargePoints, setChargePoints] = useState('')
  const [pointHistory, setPointHistory] = useState([])

  useEffect(() => {
    const fetchPointHistory = async () => {
      try {
        const id = userData.id
        if (mode === 'seller') {
          const historyData = await CompanyPointHistoryApi({
            params: { companyId: id },
          })
          setPointHistory(historyData)
        } else if (mode === 'buyer') {
          const historyData = await UserPointHistoryApi({
            params: { userId: id },
          })

          setPointHistory(historyData)
          console.log('HistoryData:' + historyData)
        } else {
          console.error('Not expected mode')
        }
      } catch (error) {
        console.error('Error fetching point history:', error)
      }
    }

    fetchPointHistory()
  }, [userData.id])
  const openModal = () => {
    setModalIsOpen((prev) => !prev)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleChargePoints = () => {
    if (chargePoints) {
      setPoints(points + parseFloat(chargePoints))
      setChargePoints('')
      closeModal()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setChargePoints(value)
  }

  const navigate = useNavigate()
  return (
    <div className="p-12">
      <Navigation />

      <div className="p-24 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="pl-2 my-3 mr-4 text-sm text-gray-400 font-base"
        >
          {'< BACK'}
        </button>
        <div className="flex m-2 text-xl font-base">
          <h1 className="">My Page</h1>
          <h1 className="px-4">{'>'}</h1>
          <h1 className="">Points</h1>
        </div>
        <div className="flex mt-4">
          <div className="w-2/5 pr-12 border-r">
            {/* 세로 선 좌측 */}
            <div className="mb-4">
              <div className="p-8 my-4 bg-gray-100 shadow-md rounded-xl">
                <p className="text-lg font-semibold">TOTAL POINTS</p>
                <p className="pt-4 text-3xl font-bold text-right text-blue-600">
                  {pointHistory && pointHistory[0] && pointHistory[0].totalPoint
                    ? `${pointHistory[0].totalPoint} P`
                    : '0'}
                </p>
              </div>
              {mode === 'seller' && (
                <button
                  onClick={openModal}
                  className="w-full h-16 p-2 mt-4 text-lg font-semibold text-white bg-blue-500 shadow-md rounded-xl"
                >
                  Charge Points
                </button>
              )}
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="Modal p-[25%]"
              contentLabel="Charge Points Modal"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Charge Points</h2>
                <button className="text-xl font-bold" onClick={closeModal}>
                  X
                </button>
              </div>
              <input
                type="number"
                placeholder="Enter points to charge"
                value={chargePoints}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <button
                className="p-2 text-white bg-blue-500 rounded-md"
                onClick={handleChargePoints}
              >
                Charge
              </button>
            </Modal>
          </div>
          <div className="w-3/5 pl-12">
            <h2 className="mb-4 text-lg font-semibold">Point History</h2>
            <div className="flex flex-col gap-4">
              {pointHistory &&
                mode === 'buyer' &&
                pointHistory.map((historyItem, index) => (
                  <UserPointHistoryCard
                    key={index}
                    productName={historyItem.productName}
                    companyName={historyItem.companyName}
                    receiveOrUse={historyItem.receiveOrUse}
                    point={historyItem.point.toString()}
                  />
                ))}
              {pointHistory &&
                mode === 'seller' &&
                pointHistory.map((historyItem, index) => (
                  console.log("dpd", historyItem),
                  <CompanyPointHistoryCard
                    key={index}
                    userName={historyItem.userName}
                    receiveOrUse={historyItem.chargeOrPay}
                    point={historyItem.point.toString()}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointPage
