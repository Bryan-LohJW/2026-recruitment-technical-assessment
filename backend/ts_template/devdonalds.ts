import express, { Request, Response } from 'express'

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
	name: string
	type: string
}

interface requiredItem {
	name: string
	quantity: number
}

interface recipe extends cookbookEntry {
	requiredItems: requiredItem[]
}

interface ingredient extends cookbookEntry {
	cookTime: number
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express()
app.use(express.json())

// Store your recipes here!
const cookbook: any = null

// Task 1 helper (don't touch)
app.post('/parse', (req: Request, res: Response) => {
	const { input } = req.body

	const parsed_string = parse_handwriting(input)
	if (parsed_string == null) {
		res.status(400).send('this string is cooked')
		return
	}
	res.json({ msg: parsed_string })
	return
})

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
	// TODO: implement me
	const words = []
	const isAlpha = (char: string): boolean => {
		return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')
	}
	let isNewWord = true
	let currentWord: string[] = []

	for (let i = 0; i < recipeName.length; i++) {
		if (isAlpha(recipeName[i])) {
			if (isNewWord) {
				currentWord.push(recipeName[i].toUpperCase())
				isNewWord = false
			} else {
				currentWord.push(recipeName[i].toLowerCase())
			}
		} else if ([' ', '-', '_'].includes(recipeName[i])) {
			if (isNewWord) {
				continue
			} else {
				words.push(currentWord.join(''))
				currentWord = []
				isNewWord = true
			}
		} else {
			continue
		}
	}
	words.push(currentWord.join(''))
	currentWord = []
	isNewWord = true

	const result = words.join(' ')

	return result.length > 0 ? result : null
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post('/entry', (req: Request, res: Response) => {
	// TODO: implement me
	res.status(500).send('not yet implemented!')
})

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get('/summary', (req: Request, res: Request) => {
	// TODO: implement me
	res.status(500).send('not yet implemented!')
})

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080
app.listen(port, () => {
	console.log(`Running on: http://127.0.0.1:8080`)
})
