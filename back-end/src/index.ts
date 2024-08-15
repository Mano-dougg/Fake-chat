import { app } from './app'

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}`);
});