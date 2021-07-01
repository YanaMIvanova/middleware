import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const port = 4000

const app = express()

app.use(cors())
app.use(express.json())

const getURL = (baseURL) => `${baseURL}?apitoken=b10e246fa52ca8ce9e68245026e7ebd3a14`

app.get('/organizations', async (req, res) => {
    try {
        const response = await fetch(getURL('http://localhost/apiv2/organization/list/recursive?page=0&limit=30'))
        const organizations = await response.json()

        res.json(organizations)
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
    console.log(`Middleware app listening at http://localhost:${port}`)
})
