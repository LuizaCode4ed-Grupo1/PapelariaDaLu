const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    connectionString: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@luizacode.osgkn.mongodb.net/papelaria-da-lu`
}