import { createPool } from "mysql2/promise";

export const db=createPool({
    host:'localhost',
    user:'root',
    password:'Rz(!ci3*OHgIr]rT',
    port:'3306',
    database:'exotic_bar',
    connectionLimit: 10,
    connectTimeout: 3000000, 
})

// export default db;