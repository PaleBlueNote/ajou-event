import React from 'react'
import { useNavigate } from 'react-router-dom'

const BuyerHistoryCard = ({ historyItem, openModal }) => {
  const badgeColor = (state) => {
    switch (state) {
      case 'applied':
        return 'bg-yellow-500 text-white'
      case 'approved':
        return 'bg-green-500 text-white'
      case 'canceled':
        return 'bg-red-500 text-white'
      case 'completed':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }
  const navigate = useNavigate()
  const handleClick = (e) => {
    if (!e.target.closest('button')) {
      navigate(`/history/consumer/${historyItem.requestId}`)
    }
  }
  const renderButtons = (state) => {
    switch (state) {
      case 'applied':
        return (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                openModal('canceled', historyItem.requestId)
              }}
              className="w-full px-4 py-2 my-2 text-white bg-red-500 rounded-md"
            >
              Cancel
            </button>
            {/* <button
              onClick={() => {}}
              className="w-full px-4 py-2 my-2 mb-2 text-white bg-blue-500 rounded-md"
            >
              Edit
            </button> */}
          </>
        )
      case 'approved':
        return (
          <button
            onClick={(e) => {
              e.stopPropagation()
              openModal('canceled', historyItem.requestId)
            }}
            className="w-full px-4 py-2 my-2 text-white bg-red-500 rounded-md"
          >
            Cancel
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div
      onClick={handleClick}
      className="p-4 my-6 bg-white border border-gray-200 rounded-md shadow-md"
    >
      <div className="relative flex flex-row">
        <img
          src={historyItem.imageUrl}
          alt={historyItem.companyName}
          className="object-cover h-32 my-1 ml-2 rounded-md w-44 mr-7"
        />
        <div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">
                {historyItem.materialName}
              </h2>
              <p
                className={` mx-5 px-5 rounded-md ${badgeColor(historyItem.collectionState)}`}
              >
                {`${historyItem.collectionState}`}
              </p>
            </div>
            {historyItem.collectionState === 'approved' && (
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-500">{`Expected Date: ${historyItem.expectedDate} /  Time: ${historyItem.expectedTime}`}</p>
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-600">{`Quantity of Material: ${historyItem.quantityOfMaterial}g`}</p>
              {historyItem.collectionState === 'completed' && (
                <p className="ml-6 font-normal text-blue-600">{`Points: ${historyItem.points} P`}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              {historyItem.collectionState === 'canceled' ? (
                <p className="text-gray-600">{`Cancel Reason: ${historyItem.cancelReason}`}</p>
              ) : (
                <p className="text-gray-600">{`Collection Area: ${historyItem.collectionArea}`}</p>
              )}
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-[13px]">{`${historyItem.userName} / ${historyItem.companyContact}`}</p>
            </div>
          </div>
        </div>
        <div className="absolute flex flex-col w-44 right-2 top-2">
          {renderButtons(historyItem.collectionState)}
        </div>
      </div>
    </div>
  )
}

export default BuyerHistoryCard
