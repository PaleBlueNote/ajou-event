import { useNavigate, useParams } from 'react-router-dom'
import { GetRequestDetailCompanyApi } from '../../apis/history'
import { useEffect, useState } from 'react'
import Map from './Map'

const CompanyHistoryDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetRequestDetailCompanyApi(id)
        console.log(res)
        setData(res)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [id])

  return (
    <div className="p-4 my-3">
      <button
        className="text-gray-700 font-normal text-base rounded-md mx-[33%] mb-[2%]"
        onClick={() => {
          navigate(-1)
        }}
      >
        {'X CLOSE'}
      </button>
      {data && (
        <div className="max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-md">
          <div className="object-cover w-full h-52">
            <img
              className="object-cover w-full h-full"
              src={data.requestImageUrl}
              alt={data.materialName}
            />
          </div>
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">{data.materialName}</h2>
            <p className="mb-2 text-gray-600">User Name: {data.userName}</p>
            <p className="mb-2 text-gray-600">
              User Contact: {data.userContact}
            </p>
            <p className="mb-2 text-gray-600">
              Collection Area: {data.collectionArea}
            </p>
            <p className="mb-2 text-gray-600">
              Available Area: {data.availableArea}
            </p>
          </div>
          <div className="h-[200px] w-full mt-[20px]">
            <Map />
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyHistoryDetail
