import { Router } from 'express'
import { AddressController } from './controller/AddressController'

const router = Router()

const adresses = new AddressController()

router.get('/adresses', adresses.show)
router.post('/adresses', adresses.create)


// router.post('/surveys', surveysController.create)
// router.get('/surveys', surveysController.show)


export { router }
