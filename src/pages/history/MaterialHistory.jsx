import Navigation from '../../components/Navigation'
import HistoryCard from './HistoryCard'
import { useNavigate } from 'react-router-dom'
import HistoryModal from '../../components/HistoryModal'
import React, { useState, useEffect } from 'react'
import {
  GetAllRequestCompanyApi,
  ChangeRequestStateCompanyApi,
  GetAllRequestConsumerApi,
  CancelRequestConsumerApi,
} from '../../apis/history'
import { useStore } from '../../store/useStore'
import BuyerHistoryCard from './BuyerHistoryCard'

const MaterialHistory = () => {
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [requestId, setRequestId] = useState(null)
  const [historyData, setHistoryData] = useState([])
  const [updateData, setUpdateData] = useState({
    requestId: 0,
    collectionState: '',
    expectedDate: '',
    expectedTime: '',
    cancelReason: '',
    points: 0,
  })
  const { mode, userData } = useStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          mode === 'seller'
            ? await GetAllRequestCompanyApi(1)
            : await GetAllRequestConsumerApi(1)
        // console.log(response)
        setHistoryData(response)
      } catch (error) {
        console.error('Error fetching material details:', error)
      }
    }

    fetchData()
  }, [])

  const openModal = (type, requestId) => {
    setModalType(type)
    setModalIsOpen(true)
    setRequestId(requestId)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setModalType('')
    setRequestId(null)
  }

  const onSave = (content) => {
    console.log('content.cancelReason:' + content.points)
    if (content.expectedDate && content.expectedTime) {
      setUpdateData((prevState) => ({
        ...prevState,
        collectionState: modalType,
        requestId: requestId,
        expectedDate: content.expectedDate,
        expectedTime: content.expectedTime,
      }))
    } else if (content.points > 0) {
      console.log('points')
      setUpdateData((prevState) => ({ ...prevState, points: content.points }))
    } else if (content.cancelReason) {
      setUpdateData((prevState) => ({
        ...prevState,
        collectionState: modalType,
        requestId: requestId,
        cancelReason: content.cancelReason,
      }))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('check')
        mode === 'seller'
          ? ChangeRequestStateCompanyApi({ params: updateData })
              .then(() => {
                GetAllRequestCompanyApi(userData.id)
                  .then((response) => {
                    setHistoryData(response)
                  })
                  .catch((error) => {
                    console.error('Error fetching material details:', error)
                  })
              })
              .catch((error) => {
                console.error('Error changing request state:', error)
              })
          : CancelRequestConsumerApi({ params: updateData })
              .then(() => {
                GetAllRequestConsumerApi(userData.id)
                  .then((response) => {
                    setHistoryData(response)
                  })
                  .catch((error) => {
                    console.error('Error fetching material details:', error)
                  })
              })
              .catch((error) => {
                console.error('Error changing request state:', error)
              })
      } catch (error) {
        console.error('Error fetching material details:', error)
      }
    }

    if (
      updateData.cancelReason ||
      (updateData.expectedDate && updateData.expectedTime) ||
      updateData.points > 0
    )
      fetchData()
  }, [updateData])

  return (
    <div>
      <Navigation />
      <button
        className="mx-16 mt-2 text-base font-normal text-gray-800 rounded-md"
        onClick={() => {
          navigate(-1)
        }}
      >
        {'< BACK'}
      </button>
      <div className="max-w-screen p-6 mt-[3%] mx-[12%]">
        <h1 className="mb-6 text-3xl font-semibold">Material History</h1>
        {historyData &&
          historyData.map((historyItem) =>
            mode === 'seller' ? (
              <HistoryCard
                key={historyItem.requestId}
                historyItem={historyItem}
                openModal={openModal}
              />
            ) : (
              <BuyerHistoryCard
                key={historyItem.requestId}
                historyItem={historyItem}
                openModal={openModal}
              ></BuyerHistoryCard>
            ),
          )}
      </div>
      <HistoryModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        onSave={onSave}
        modalType={modalType}
        requestId={requestId}
      ></HistoryModal>
    </div>
  )
}
export default MaterialHistory
