import express from 'express'
import path from 'path'
import routes from './routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.resolve('src', 'views'))
app.use(express.static(path.resolve('src', 'public')))
app.use(routes)

export default app