import pkg from 'pg';
const {Pool} = pkg;

const db = new Pool({
    user:'postgres',
    password:'root',
    host:'localhost',
    port:5432,
    database:'Testauth'
})

db.connect()
.then(client=>{
    console.log('DB Connected');
    client.release();
})
.catch(err=> console.log(`DB connection Error ${err.message ?? err}`));

export default db;