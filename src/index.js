import express from 'express'
import cors from 'cors'
import { generateEndpoints } from './endpoints'

const port = 4000

const app = express()

app.use(cors())
app.use(express.json())

generateEndpoints({ app })

app.listen(port, () => {
    console.log(`Middleware app listening at http://localhost:${port}`)
})
