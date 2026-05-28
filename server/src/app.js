import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Piku@2024',
    database: 'github_analyzer'
});

console.log('Connected to MySQL database');

//DB created
// await db.execute(`create database github_analyzer`);

await db.execute(`
    CREATE TABLE     
    `)
