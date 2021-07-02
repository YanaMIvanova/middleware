import express from 'express'
import cors from 'cors'
import { generateEndpoints } from './endpoints'

const port = 4000

const app = express()

app.use(cors())
app.use(express.json())

generateEndpoints({ app })

app.get('/', (_req, res) => {
    const allRoutes = app._router.stack
        .filter(({ name }) => name === 'bound dispatch')
        .map(({ route: { path } }) => path)
        .slice(0, -1)

    res.send(`<ul>${allRoutes.map((route) => `<li><a href="${route}">${route}</a></li>`).join('')}</ul>`)
})

app.listen(port, () => {
    console.log(`Middleware app listening at http://localhost:${port}`)
})
