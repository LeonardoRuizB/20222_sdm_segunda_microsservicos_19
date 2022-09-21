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
            tipo: "ObservacaoClassificada",
            dados: observacao,
        })
    }
}

app.post('/eventos', (req, res) => {
    funcoes[req.body.tipo](req.body.dados),
    res.status(200).send({msg: "ok"})
})

app.listen(7000, () => console.log("Classificação. Porta 7000"))