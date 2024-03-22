import { useNavigate } from 'react-router-dom'

const ProductCard = ({ id, title, company, image, price }) => {
  const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/product/detail/${id}`)
  }
  return (
    <div className="m-4 border rounded-2xl" onClick={handleCardClick}>
      <img src={image} alt={title} className="object-contain w-full h-44" />
      <div className="px-8 py-5">
        <div className="text-sm font-light text-gray-500">{company}</div>
        <div className="flex">
          <div className="w-1/2 text-lg font-bold">{title}</div>
          <div className="w-1/2 text-xl font-semibold text-right text-red-500">{`$${price}`}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
