const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "10.89.240.69",
    user: "alunods",
    password: "senai@604",
    database: "reservasenai"
});

module.exports = pool;