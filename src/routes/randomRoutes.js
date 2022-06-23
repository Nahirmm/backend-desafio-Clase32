import { Router } from 'express'
import { fork } from "child_process"

const routes = Router()

//RANDOMS
routes.get('/random', (req, res) => {
    let cant = req.query.cant || 10000
    let passCant = ['' + cant + '']
    const child = fork('./random.js')

    child.send(passCant);

    child.on('message', (operation) => {
    res.render('random',{operation : operation});
  });
})

export default routes