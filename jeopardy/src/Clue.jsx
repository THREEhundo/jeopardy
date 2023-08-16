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
	return (
		<div className={className} onClick={handleClick}>
			{stage === 0 ? (
				content
			) : (
				<span dangerouslySetInnerHTML={{ __html: content }} />
			)}
		</div>
	)
}

export default Clue
