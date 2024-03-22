import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import TabBar from '../../components/TabBar'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductDetailApi } from '../../apis/products'
import { useStore } from '../../store/useStore'

const ProductDetail = () => {
  // const productData = {
  //   title: 'Frodo L Bag',
  //   company: 'nukak',
  //   price: 113.65,
  //   materials: 'Banner, tire inner tube, kite surfing sail',
  //   description: `Material: PVC Banner<br />Size: 80 X 310 X 90 (mm)<br />1. This bag is crafted by upcycling discarded advertising banners, and the bag straps are made from recycled safety belts. All materials are 100% waterproof.<br />2. Suitable for everyday activities and travel, this bag is particularly well-suited as a daily backpack, accommodating laptops up to 15 inches in size.<br />3. Features a front zipper pocket, an internal zipper pocket, and a Velcro pocket. Inside the bag, there is a separate compartment for storing tablets or notebooks.<br />4. For cyclists, the bag comes with additional straps to secure it while riding, and reflective 3M panels on both sides ensure a safe cycling experience.`,
  // }
  const { mode, points } = useStore()
  const navigate = useNavigate()
  const { id } = useParams()
  const [productData, setProductData] = useState({})
  const [isModalVisible, setModalVisible] = useState(false)
  const [userPoints, setUserPoints] = useState(points)

  const openModal = () => {
    setModalVisible(true)
  }

  // 모달 닫기 함수
  const closeModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductDetailApi(id)
        console.log(response)
        setProductData(response.data)
        console.log(productData)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className="p-12">
      <Navigation />
      <TabBar def={'products'} />
      <button
        className="mx-10 text-base font-normal text-black rounded-md"
        onClick={() => {
          navigate(-1)
        }}
      >
        {'< BACK'}
      </button>
      <div className="flex p-6 mt-8">
        <img
          src={productData.imageUrl}
          alt={productData.productName}
          className="object-contain w-2/5 mr-8 h-72 rounded-xl"
        />
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-light text-gray-500">
            {productData.companyName}
          </div>
          <div className="mb-4 text-3xl font-bold">
            {productData.productName}
          </div>
          <div className="mb-4 text-xl font-semibold text-red-500">{`$${productData.productPrice}`}</div>
          {mode === 'buyer' && (
            <button
              className="p-4 my-4 text-base font-semibold text-white bg-blue-500 rounded-md px-7 w-80"
              onClick={openModal}
            >
              BUY
            </button>
          )}
          {isModalVisible && (
            <PurchaseModal
              productPrice={productData.productPrice}
              userPoints={userPoints}
              closeModal={closeModal}
            />
          )}
          <div className="flex flex-row mt-10"></div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: productData.productDesc }}
        className="px-6 m-8 mt-12 text-sm font-light text-gray-700"
      ></div>
    </div>
  )
}

const PurchaseModal = ({ productPrice, closeModal, userPoints }) => {
  const maxPoint = userPoints
  const [localPoint, setLocalPoint] = useState(0)
  const [remainingAmount, setRemainAmount] = useState(productPrice - userPoints)
  const { setPoints, points } = useStore()

  useEffect(() => {
    setRemainAmount(productPrice - localPoint)
  }, [localPoint])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="w-1/2 p-6 bg-white rounded-lg">
        <p className="mb-4 text-xl">
          Product Price:{' '}
          <span className="font-semibold text-blue-500">${productPrice}</span>
        </p>

        {/* User Points Input */}
        <div className="flex mb-4 ">
          <label className="block pt-2 mb-2 text-gray-700 w-38">
            Points to be used
          </label>
          <input
            className="w-[20%] p-2 border rounded-md bg-gray-100 px-4 mx-3"
            type="number"
            value={localPoint}
            max={maxPoint}
            min="0"
            onChange={(e) => setLocalPoint(e.target.value)}
          />
          <div className="flex items-center justify-center text-center">
            / {maxPoint}p
          </div>
        </div>
        <hr />
        <p className="mt-6 mb-4 text-xl font-semibold">
          Total payment amount{' '}
          <span className="pl-2 font-bold text-red-500 ">
            ${remainingAmount}
          </span>
        </p>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 text-blue-500 border border-blue-500 rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            onClick={() => {
              if (localPoint > maxPoint) {
                alert('You have entered more points than are available.')
              } else {
                alert('Purchase completed')
                closeModal()
                setPoints(points - localPoint)
              }
            }}
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
