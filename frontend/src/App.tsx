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

function App() {
	const [isIconOpen, setIsIconOpen] = useState(true)

	const selectedStyle = 'text-white bg-primary'
	const unselectedStyle = 'text-primary bg-white'

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
						className={`p-1 border border-primary rounded ${unselectedStyle} active:scale-110`}
					>
						<Search />
					</button>
					<button
						className={`p-1 border border-primary rounded ${selectedStyle} active:scale-110`}
					>
						<GridViewRounded />
					</button>
					<button
						className={`p-1 border border-primary rounded ${unselectedStyle} active:scale-110`}
					>
						<Map />
					</button>
					<button
						className={`p-1 border border-primary rounded ${unselectedStyle} active:scale-110`}
					>
						<DarkMode />
					</button>
				</div>
			</header>
			<nav className="flex flex-wrap px-2 justify-between my-4 gap-2">
				<button className="order-2 md:order-1 shrink-0 h-12 px-4 w-36 rounded-lg text-primary font-bold flex items-center gap-4 border-2 border-primary active:scale-110">
					<FilterAlt />
					<p>Filters</p>
				</button>
				<div className="order-1 md:order-2 w-full max-w-200 flex gap-4 border border-slate-300 text-gray-700 rounded-lg h-10 items-center p-6 md:w-1/2 focus-within:ring-2">
					<div className="">
						<Search />
					</div>
					<input
						className="flex-1 border-none outline-none"
						type="text"
						placeholder="Search for a building..."
					/>
				</div>
				<button className="order-3 shrink-0 h-12 px-4 w-36 rounded-lg text-primary font-bold flex items-center gap-4 border-2 border-primary active:scale-110">
					<FilterList />
					<p>Sort</p>
				</button>
			</nav>
		</>
	)
}

export default App
