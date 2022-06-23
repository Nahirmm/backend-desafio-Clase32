import express from "express"
import session from "express-session"
import 'dotenv/config'
import mongoose from "mongoose"
//import { PORT } from "./src/utils/minimist.js"
import minimist from "minimist"

const args = minimist(process.argv.slice(2))
const PORT = args.puerto || 8080 

const app = express()

import cluster from 'cluster'
import os from 'os'

const numCPUs = os.cpus().length

import passport from "passport";
import { strategyLogin, strategySignup } from "./src/middlewares/passportLocal.js"

passport.use('login', strategyLogin);
passport.use('signup', strategySignup)

import routes from './src/routes/routes.js'
import randomRoutes from './src/routes/randomRoutes.js'

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/ecommerce', routes)
app.use('/api', randomRoutes)

mongoose.connect(process.env.MONGODB)

const modoServer = args.modo || 'Fork'

if (modoServer == 'CLUSTER') {
    if (cluster.isPrimary) {

        console.log(`Master ${process.pid} id running`)
    
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()  
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        app.listen(PORT, () => console.log(`http://localhost:${PORT}/ecommerce/ o http://localhost:${PORT}/api/random/`))
    
        console.log(`Worker ${process.pid} started`)
    }
} else {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}/ecommerce/ o http://localhost:${PORT}/api/random/`))
}



