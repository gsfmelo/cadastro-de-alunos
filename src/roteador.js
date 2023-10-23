const express = require('express')
const validaSenha = require('./intermediario')
const { verAlunos, verAlunoPorId, adicionar, deletar } = require('./controladores/alunos')
const rotas = express()

rotas.use(validaSenha)
rotas.get('/alunos', verAlunos)
rotas.get('/alunos/:id', verAlunoPorId)
rotas.post('/alunos', adicionar)
rotas.delete('/alunos/:id', deletar)

module.exports = rotas