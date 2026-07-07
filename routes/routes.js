const express = require('express')
const router = express.Router()

let {gastos, categorias} = require('../data')

router.get('/api/gastos', (request, response) => {
  const queryCategoria = request.query.categoria;

  if (queryCategoria === "comida") {
    const filtered = gastos.filter(gasto => gasto.categoria == categorias.find(categoria => categoria.nombre === "comida").id);
    response.status(200).json(filtered)
  }

  else {
    response.status(200).json(gastos)
  }
})

router.get('/api/gastos/:id', (request, response) => {
  const id = request.params.id
  const gasto = gastos.find(gasto => gasto.id === id)

  response.status(200).json(gasto)
})

router.post('/api/gastos', (request, response) => {
  const newGasto = request.body;

  if (!newGasto.descripcion) {
    return response.status(400).json({ error: 'Error: descripción requerida' });
  } 
  else if (!newGasto.monto) {
    return response.status(400).json({ error: 'Error: monto requerido' });
  }
  else if (newGasto.monto <= 0) {
    return response.status(400).json({ error: 'Error: el monto ingresado debe ser mayor a 0' });
  }
  else {
    if (!categorias.find(categoria => categoria.id === newGasto.categoria)) {
      newGasto.categoria = 5;
  }

    if (!newGasto.fecha) {
      newGasto.fecha = new Date()
  }

  newGasto.id = (gastos.length+1)

    gastos.push(newGasto);
    response.status(201).json(newGasto);
  }
})

router.delete('/api/gastos/:id', (request, response) => {
  const id = request.params.id
  gastos = gastos.filter(gasto => gasto.id !== id)

  response.status(200).end()
})

router.get('/api/categorias', (request, response) => {
  response.status(200).json(categorias)
})

router.get('/info', (request, response) => {
  response.json({ tiempo: new Date(), cantidadGastos: gastos.length })
})

module.exports = router