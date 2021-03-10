import axios from 'axios'
import { getCustomRepository } from 'typeorm'
import { AdressesRepository } from '../repositories/AdressesRepository'

class AddressController {
  async show (req , res ) {

    const adressesRepository = getCustomRepository(AdressesRepository)
    const all = await adressesRepository.find()
    return res.json(all)
  }

  async create (req , res ) {
    const { cep} = req.body
    const adressesRepository = getCustomRepository(AdressesRepository)
    const cepAlreadyExists = await adressesRepository.findOne({ cep })

    if (cepAlreadyExists) {
      return res.status(200).json({
        message: 'CEP already registered.'
      })
    }
    const apiResponse =  await axios.get(`https://viacep.com.br/ws/${cep}/json`).then(res => res.data).catch(err => res.status(400).json({message: 'The CEP is incorrect or does not exist'}))

    if(apiResponse.hasOwnProperty('erro') ) {
      return res.status(400).json({message: 'The CEP is incorrect or does not exist'})
    }
    const { logradouro, complemento,bairro,  localidade, uf } = apiResponse
  
    const address = adressesRepository.create({
      cep, street: logradouro, complement: complemento,neighborhood: bairro, city: localidade, state: uf
    })
    await adressesRepository.save(address)

    return res.json(address)
  }
}

export { AddressController }
