import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './clue.css'

const Clue = ({ value, clue }) => {
	const [stage, setStage] = useState(0)
	const [size, setSize] = useState(null)

	const handleClick = () => setStage(stage + 1)

	let content, className
	if (stage === 0) {
		content = `$${value}`
		className = 'clue dollar-value'
	} else if (stage === 1) {
		content = clue ? clue.question : null
		className = `clue`
	} else if (stage === 2) {
		content = clue ? clue.answer : null
		className = `clue`
	}

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

			// Use the smaller ratio to ensure the text fits within both width and height
			const ratio = Math.min(widthRatio, heightRatio)

			// Apply the adjusted font size
			const potentialSize = ratio * 0.8 // Adjust the scaling factor
			const fontSize = Math.min(18, potentialSize)
			box.style.fontSize = `${fontSize}px`

			fontSize < size && setSize(fontSize)
		}

		gridBoxes.forEach(adjustTextSize)
		gridBoxes.forEach(x => (x.style.fontSize = `${size}px`))
	}, [])

	return (
		<div ref={gridRef} className={className} onClick={handleClick}>
			{stage === 0 ? (
				content
			) : (
				<span
					className='box'
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			)}
		</div>
	)
}

export default Clue
