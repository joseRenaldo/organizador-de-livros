const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;

const autores = [
  { id: 1, nome: 'J.K. Rowling' },
  { id: 2, nome: 'George R.R. Martin' }
];

const livros = [
  { id: 1, titulo: 'Harry Potter', autorId: 1 },
  { id: 2, titulo: 'Game of Thrones', autorId: 2 }
];

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
  const livro = livros.filter(l => l.id == req.params.id);
  res.status(200).json(livro);
});


app.post('/livros', (req, res) => {
  const { titulo, autorId } = req.body;

  const autor = autores.filter(a => a.id == autorId);
  if (autor.length === 0) {
    return res.status(400).json({ erro: 'Autor não encontrado!' });
  }

  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autorId
  };

  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const livro = livros.filter(l => l.id == req.params.id);
  if (livro.length === 0) {
    return res.status(404).json({ erro: 'Livro não encontrado!' });
  }

  livro[0].titulo = req.body.titulo;
  livro[0].autorId = req.body.autorId;
  res.status(200).json(livro[0]);
});

app.delete('/livros/:id', (req, res) => {
  const index = livros.findIndex(l => l.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Livro não encontrado!' });
  }

  livros.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});