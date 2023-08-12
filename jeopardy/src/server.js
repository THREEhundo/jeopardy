import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

// New route to handle requests to the jservice API

app.use('/api', async (req, res) => {
	console.log(`https://jservice.io/api/categories?count=6&offset=${req.url}`)
	try {
		// Forward the request to the jservice API
		const apiResponse = await fetch(
			`https://jservice.io/api/categories?count=6&offset=${req.url}`
		)
		const data = await apiResponse.json()
		res.send(data)
	} catch (err) {
		res.status(500).send('Error fetching data from the jservice API.')
	}
})

const PORT = 6000

app.listen(PORT, () =>
	console.log(`Server is running on http://localhost:${PORT}`)
)
