import express from 'express'
import bodyParser from 'body-parser'
import routes from './src/routes'

const app = express()

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(bodyParser.json())

app.use('/', routes)

app.listen(3000, () => {
    console.log('Executando na porta 3000')
})