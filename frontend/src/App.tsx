import { useState } from 'react'
import freeRoomOpen from './assets/freeRoomsLogo.png'
import freeRoomClose from './assets/freeroomsDoorClosed.png'
import {
	Search,
	Map,
	GridViewRounded,
	DarkMode,
	FilterAlt,
	FilterList,
} from '@mui/icons-material'
import './App.css'
import type { Building } from './hooks/useStaticData'
import useStaticData from './hooks/useStaticData'

function App() {
	const [isIconOpen, setIsIconOpen] = useState(true)
	const selectedStyle = 'text-white bg-primary'
	const unselectedStyle = 'text-primary bg-white'

	const buildingData = useStaticData()

	return (
		<>
			<header className="w-full flex items-center justify-between border-b border-gray-400 px-2">
				<div className="flex items-center">
					<img
						src={isIconOpen ? freeRoomOpen : freeRoomClose}
						className="h-12 cursor-pointer"
						alt="logo"
						onClick={() => setIsIconOpen(!isIconOpen)}
					/>
					<h1 className="hidden md:block text-primary text-3xl font-medium">
						Freerooms
					</h1>
				</div>
				<div className="flex gap-2">
					<button
						className={`p-1 border border-primary rounded ${unselectedStyle} transition-transform duration-100 active:scale-110`}
					>
						<Search />
					</button>
					<button
						className={`p-1 border border-primary rounded ${selectedStyle} transition-transform duration-100 active:scale-110`}
					>
						<GridViewRounded />
					</button>
					<button
						className={`p-1 border border-primary rounded ${unselectedStyle} transition-transform duration-100 active:scale-110`}
					>
						<Map />
					</button>
					<button
						className={`p-1 border border-primary rounded ${unselectedStyle} transition-transform duration-100 active:scale-110`}
					>
						<DarkMode />
					</button>
				</div>
			</header>
			<nav className="flex flex-wrap px-2 justify-between mt-4 mb-2 gap-2">
				<button className="order-2 md:order-1 shrink-0 h-12 px-4 w-36 rounded-lg text-primary font-bold flex items-center gap-4 border-2 border-primary active:scale-110">
					<FilterAlt />
					<p>Filters</p>
				</button>
				<div className="transition-transform duration-100 order-1 md:order-2 w-full max-w-200 flex gap-4 border border-slate-300 text-gray-700 rounded-lg h-10 items-center p-6 md:w-1/2 focus-within:ring-2">
					<div className="">
						<Search />
					</div>
					<input
						className="flex-1 border-none outline-none"
						type="text"
						placeholder="Search for a building..."
					/>
				</div>
				<button className="transition-transform duration-100 order-3 shrink-0 h-12 px-4 w-36 rounded-lg text-primary font-bold flex items-center gap-4 border-2 border-primary active:scale-110">
					<FilterList />
					<p>Sort</p>
				</button>
			</nav>
			<div className="m-2 h-full grid grid-cols-1 gap-6">
				{buildingData.map((building) => (
					<Building key={building.name} {...building} />
				))}
			</div>
		</>
	)
}

export default App

const Building = (data: Building) => {
	return (
		<div
			className={`transition-transform duration-100 shadow active:scale-105 relative flex justify-between items-center h-30 w-full rounded-xl overflow-hidden p-4 text-white font-semibold`}
		>
			<p className="">{data.name}</p>
			<div className="flex items-center gap-4 bg-white text-black px-4 py-2 rounded-3xl text-sm">
				<div className="bg-green-600 h-3 w-3 rounded-full"></div>
				<p>
					{data.rooms_available}/{data.rooms_available}
				</p>
			</div>
			<div
				className="absolute top-0 left-0 w-full h-full bg-cover bg-center brightness-60 -z-10"
				style={{ backgroundImage: `url(${data.building_picture})` }}
			></div>
		</div>
	)
}
