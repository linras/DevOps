const express = require("express");
const app = express();
const cors = require('cors');
const port = 5000; 

app.use(cors());
app.use(express.json());

const { Pool } = require('pg');

const poolData = {
    host: process.env.POSTGRES_HOST ?? "mypostgres",
    port: process.env.POSTGRES_PORT ?? "5432",
    database: process.env.POSTGRES_DB ?? "postgres",
    user: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "Passw0rd"
};

const sqlCreate = `CREATE TABLE IF NOT EXISTS dogs (
    id SERIAL PRIMARY KEY UNIQUE NOT NULL, 
    name VARCHAR(20), 
    yearsOld INT, 
    race VARCHAR(20), 
    favouriteFood VARCHAR(20));`;

const pgCLient = (sqlText, parametrs, callbackFunc) => {
    let clinet = new Pool(poolData);
    clinet.connect()
        .then(() => clinet.query(sqlText, parametrs, (error, result) => {
            if (error) throw error;
            callbackFunc(null, result);
        }))
        .catch(ex => console.log(ex))
        .finally(() => clinet.end());
}

pgCLient(sqlCreate, [], () => {
    console.log(`Creating the table if not exists.`);
});

//insert into dogs (id, name, yearsOld, race, favouriteFood) values (1, 'Guzik',3, 'Akita', 'Resztki z obiadu');
//const sqlInsert = `insert into dogs (name, yearsOld, race, favouriteFood) values ('Guzik',3, 'Akita', 'Resztki z obiadu');`;
// pgQuery(sqlInsert, [], () => {
//     console.log(`Inserting row.`)
// });

const redis = require('redis');
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST ?? "myredis",
    port: process.env.REDIS_PORT ?? 6379,
    //retry_strategy: () => 1000 //every second
});
redisClient.on('connect', () => console.log("Connected to redis sever"));

const getDogs= (_, res) => {
    pgCLient(`SELECT * FROM dogs ORDER BY name ASC`, [],
            (error, result) =>  {
                        if (error) throw error;
                        res.status(200).json(result.rows)
                    }
        );
}

const getDog = (req, res) => {
    const id = parseInt(req.params.id)

    redisClient.get(id, (_, results) => {
        if (results) {
            //let result = [{'id': id, 'name': results}]
            res.status(200).json(results[0])
            console.log(`Retrieved from cache`)
        } else {
            pgCLient(`SELECT * FROM dogs WHERE id = ${id}`, [], (error, results) => {
                if (error) throw error;
                res.status(200).json(results.rows[0])
            })
        }
    })
}

const newDog= (req, res) => {
    const { name, race, yearsold, favouritefood } = req.body
    const dbQuery = new Promise((_resolve, _) => {
        pgCLient(`INSERT INTO dogs (name, race, yearsold, favouritefood) VALUES ('${name}', '${race}', ${yearsold}, '${favouritefood}') RETURNING id`, [],
            (error, result) =>  {
                        if (error) throw error;
                        const id = result.rows[0].id;
                        res.status(200).json({ id, name, race, yearsold, favouritefood });
                    }
        );
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

const editDog= (req, res) => {
    const { id, name, race, yearsold, favouritefood } = req.body
    const dbQuery = new Promise((_resolve, _) => {
        pgCLient(`UPDATE dogs set name = '${name}',
            race = '${race}', 
            yearsold = ${yearsold}, 
            favouritefood = '${favouritefood}' 
            where id = ${id}`, [],
            (error, _) =>  {
                if (error) throw error;
                res.status(200).json({ id, name, race, yearsold, favouritefood });
            }
        );
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

const deleteDog = (req, res) => {
    const id = parseInt(req.params.id)
    pgCLient(`DELETE FROM dogs WHERE id = ${id}`, [],
            (error, _result) => {
                if (error) throw error;
                res.status(200).send("Dog was deleted.")
            }
        );
}

app.get("/", (_, res) => {
    res.status(200).send("Hello dogs, wow!");
});

app.get("/dogs", getDogs);
app.get("/dog/:id", getDog);
app.delete("/dog/:id", deleteDog);
app.post("/dog", newDog);
app.put("/dog", editDog);

app.listen(port, () => {
    console.log(`Look for dogs on http://localhost:${port}`);
});