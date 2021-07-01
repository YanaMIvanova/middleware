import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import { apiToken, apiUrl } from './defaultConfig'

const port = 4000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/organizations', async (req, res) => {
    try {
        const url = new URL('organization/list/recursive', apiUrl)
        const params = {
            page: 0,
            limit: 30,
            apitoken: apiToken,
        }

        url.search = new URLSearchParams(params)

        const response = await fetch(url)
        const organizations = await response.json()

        res.json(organizations)
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
    console.log(`Middleware app listening at http://localhost:${port}`)
})
