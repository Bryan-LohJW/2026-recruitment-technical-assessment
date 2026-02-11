export type Building = {
	name: string
	rooms_total: number
	building_picture: string
}

const useStaticData = (): Building[] => {
	return [
		{
			name: 'AGSM',
			rooms_total: 9,
			building_picture: '/agsm.webp',
		},
		{
			name: 'Ainsworth Building',
			rooms_total: 16,
			building_picture: '/ainsworth.webp',
		},
		{
			name: 'Anita B Lawrence Centre',
			rooms_total: 44,
			building_picture: '/anitab.webp',
		},
		{
			name: 'Biological Sciences',
			rooms_total: 6,
			building_picture: '/biologicalScience.webp',
		},
		{
			name: 'Biological Science (West)',
			rooms_total: 8,
			building_picture: '/biologicalScienceWest.webp',
		},
		{
			name: 'Blockhouse',
			rooms_total: 42,
			building_picture: '/blockhouse.webp',
		},
		{
			name: 'Business School',
			rooms_total: 18,
			building_picture: '/businessSchool.webp',
		},
		{
			name: 'Civil Engineering Building',
			rooms_total: 8,
			building_picture: '/civilBuilding.webp',
		},
		{
			name: 'Colombo Building',
			rooms_total: 5,
			building_picture: '/colombo.webp',
		},
		{
			name: 'Computer Science & Eng (K17)',
			rooms_total: 7,
			building_picture: '/cseBuilding.webp',
		},
	]
}

export default useStaticData
