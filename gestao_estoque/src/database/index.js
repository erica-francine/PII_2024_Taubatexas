const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Importa os modelos
const Categoria = require('../models/Categoria');
const Estoque = require('../models/Estoque');
const Usuario = require('../models/Usuario');
const Fornecedor = require('../models/Fornecedor');
const Projeto = require('../models/Projeto');
const Enderecos = require('../models/Endereco_Fornecedor');
const Robo = require('../models/Robo');
const Materiais = require('../models/Material');
const Movimentacao = require('../models/Movimentacao');
const Item_Movimentacao = require('../models/Item_Movimentacao');

// Cria a instância de conexão
const connection = new Sequelize(dbConfig);

// Função de tentativa de conexão e execução de migrações
async function connectWithRetry() {
    const MAX_RETRIES = 10;  // Número máximo de tentativas
    const RETRY_DELAY = 5000; // Tempo de espera entre as tentativas (5 segundos)
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            await connection.authenticate();
            console.log("Conexão com o banco de dados estabelecida.");

            // Executa as migrações quando o banco de dados estiver pronto
            await connection.sync();
            console.log("Sincronização do banco de dados concluída.");

            // Executa as migrações usando Sequelize CLI
            const { exec } = require('child_process');
            exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erro ao executar as migrações: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Erro de migração: ${stderr}`);
                    return;
                }
                console.log(`Migrações executadas: ${stdout}`);
            });
            break;
        } catch (error) {
            retries += 1;
            console.error(`Tentativa ${retries} de conexão com o banco falhou. Erro: ${error.message}`);
            await new Promise(res => setTimeout(res, RETRY_DELAY)); // Aguarda antes de tentar novamente
        }
    }
}

// Inicializa a conexão e executa o loop de conexão
connectWithRetry().then(() => {
    // Inicializa os modelos após a conexão e migração
    Categoria.init(connection);
    Estoque.init(connection);
    Usuario.init(connection);
    Fornecedor.init(connection);
    Projeto.init(connection);
    Enderecos.init(connection);
    Robo.init(connection);
    Materiais.init(connection);
    Movimentacao.init(connection);
    Item_Movimentacao.init(connection);

    // Define as associações dos modelos
    Categoria.associate && Categoria.associate(connection.models);
    Fornecedor.associate && Fornecedor.associate(connection.models);
    Enderecos.associate && Enderecos.associate(connection.models);
    Materiais.associate && Materiais.associate(connection.models);
    Movimentacao.associate && Movimentacao.associate(connection.models);
    Robo.associate && Robo.associate(connection.models);
    Projeto.associate && Projeto.associate(connection.models);
    Usuario.associate && Usuario.associate(connection.models);
    Item_Movimentacao.associate && Item_Movimentacao.associate(connection.models);
    Estoque.associate && Estoque.associate(connection.models);

    console.log("Modelos e associações inicializados.");
}).catch((error) => {
    console.error("Falha ao estabelecer a conexão com o banco de dados após várias tentativas:", error);
});

module.exports = connection;
