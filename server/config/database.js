const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
)`;
let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_code_block varchar(255) not null,
    user_id int not null,
    PRIMARY KEY (question_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;
let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255) not null,
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;
pool.query(registration, (err, results) => {
    if (err) throw err;
    console.log('registration table created');
})
pool.query(question, (err, results2) => {
    if (err) throw err;
    console.log('question table created');
})
// pool.query(answer, (err, results2) => {
//     if (err) throw err;
//     console.log('question table created');
// })

module.exports = pool;