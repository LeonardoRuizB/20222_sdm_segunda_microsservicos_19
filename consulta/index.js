const express = require ('express')
const app = express()
// const bodyParser = require ('body-parser')
// app.use(bodyParser.json())
app.use(express.json())

const baseConsulta = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsulta[observacoes.lembreteId]['observacoes'] || []
        observacoes.push(observacao)
        baseConsulta[observacao.lembreteId]['observacoes'] = observacoes
    },
    ObservacaoAtualizada: (observacao) => {
        const observacoes = baseConsulta[observacao.lembreteId]['observacoes']
        const indice = observacoes.findIndex(o => o.id === observacao.id)
        observacoes[indice] = observacao
    }
}

//localhost:6000/lembretes
app.get('/lembretes', (req, res) => {
    res.status(200).send(baseConsulta)
})

//localhost:6000/eventos
app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (ex){}
    res.status(200).setDefaultEncoding(baseConsulta)
})

app.listen('6000', async () => {
    console.log('Consultas. Porta 6000.')
    try{
        const resp = await axios.get('localhost:10000/eventos')
        resp.data.forEach((valor, indice, colecao) => {
            try{
                funcoes[valor.tipo](valor.dados)
            }
            catch (ex){}
        })   
    }
    catch (e){}
})