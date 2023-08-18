import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './clue.css'

const Clue = ({ value, clue }) => {
	const [stage, setStage] = useState(0)

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
				boxWidth = box.offsetWidth,
				boxHeight = box.offsetHeight

			// Calculate a ratio to adjust font size based on available space
			const widthRatio = boxWidth / text.length,
				heightRatio = boxHeight / 2 // Adjust as needed

			// Use the smaller ratio to ensure the text fits within both width and height
			const ratio = Math.min(widthRatio, heightRatio)

			// Apply the adjusted font size
			const fontSize = ratio * 0.8 // Adjust the scaling factor
			box.style.fontSize = `${fontSize}px`
		}

		gridBoxes.forEach(adjustTextSize)
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
