const express = require("express");
const app = express();
const cors = require('cors');
const port = 5000; 
const redis = require('redis');
const { Pool } = require('pg');

const redisClient = redis.createClient({
    host: "myredis",
    port: 6379,
}),
pgCLient = new Pool({
    user: "",
    password: "",
    database: "",
    host: "",
    port: ""
});

app.use(cors());
app.use(express.json());

pgCLient.on('error', () => console.log("Postgres not connected"));

pgCLient.query('CREATE TABLE IF NOT EXISTS dogs (id INT, name VARCHAR(20))')
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.status(200).send("Hello dogs, wow!");
});

redisClient.on('connect', () => console.log("Connected to redis sever"));


app.listen(port, () => {
    console.log(`Look for dogs on http://localhost:${port}`);
});