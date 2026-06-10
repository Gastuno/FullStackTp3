const express = require('express')
const {gastos, categorias} = require('../data')
const router = express.Router()

router.get('/api/gastos', (request, response) => {
  response.json(gastos)
})

router.get('/api/gastos/:id', (request, response) => {
  const id = request.params.id
  const gasto = gastos.find(gasto => gasto.id === id)
  response.json(gasto)
})

router.post('/api/gastos', (request, response) => {
  response.json(gastos)
})

router.delete('/api/gastos/:id', (request, response) => {
  response.json(gastos)
})

router.get('/api/categorias', (request, response) => {
  response.json(categorias)
})

router.get('/info', (request, response) => {
  response.json(gastos)
})

module.exports = router