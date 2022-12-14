const express = require("express")
const axios = require("axios")
const app = express()
app.use(express.json)

palavraChave = "importante"
const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
            observacao.texto.includes(palavraChave)
            ? "importante" //esse é o IF
            : "comum"      //esse é o ELSE
        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoAtualizada",
            dados: observacao
        })
    }
}

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados)
    }
    catch (ex){
        console.log(ex)
        console.log(req.body)
    }
    res.status(200).send({msg: "ok"})
})

app.listen(7000, () => {
    try{
        console.log("Classificação. Porta 7000")
        const resp = axios.get('http://localhost/eventos')
        resp.data.forEach((valor, indice, colecao) => {
            try{
                funcoes[valor.tipo](valor.dados)
            }
            catch (e){}
        })
    }
    catch (e){
        console.log(e)
    }
})
