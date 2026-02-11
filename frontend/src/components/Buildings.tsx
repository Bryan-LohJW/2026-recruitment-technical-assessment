import type { BuildingData } from '../hooks/useStaticData'

const Building = (data: BuildingData) => {
	return (
		<div
			className={`cursor-pointer transition-transform duration-100 shadow active:scale-105 hover:shadow-2xl relative flex justify-between items-center md:flex-col-reverse md:items-end h-30 w-full rounded-xl overflow-hidden p-4 text-white font-semibold md:h-52 xl:h-104`}
		>
			<p className="md:bg-primary md:w-full md:h-14 md:flex md:items-center md:p-4 md:rounded-xl">
				{data.name}
			</p>
			<div className="flex items-center gap-4 bg-white text-black text-xs px-4 py-3 rounded-3xl">
				<div className="bg-green-600 h-3 w-3 rounded-full"></div>
				<div className="flex">
					<p>{data.rooms_total}</p>
					<p className="md:hidden">/{data.rooms_total}</p>
					<p
						className="hidden md:block"
						style={{ whiteSpace: 'pre' }}
					>
						{' '}
						rooms available
					</p>
				</div>
			</div>
			<div
				className="absolute top-0 left-0 w-full h-full bg-cover bg-center brightness-60 -z-10"
				style={{ backgroundImage: `url(${data.building_picture})` }}
			></div>
		</div>
	)
}

export default Building
