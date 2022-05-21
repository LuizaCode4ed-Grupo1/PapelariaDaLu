import express from 'express'
import bodyParser from 'body-parser'

const app = express()


app.use(bodyParser.json())

app.get('/', (req, res, next) => res.send('Agora foi'))

app.listen(3000, () => {
    console.log('Executando na porta 3000')
})