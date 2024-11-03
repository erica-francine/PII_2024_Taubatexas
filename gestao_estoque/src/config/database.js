module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'db',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'mysql',
    database: process.env.DB_NAME || 'gestao_estoque',
    port: process.env.DB_PORT || 3306,
    define: {
        timestamps: true,
        underscored: true,
    }
};
