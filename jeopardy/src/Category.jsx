import Clue from './Clue'

const Category = ({ category }) => {
	const values = [200, 400, 600, 800, 1000]
	const { title, clues } = category

	return (
		// Header and 5 clues
		<div className='category'>
			<h2>{title}</h2>
			{values.map((value, i) => {
				const clue = clues.find(clue => clue.value === value)
				return <Clue key={i} value={value} clue={clue} />
			})}
		</div>
	)
}

export default Category
