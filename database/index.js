import sql from 'mssql/msnodesqlv8';


const config = {
    server: "DESKTOP-0NH69QF", //localhost
    database: "test_db",
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
        let dbQuery = await connPool.request().query(query);
        if(!query.startsWith('delete')){// si no es un query para eliminar entonces...
            dataToReturn = JSON.parse(JSON.stringify(dbQuery['recordset']));
        }

    }
    catch(err){
        throw err;
    }

    return dataToReturn;
};