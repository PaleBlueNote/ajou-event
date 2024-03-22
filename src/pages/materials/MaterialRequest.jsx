import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MaterialRegistrationApi } from '../../apis/materials'
import { useStore } from '../../store/useStore'

export default function MaterialRequest() {
  const navigate = useNavigate()
  const { userData } = useStore()

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [condition, setCondition] = useState('')
  const [pointsPerWeight, setPointsPerWeight] = useState('')
  const [restrictedArea, setRestrictedArea] = useState('')
  const [availableArea, setAvailableArea] = useState('')
  const [image, setImage] = useState()

  const handleSubmit = async (e) => {
    const newProduct = {
      companyId: userData.id,
      materialName: name,
      minimumQuantity: parseInt(quantity),
      expectedCondition: condition,
      productId: 3,
      pointsPerWeight: parseInt(pointsPerWeight),
      restrictedArea,
      availableArea,
      multipartFile: image,
    }
    try {
      console.log('new: ', newProduct)
      const res = await MaterialRegistrationApi(newProduct)

      if (res === 200) {
        alert('Material Request has been completed')
        setName('')
        setQuantity('')
        setCondition('')
        setPointsPerWeight('')
        setRestrictedArea('')
        setAvailableArea('')
        setImage(null)
        navigate(-1)
      } else {
        console.error('Unexpected status code:', res)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div>
      <div className="max-w-screen p-6 mt-5 mx-[20%]  bg-white rounded-md">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 my-3 mr-4 font-semibold text-gray-800 rounded-md text-md"
          >
            {'< BACK'}
          </button>
          <h1 className="mb-6 text-3xl font-semibold ">
            Write Material Request
          </h1>
        </div>
        <div className="p-10 border border-gray-100 rounded-lg shadow-md">
          <div className="flex mb-4">
            <label className="block mb-2 text-gray-700 w-52">
              Material Name
            </label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex mb-4">
            <label className="block mb-2 text-gray-700 w-52">
              Minimum Quantity(g)
            </label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex mb-4">
            <label className="block mb-2 text-gray-700 w-52">
              Expected Condition
            </label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          <div className="flex mb-4">
            <label className="block mb-2 text-gray-700 w-52">
              Points Per 100g
            </label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="number"
              value={pointsPerWeight}
              onChange={(e) => setPointsPerWeight(e.target.value)}
            />
          </div>
          <div className="flex mb-10">
            <label className="block mb-2 text-gray-700 w-52">Image</label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <hr />

          <div className="flex mt-10 mb-4">
            <label className="block mb-2 text-gray-700 w-52">
              Restricted Area
            </label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="text"
              value={restrictedArea}
              onChange={(e) => setRestrictedArea(e.target.value)}
            />
          </div>
          <div className="flex mb-4">
            <label className="block mb-2 text-gray-700 w-52">
              Available Area
            </label>
            <input
              className="w-full p-2 bg-gray-200 border rounded-md"
              type="text"
              value={availableArea}
              onChange={(e) => setAvailableArea(e.target.value)}
            />
          </div>
          <button
            className="w-full p-3 mt-5 text-white bg-blue-500 rounded-md"
            type="button"
            onClick={handleSubmit}
          >
            Write Request
          </button>
        </div>
      </div>
    </div>
  )
}
