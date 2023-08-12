import { useEffect, useState } from 'react'
import Category from './Category'
import Clue from './Clue'

const Board = () => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		async function fetchData() {
			let offset = Math.floor(Math.random() * 28175 + 1)

			// fetch categories from the API

			const categoryURL = `https://jservice.io/api/categories?count=6&offset=${offset}`
			const categoryResponse = await fetch(categoryURL)
			const categoryData = await categoryResponse.json()

			// Fetch clues for each category
			const categoriesWithClues = await Promise.all(
				categoryData.map(async category => {
					const clueURL = ``
					const clueResponse = await fetch(categoryURL)
					const clueData = await clueResponse.json()

					return {
						...category,
						clues: clueData
					}
				})
			)

			// Put categories and clues inside of state variabe
			setCategories(categoriesWithClues)
		}
		fetchData()
	}, [])

	return (
		<div className='board'>
			{categories.map(category => (
				<Category key={category.id} category={category} />
			))}
		</div>
	)
}

/***
 * Create 6 rows and 6 columns
 * Title row
 * All following rows are questions & $ amount
 *
 * utilize jservice to plug into the api for the questions
 * Limit by category
 * Use clues
 */

export default Board
