import React from 'react'

const CompanyPointHistoryCard = ({ userName, receiveOrUse, point }) => {
  return (
    <div className="px-12 py-8 bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex">
          <h3 className="text-lg font-semibold">{userName ? userName : 'charge' }</h3>
        </div>
        <div className={receiveOrUse ? 'text-red-500' : 'text-green-500'}>
          {receiveOrUse ? <span>-</span> : <></>}
          {point}
        </div>
      </div>
    </div>
  )
}

export default CompanyPointHistoryCard
