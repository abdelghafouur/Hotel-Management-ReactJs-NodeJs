const app = require('./app')
const  mongoose= require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./backend/config/config.env'})
PORT = process.env.PORT

// --- connections --------------------------------   

const DB =process.env.db_con
mongoose.connect(DB)
const database = mongoose.connection;
database.on('error', (error) => {
    console.log("Database Not Connected")
})
database.once('connected', () => {
    console.log('Database Connected');
})
app.listen(PORT,()=>console.log('server listening on port',PORT))

