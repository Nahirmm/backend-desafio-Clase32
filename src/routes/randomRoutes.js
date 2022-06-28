import { Router } from 'express'
import { fork } from "child_process"
import { loggerInfo, loggerError } from '../utils/log4js.js'

const routes = Router()

//RANDOMS
routes.get('/random', (req, res) => {
  try {
    loggerInfo.info('Se ha accedido a /random')
    let cant = req.query.cant || 10000
    let passCant = ['' + cant + '']
    const child = fork('./random.js')

    child.send(passCant);

    child.on('message', (operation) => {
    res.render('random',{operation : operation});
  });
  } catch (error) {
    loggerError.error('Error en /random: ' + error)
    res.send('Error')
  }
})

export default routes