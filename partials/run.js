const mongoose = require('mongoose')

const runServer = (app) => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URL,
            { useNewUrlParser: true }),
            () => console.log('Mongo DB connected'
        )
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

module.exports = runServer