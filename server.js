import express from 'express'
import bodyParser from 'body-parser'
import routes from './src/routes'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Papelaria da Lu',
            version: '1.0.0',
            description: "Documentação para utilização da API"
        }
    },
    apis:['./src/**/*-routes.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
//console.log(swaggerDocs)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))



app.use(bodyParser.json())

app.use('/', routes)

app.listen(3000, () => {
    console.log('Executando na porta 3000')
})