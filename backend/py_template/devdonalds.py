from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook: Dict[str, Union[Recipe, Ingredient]] = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
	words = []
	current_word = []
	is_new_word = True
	for char in recipeName:
		if char.isalpha():
			if is_new_word:
				current_word.append(char.upper())
				is_new_word = False
			else:
				current_word.append(char.lower())
		elif char in [' ', '-', '_']:
			if not is_new_word:
				words.append(''.join(current_word))
				current_word = []
				is_new_word = True
		else:
			pass

	if len(current_word) != 0:
		words.append(''.join(current_word))
	
	result = ' '.join(words)
	if len(result) == 0:
		return None
	
	return result


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	global cookbook
	data = request.get_json()

	# handle validation
	entry_type = data.get('type')
	entry_name = data.get('name')

	if not entry_type or not entry_name:
		return {}, 400
	
	if entry_name in cookbook:
		return {}, 400
	
	if entry_type == 'ingredient':
		entry_cooktime = data.get('cookTime')	
		if entry_cooktime is None or entry_cooktime < 0:
			return {}, 400
		ingredient = Ingredient(
			name = entry_name,
			cook_time = entry_cooktime
		)
		cookbook[entry_name] = ingredient
		return {}, 200
		
	elif entry_type == 'recipe':
		entry_required_items = data.get('requiredItems')
		if not isinstance(entry_required_items, list):
			return {}, 400
		required_items: list[RequiredItem] = []
		for item in entry_required_items:
			if not isinstance(item, dict):
				return {}, 400
			quantity = item.get('quantity')
			if quantity is None or quantity <= 0:
				return {}, 400
			required_items.append(RequiredItem(name = item.get('name'), quantity = item.get('quantity')))
		cookbook[entry_name] = Recipe(
			name = entry_name,
			required_items = required_items
		)	
		return {}, 200
	
	else:
		return {}, 400
	
	# handle saving into cookbook
	
	


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	global cookbook

	if not cookbook:
		return {}, 400
	
	name = request.args.get('name')

	if name is None or name not in cookbook:
		return {}, 400
	
	if not isinstance(cookbook[name], Recipe):
		return {}, 400
	
	queue = [name]
	ingredients = {}
	while len(queue) > 0:
		current = queue.pop()
		current_required_items = cookbook[current].required_items
		for required_item in current_required_items:
			item_name = required_item.name
			if item_name not in cookbook:
				return {}, 400
			item = cookbook[item_name]
			if isinstance(item, Ingredient):
				if item_name not in ingredients:
					ingredients[item_name] = 0
				ingredients[item_name] = ingredients[item_name] + required_item.quantity
			elif isinstance(item, Recipe):
				queue.push(item_name)
	
	ingredients_result = []
	cooktime = 0
	for ingredient in ingredients.keys():
		cooktime += int(cookbook[ingredient].cook_time) * int(ingredients[ingredient])
		ingredients_result.append({
			'name': ingredient,
			'quantity': int(ingredients[ingredient])
		})

	result = {
		'name': name,
		'cookTime': cooktime,
		'ingredients': ingredients_result
	}
	# TODO: implement me
	return result, 200


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
