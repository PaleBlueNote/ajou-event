import { useNavigate } from 'react-router-dom'
export default function MaterialCard({ material }) {
  const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/material/detail/${material.materialId}`)
  }
  return (
    <div
      key={material.materialId}
      className="relative border shadow-md rounded-2xl group"
      onClick={handleCardClick}
    >
      <div className="w-full overflow-hidden bg-gray-200 rounded-t-2xl aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={material.imageUrl}
          alt={material.materialName + material.materialId}
          className="object-cover object-center w-full h-full border-b-2 lg:h-full lg:w-full"
        />
      </div>
      <div className="pb-3">
        <div className="flex items-center justify-between mt-4">
          <div className="flex w-1/2 h-full">
            <h3 className="ml-4 text-base font-semibold text-gray-700">
              <div>
                <span aria-hidden="true" className="absolute inset-0" />
                {material.materialName}
              </div>
            </h3>
          </div>
          <div className="flex items-center justify-end w-1/2 h-full">
            <p className="text-xl font-bold text-[#5ED127] mr-2">
              {material.pointsPerWeight}
            </p>
            <p className="mr-5 text-gray-900 text-[12px]">/ 1kg</p>
          </div>
        </div>
      </div>
    </div>
  )
}
