import sql from 'mssql/msnodesqlv8';


const config = {
    server: "DESKTOP-0NH69QF", //localhost
    database: "db_vuelos_v",
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

let dataToReturn = {};

// function
module.exports = async (query) => {

    try{
        let connPool = await sql.connect(config);
        let dbQuery = await connPool.request()
            .query(query)
            .catch(err => console.log(err));
        if(!query.startsWith('delete')){// si no es un query para eliminar entonces...
            dataToReturn = dbQuery['recordset'];
        }

    }
    catch(err){
        throw err;
    }

    return dataToReturn;
};