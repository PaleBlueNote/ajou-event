import { useNavigate } from 'react-router-dom'
import { ProductRegistrationApi } from '../../apis/products'
import React from 'react'



const ProductUpload = () => {
  
  const navigate = useNavigate()

  // 입력 값 상태 관리
  const [productName, setProductName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [image, setImage] = React.useState()

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    const newProduct = {
      productName: productName,
      productPrice: parseInt(price),
      productDesc: description,
      image,
      companyId: 1,
    }
    if(image){
        console.log(newProduct)
        const res = await ProductRegistrationApi(newProduct)
        
        if(res === 200){
          alert("Product registration has been completed");
          setProductName('')
          setPrice('')
          setDescription('')
          setImage(null)
          navigate(-1);
        }

    }
    
  }

  return (
    <div>
      <div className="max-w-screen p-6 mt-16 mx-[20%] bg-white rounded-md">
        <div>
          <button
            onClick={() => navigate(-1)}
            className=" text-gray-800 my-3 text-md font-semibold p-2 rounded-md mr-4"
          >
            {'< BACK'}
          </button>
          <h1 className="text-3xl font-semibold mb-10 ">ADD NEW PRODUCT</h1>
        </div>
        <div className="border-gray-400 shadow-md p-10 rounded-lg">
          <p className="mb-7 text-gray-400">product information</p>

          <form>
            <div className="mb-4 flex">
              <label className="block text-gray-700 mb-2 w-44">
                Product Name
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700 mb-2 w-44">Price</label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700 mb-2 w-44">
                Description
              </label>
              <textarea
                className="w-full p-2 border rounded-md bg-gray-200 h-44"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4 flex">
              <label className="block text-gray-700 mb-2 w-44">Image</label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                type="file"
                accept="image/*"
                required={true}
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white p-3 rounded-md mt-10"
              type="button"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductUpload
