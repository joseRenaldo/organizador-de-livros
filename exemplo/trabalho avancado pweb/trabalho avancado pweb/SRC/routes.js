import router from 'express'
import livrosController from './app/controllers/livrosController.js'
import livros from './app/repositorios/livros.js'
import autor from './app/repositorios/autor.js'
import cliente from './app/repositorios/cliente.js'
import Emprestimo from './app/repositorios/emprestimos.js'

const router = router()
//livro
router.get('/livros', livrosController.index)
router.get('/livros/:id', livrosController.show)
router.post('/livros', livrosController.store)
router.delete('/livros/:id', livrosController.delete)
router.put('/livros/:id', livrosController.update)
//autor

export default router