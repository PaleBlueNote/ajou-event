import Navigation from '../components/Navigation'
import TabBar from '../components/TabBar'
import SearchBar from '../components/SearchBar'

const Material = () => {
  return (
    <div>
      <div className="p-12">
        <Navigation />
        <TabBar def={'material'} />
        <SearchBar currentPage={'material'} />
      </div>
    </div>
  )
}

export default Material
