import axios from 'axios'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AdressesRepository } from '../repositories/AdressesRepository'

class AddressController {
  async show (req : Request, res : Response) {

    const adressesRepository = getCustomRepository(AdressesRepository)
    const all = await adressesRepository.find()
    return res.json(all)
  }

  async create (req : Request, res : Response) {
    const { cep} = req.body
    const adressesRepository = getCustomRepository(AdressesRepository)
    const cepAlreadyExists = await adressesRepository.findOne({ cep })

    // Verificar se CEP é válido
    // Se nao tem a key erro no objeto

    if (cepAlreadyExists) {
      console.log(cepAlreadyExists)
      // Retorna o endereço
      return res.status(200).json({
        message: 'CEP already registered.'
      })
    }
    const apiResponse =  await axios.get(`https://viacep.com.br/ws/${cep}/json`).then(res => res.data)
    if(apiResponse.hasOwnProperty('erro') ) {
      return res.status(400).json({message: 'The CEP is incorrect or does not exist'})
    }
    const { logradouro, complemento,bairro,  localidade, uf } = apiResponse
    const address = adressesRepository.create({
      cep, street: logradouro, complement: complemento,neighborhood: bairro, city: localidade, state: uf
    })
    await adressesRepository.save(address)
    return res.json(apiResponse)
  }
}

export { AddressController }
