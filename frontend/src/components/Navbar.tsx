import { Search, FilterAlt, FilterList } from '@mui/icons-material'

const Navbar = () => {
	return (
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
	)
}

export default Navbar
