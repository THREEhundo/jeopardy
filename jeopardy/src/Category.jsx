import Clue from './Clue'
import './category.css'

const Category = ({ category }) => {
	const values = [200, 400, 600, 800, 1000]

	const toTitleCase = str =>
		str
			.split(' ')
			.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
			.join(' ')

	const title = toTitleCase(category.title)

	return (
		// Header and 5 clues
		<div className='category'>
			<h2>{title}</h2>
			{values.map((value, i) => {
				const clue = category.clues.find(clue => clue.value === value)
				return <Clue key={i} value={value} clue={clue} />
			})}
		</div>
	)
}

export default Category
