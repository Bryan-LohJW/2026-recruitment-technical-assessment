import { useState } from 'react'
import { Search, Map, GridViewRounded, DarkMode } from '@mui/icons-material'
import freeRoomOpen from '../assets/freeRoomsLogo.png'
import freeRoomClose from '../assets/freeroomsDoorClosed.png'

const Header = () => {
	const [isIconOpen, setIsIconOpen] = useState(true)
	const selectedStyle = 'text-white bg-primary'
	const unselectedStyle = 'text-primary bg-white'

	return (
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
	)
}

export default Header
