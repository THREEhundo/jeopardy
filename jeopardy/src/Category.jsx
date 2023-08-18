import { useEffect, useRef } from 'react'
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

	const gridRef = useRef(null)

	useEffect(() => {
		const gridBoxes = gridRef.current.querySelectorAll('.box')
		function adjustTextSize(box) {
			const text = box.textContent,
				boxWidth = box.offsetWidth,
				boxHeight = box.offsetHeight

			// Calculate a ratio to adjust font size based on available space
			const widthRatio = boxWidth / text.length,
				heightRatio = boxHeight / 2 // Adjust as needed

			// Use the smaller ratio to ensure the text fits within both width and height
			const ratio = Math.min(widthRatio, heightRatio)

			const fontSize = ratio * 2 // Adjust the scaling factor

			// Apply the adjusted font size
			box.style.fontSize = `${fontSize}px`
			console.log(boxWidth)
			//if (boxWidth > 130) box.style.fontSize = `${fontSize * 2}px`
		}

		gridBoxes.forEach(adjustTextSize)
	}, [])

	return (
		// Header and 5 clues
		<div ref={gridRef} className='category'>
			<h2 className='box'>{title}</h2>
			{values.map((value, i) => {
				const clue = category.clues.find(clue => clue.value === value)
				return <Clue key={i} value={value} clue={clue} />
			})}
		</div>
	)
}

export default Category
