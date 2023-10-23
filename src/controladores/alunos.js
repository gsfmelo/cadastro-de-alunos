const alunos = require('../dados/alunos')
let idProximoAluno = 1

const verAlunos = (req, res) => {
    return res.json(alunos)

}

const verAlunoPorId = (req, res) => {
    const idDigitado = Number(req.params.id)

    if (isNaN(idDigitado)) {
        return res.status(400).json({ mensagem: 'O id informado não é um número válido.' })
    }

    const aluno = alunos.find(aluno => aluno.id === idDigitado)

    if (!aluno) {
        return res.status(404).json({ mensagem: 'O aluno não foi encontrado' })
    }

    return res.json(aluno)

}

const adicionar = (req, res) => {
    const { nome, sobrenome, idade, curso } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome deve ser informado' })
    }

    if (!sobrenome) {
        return res.status(400).json({ mensagem: 'O sobrenome deve ser informado' })
    }

    if (!idade) {
        return res.status(400).json({ mensagem: 'A idade deve ser informada' })
    }

    if (!curso) {
        return res.status(400).json({ mensagem: 'O curso deve ser informado' })
    }

    if (idade < 18) {
        return res.status(400).json({ mensagem: 'O aluno deve ter acima de 18 anos' })
    }

    const novoAluno = {
        id: idProximoAluno,
        nome,
        sobrenome,
        idade,
        curso
    }

    alunos.push(novoAluno)

    idProximoAluno++

    return res.status(201).send
}

const deletar = (req, res) => {
    const idDigitado = Number(req.params.id)

    if (isNaN(idDigitado)) {
        return res.status(400).json({ mensagem: 'O id informado não é um número válido.' })
    }

    const indiceAluno = alunos.findIndex(aluno => aluno.id === idDigitado)

    if (indiceAluno < 0) {
        return res.status(404).json({ mensagem: 'O aluno não foi encontrado' })
    }

    const alunoRemovido = alunos.splice(indiceAluno, 1)[0]

    return res.json(alunoRemovido)

}

module.exports = {
    verAlunos,
    verAlunoPorId,
    adicionar,
    deletar
}