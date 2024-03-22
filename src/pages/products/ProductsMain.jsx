import Navigation from '../../components/Navigation'
import TabBar from '../../components/TabBar'
import SearchBar from '../../components/SearchBar'
import ProductCard from './ProductCard'
import { GetAllProductsApi, ProductSearchApi } from '../../apis/products'
import { useEffect, useState } from 'react'

const ProductsMain = () => {
  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        if (keyword === '') {
          response = await GetAllProductsApi()
        } else {
          response = await ProductSearchApi(keyword)
        }
        console.log("res", response)
        setProducts(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [keyword])

  return (
    <div>
      <div className="p-12">
        <Navigation />
        <div className="relative flex">
          <TabBar def={'products'} />
        </div>
        <SearchBar currentPage={'products'}  setKeyword={setKeyword} />

        <div className="grid grid-cols-3 gap-[3%] mt-16 px-20">
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              id={product.productId}
              title={product.productName}
              company={'ToadHouse'}
              image={product.imageUrl}
              price={product.productPrice}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsMain
