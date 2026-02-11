import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Building from './components/Buildings'
import useStaticData from './hooks/useStaticData'

function App() {
	const buildingData = useStaticData()

	return (
		<>
			<Header />
			<Navbar />
			<div className="m-2 h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
				{buildingData.map((building) => (
					<Building key={building.name} {...building} />
				))}
			</div>
		</>
	)
}

export default App
