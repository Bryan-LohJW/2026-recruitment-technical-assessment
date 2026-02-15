import express, { Request, Response } from 'express'
import { body, checkSchema, query, validationResult } from 'express-validator'

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

interface cookbook {
	[name: string]: recipe | ingredient
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express()
app.use(express.json())

// Store your recipes here!
let cookbook: cookbook | null = null

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
app.post(
	'/entry',
	checkSchema({
		name: { notEmpty: true, isString: true },
		type: { notEmpty: true, isString: true },
	}),
	body('type').custom((val, { req }) => {
		if (val === 'ingredient') {
			if (
				typeof req.body.cookTime === 'number' &&
				req.body.cookTime >= 0
			) {
				return true
			}
			return false
		} else if (val === 'recipe') {
			if (
				Array.isArray(req.body.requiredItems) &&
				req.body.requiredItems.length > 0
			) {
				for (let i = 0; i < req.body.requiredItems.length; i++) {
					if (
						typeof req.body.requiredItems[i].name === 'string' &&
						typeof req.body.requiredItems[i].quantity ===
							'number' &&
						req.body.requiredItems[i].quantity > 0
					) {
						continue
					} else {
						return false
					}
				}
				return true
			}
			return false
		} else {
			return false
		}
	}),
	body('name').custom((val) => {
		return cookbook === null || !(val in cookbook)
	}),
	(req: Request, res: Response) => {
		const result = validationResult(req)
		if (!result.isEmpty()) {
			res.status(400).send()
			return
		}
		if (cookbook === null) {
			cookbook = {}
		}
		const { name, type } = req.body
		if (type === 'ingredient') {
			const ingredient: ingredient = {
				name: name,
				type: 'ingredient',
				cookTime: req.body.cookTime,
			}
			cookbook[name] = ingredient
		} else if (type === 'recipe') {
			const requiredItems: requiredItem[] = req.body.requiredItems.map(
				(item: any) => ({
					name: item.name,
					quantity: item.quantity,
				}),
			)
			const recipe: recipe = {
				name: name,
				type: 'recipe',
				requiredItems: requiredItems,
			}
			cookbook[name] = recipe
		}
		res.status(200).send()
	},
)

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get(
	'/summary',
	query('name')
		.notEmpty()
		.custom((val) => {
			return (
				cookbook !== null &&
				val in cookbook &&
				cookbook[val].type === 'recipe'
			)
		}),
	(req: Request, res: Response) => {
		const valResult = validationResult(req)
		if (!valResult.isEmpty()) {
			res.status(400).send()
			return
		}
		const queue: string[] = [req.query.name as string]
		const ingredients: { [key: string]: number } = {}
		while (queue.length) {
			const currentName = queue.pop()
			const currentItem = cookbook[currentName]
			if (currentItem.type !== 'recipe') continue
			const recipe = currentItem as recipe
			const requiredItems = recipe.requiredItems
			for (let i = 0; i < requiredItems.length; i++) {
				if (!(requiredItems[i].name in cookbook)) {
					res.status(400).send()
					return
				}
				if (cookbook[requiredItems[i].name].type === 'ingredient') {
					const ingredientName = requiredItems[i].name
					if (!(ingredientName in ingredients)) {
						ingredients[ingredientName] = 0
					}
					ingredients[ingredientName] += requiredItems[i].quantity
				} else {
					for (let j = 0; j < requiredItems[i].quantity; j++) {
						queue.push(requiredItems[i].name)
					}
				}
			}
		}
		const ingredientsResult = []
		let cookTime = 0
		for (const [key, val] of Object.entries(ingredients)) {
			const currentIngredient = cookbook[key] as ingredient
			cookTime += currentIngredient.cookTime * Number(val)
			ingredientsResult.push({
				name: key,
				quantity: Number(val),
			})
		}
		const result = {
			name: req.query.name,
			cookTime: cookTime,
			ingredients: ingredientsResult,
		}
		res.status(200).json(result)
	},
)

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080
app.listen(port, () => {
	console.log(`Running on: http://127.0.0.1:8080`)
})
