import React, { useState } from 'react'

const HistoryModal = ({ isOpen, closeModal, onSave, modalType, requestId }) => {
  const [modalContent, setModalContent] = useState({
    expectedDate: "",
    expectedTime: "",
    cancelReason: "",
    points: 0
  })


  const handleSave = () => {
    onSave(modalContent)
    setModalContent({
      expectedDate: '',
      expectedTime: '',
      cancelReason: '',
      points: 0,
    })
    closeModal()
  }

  const renderModalContent = () => {
    switch (modalType) {
      case 'approved':
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold">
              Please fill expected date
            </h2>
            <label className="block mb-2">Select Date:</label>
            <input
              type="date"
              value={modalContent.expectedDate}
              onChange={(e) => setModalContent(prevState => ({...prevState, expectedDate: e.target.value}))}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <label className="block mb-2">Select Time:</label>
            <input
              type="time"
              value={modalContent.expectedTime}
              onChange={(e) => setModalContent(prevState => ({...prevState, expectedTime: e.target.value}))}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
          </>
        )
      case 'canceled':
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold">
              Please fill the reason of cancel
            </h2>
            <label className="block mb-2">Reason:</label>
            <textarea
              value={modalContent.cancelReason}
              onChange={(e) => setModalContent(prevState => ({...prevState, cancelReason: e.target.value}))}
              maxLength={100}
              placeholder="Enter your reason here"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
          </>
        )
      case 'completed':
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Please fill points</h2>
            <label className="block mb-2">Points:</label>
            <input
              type="number"
              value={modalContent.points}
              onChange={(e) => setModalContent(prevState => ({...prevState, points: e.target.value}))}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`fixed inset-0 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-10 w-1/3 p-6 bg-white">
        {renderModalContent()}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryModal
