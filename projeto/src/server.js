const port = 3000

import app from './app.js'
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})