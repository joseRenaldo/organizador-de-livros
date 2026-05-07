import conexao  from "../database/conexao.js";

class livroController {
    
    index   (req, res){
        const sql = 'SELECT * FROM livros;'
    conexao.query(sql, (error, result, fields )=> {
        if (error){
            res.status(400).json({'erro': error})
        }else {
            res.status(200).json(resultado)
        }
    })}
    show    (req, res){
    const id = req.params.id
    const sql = 'SELECT * FROM livros WHERE id=?;'
    conexao.query(sql, (error, result, fields )=> {
        const linha = resultado[0]
        if (error){
            res.status(400).json({'erro': error})
        }else {
            res.status(200).json(linha)
        }
    })}
    store   (req, res){
    const livro = req.body
    const sql = 'INSERT INTO livros SET ?;'
    conexao.query(sql, (error, result, fields )=> {
        if (error){
            res.status(404).json({'erro': error})
        }else {
            res.status(200).json(resultado)
        }
    })
    }
    delete  (req, res){
    const id = req.params.id
    const sql = 'DELETE FROM livros WHERE id=?;'
    conexao.query(sql, (error, result, fields )=> {
        if (error){
            res.status(400).json({'erro': error})
        }else {
            res.status(200).json(resultado)
        }
    })
    }
    update  (req, res){
    const id = req.params.id
    const updt = req.body
    const sql = 'UPDATE livros SET ? WHERE id=?;'
    conexao.query(sql, (error, result, fields )=> {
        if (error){
            res.status(400).json({'erro': error})
        }else {
            res.status(200).json(resultado)
        }
    })
    }
}

export default new livroController()