import Navigation from '../../components/Navigation'
import TabBar from '../../components/TabBar'
import SearchBar from '../../components/SearchBar'
import MaterialCard from './MaterialCard'
import React, { useState, useEffect } from 'react'
import { GetAllMaterialsApi, MaterialSearchApi } from '../../apis/materials'

export default function MaterialMain() {
  const [materials, setMaterials] = useState([])
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    console.log('Keyword changed:', keyword)
  }, [keyword])
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        if (keyword === '') {
          response = await GetAllMaterialsApi()
        } else {
          console.log("key", keyword)
          response = await MaterialSearchApi(keyword)
        }

        setMaterials(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [keyword])

  return (
    <div>
      <div className="p-12 text-4xl font-bold">
        <Navigation />
        <TabBar def={'material'} />
        <SearchBar currentPage={'material'} setKeyword={setKeyword} />
        <div className="max-w-2xl px-4 py-4 mx-auto sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {materials?.map((material) => (
              <MaterialCard
                key={material.materialId}
                material={material}
              ></MaterialCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
