import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { info } from '../utils/info.js'

import { loggerInfo, loggerError, loggerWarn } from '../utils/log4js.js'

const routes = Router()

//INDEX
routes.get('/', isAuth, (req, res) => {
    try {
        loggerInfo.info('Se accedió correctamente a productos')
        res.render('products', {
            user: req.user
        })
    } catch (error) {
        loggerError.error('Error en productos: ' + error)
        res.send('Error')
    }
})

//LOGIN
routes.get('/login', (req, res) => {
    try {
        loggerInfo.info('Accedió correctamente a /login')
        if (req.isAuthenticated()) return res.redirect('/ecommerce')
        res.render('login')
    } catch (error) {
        loggerError.error('Error en /login: ' + error)
        res.send('Error')
    }
    
})
routes.post('/login', passport.authenticate('login', {failureRedirect: '/ecommerce/error-login'}), (req, res) => res.redirect('/ecommerce/'))

//SIGNUP
routes.get('/signup', (req, res) => {
    try {
        loggerInfo.info('Accedió correctamente a /signup')
        if (req.isAuthenticated()) return res.redirect('/ecommerce')
        res.render('signup')
    } catch (error) {
        loggerError.error('Error en /signup: ' + error)
        res.send('Error')
    }
})
routes.post('/signup', passport.authenticate('signup', {failureRedirect: '/ecommerce/error-signup'}), (req, res) => res.redirect('/ecommerce/login'))

//LOGOUT
routes.get('/logout', isAuth, (req, res) => {
    try {
        loggerInfo.info('Se ha deslogueado la sesión correctamente')
        req.logout(err => {
            if (err) return err
            res.redirect('/ecommerce/login')
        })
    } catch (error) {
        loggerError.error('Error en /logout: ' + error)
        res.send('Error')
    }
})

//FAIL ROUTE
routes.get('/error-login', (req, res) => {
    try {
        loggerInfo.info('No se ha podido iniciar sesión')
        if (req.isAuthenticated()) return res.redirect('/ecommerce')
        res.render('error-login')
    } catch (error) {
        loggerError.error('Error en /error-login: ' + error)
        res.send('Error')
    }
})
routes.get('/error-signup', (req, res) => {
    try {
        loggerInfo.info('No se ha podido registrar el usuario')
        if (req.isAuthenticated()) return res.redirect('/ecommerce')
        res.render('error-signup')
    } catch (error) {
        loggerError.error('Error en /error-signup: ' + error)
        res.send('Error')
    }
})

//INFO
routes.get('/info', (req, res, next) => {
    try {
        loggerInfo.info('Accedió correctamente a /info')
        res.render('info', {info: info()})
    } catch (error) {
        loggerError.error('Error en /info: ' + error)
        res.send('Error')
    }
})

//
routes.get('*', (req, res, next) => {
    try {
    loggerWarn.warn("Ruta inexistente");
    res.redirect('/ecommerce')
    next();
    } catch (error) {
        loggerError.error('Error en la ruta: ' + error.message)
        res.send('Error')
    }
})


export default routes

