import express from 'express'
import bodyParser from 'body-parser'
import routes from './src/routes'

const app = express()

//import swaggerJsDocs from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

// const options = {
//     definition : {
//         openapi: '3.0.0',
//         info: {
//             title: 'Papelaria da Lu',
//             version: '1.0.0'
//         }
//     },
//     apis: ['./src/**/*-routes.js']
// }

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// const openapiSpecification = swaggerJsDocs(options)
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))


app.use(bodyParser.json())

app.use('/', routes)

app.listen(3000, () => {
    console.log('Executando na porta 3000')
})