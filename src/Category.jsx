import { useEffect, useRef, useState } from 'react'
import Clue from './Clue'
import './category.css'

const Category = ({ category }) => {
	const [size, setSize] = useState(1000)
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
				maxWidth = 200, // Maximum width in pixels
				maxHeight = 200, // Maximum height in pixels
				boxWidth = Math.min(box.offsetWidth, maxWidth),
				boxHeight = Math.min(box.offsetHeight, maxHeight)

			// Calculate a ratio to adjust font size based on available space
			const widthRatio = boxWidth / text.length,
				heightRatio = boxHeight / 2 // Adjust as needed
			console.log(widthRatio, heightRatio)

			// Use the smaller ratio to ensure the text fits within both width and height
			const ratio = Math.min(widthRatio, heightRatio)

			// Apply the adjusted font size
			const potentialSize = ratio * 0.8 // Adjust the scaling factor
			const fontSize =
				potentialSize < 16 && text.length < 30 ? 16 : potentialSize

			box.style.fontSize = `${fontSize}px`

			return fontSize < size ? setSize(fontSize) : ''
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
