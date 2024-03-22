import Navigation from '../components/Navigation'
import TabBar from '../components/TabBar'
import SearchBar from '../components/SearchBar'

const Main = () => {
  return (
    <>
      <div className="p-12">
        <Navigation />
        <TabBar />
        <SearchBar />
      </div>
    </>
  )
}

export default Main
