const express = require("express");
const app = express();
const cors = require('cors');
const port = 4000; 

app.use(cors());
app.use(express.json());

const { Pool } = require('pg');
const pgCLient = new Pool({
    host: "mypostgres",
    port: "5432",
    database: "postgres",
    user: "postgres",
    password: "Pa$$w0rd",
});
pgCLient.on('error', () => console.log("Postgres not connected"));

const redis = require('redis');
const redisClient = redis.createClient({
    host: "myredis",
    port: 6379,
    //retry_strategy: () => 1000 //every second
});
redisClient.on('connect', () => console.log("Connected to redis sever"));

function initiateDogTable(){ 
    pgCLient.query(`CREATE TABLE IF NOT EXISTS dogs (
        id SERIAL PRIMARY KEY NOT NULL, 
        name VARCHAR(20), 
        yearsOld INT, 
        race VARCHAR(20), 
        favouriteFood VARCHAR(20));`)
        .catch((err) => console.log(err));
}

initiateDogTable();
//insert into dogs (id, name, yearsOld, race, favouriteFood) values (1, 'Guzik',3, 'Akita', 'Resztki z obiadu');

const getDogs= (_, res) => {
    pgClient.query('SELECT * FROM dogs ORDER BY name ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getDog = (req, res) => {
    const id = parseInt(req.params.id)

    redisClient.get(id, (_, results) => {
        if (results) {
            let result = [{'id': id, 'name': results}]
            res.status(200).json(result)
            console.log(`Retrieved from cache`)
        } else {
            pgClient.query('SELECT * FROM dogs WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json(results.rows)
            })
        }
    })
}

const newDog= (req, res) => {
    const { name } = req.body

    const dbQuery = new Promise((resolve, _) => {
        pgClient.query('INSERT INTO dogs (name) VALUES ($1) RETURNING id', [name], (error, results) => {
            if (error) {
                throw error
            }
            id = results.rows[0].id
            res.status(201).send(`Dog ${name} was added`)
            resolve(id)
        })
    })
    dbQuery.then(value =>
        redisClient.set(value, name, (error, _) => {
            if (error) {
                res.status(500).json({ error: error })
                console.log(error)
            }
        })
    )
}

app.get("/", (_, res) => {
    res.status(200).send("Hello dogs, wow!");
});

app.get("/dogs", getDogs)
app.get("/dogs/:id", getDog)
app.post("/dogs", newDog)

app.listen(port, () => {
    console.log(`Look for dogs on http://localhost:${port}`);
});