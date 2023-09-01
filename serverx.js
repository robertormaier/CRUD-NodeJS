// Importa o módulo do Express Framework
const express = require('express')
 
// Inicializa um objeto de aplicação Express
const app = express()

app.post('/', express.urlencoded({extended: true}), (req, res) => {
    res.send(`seja bem vindo ${req.body.nome}`)
})
 
// Inicializa o servidor HTTP na porta 3000
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000')
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Estrutura de Dados de Produtos
const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
};

// Obter a lista de produtos
app.get('/produtos', (req, res) => {
    res.json(lista_produtos);
});

// Obter um produto específico
app.get('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produto = lista_produtos.produtos.find(p => p.id === produtoId);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado." });
    }
});

// Incluir um produto
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = lista_produtos.produtos.length + 1;
    lista_produtos.produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Alterar um produto
app.put('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produtoIndex = lista_produtos.produtos.findIndex(p => p.id === produtoId);

    if (produtoIndex !== -1) {
        lista_produtos.produtos[produtoIndex] = { ...req.body, id: produtoId };
        res.json(lista_produtos.produtos[produtoIndex]);
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado." });
    }
});

// Excluir um produto
app.delete('/produtos/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const produtoIndex = lista_produtos.produtos.findIndex(p => p.id === produtoId);

    if (produtoIndex !== -1) {
        lista_produtos.produtos.splice(produtoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado." });
    }
});