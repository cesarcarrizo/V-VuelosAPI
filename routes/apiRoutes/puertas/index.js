import express from 'express';
import db from '../../../database';

const router = express.Router();


router.route('/puertas')
    .get(async (req, res) => {
        let query = `select * from puertas;`
        res.json(await db(query));
    })
    .post(async (req, res)=>{
        try{
            let data = JSON.parse(JSON.stringify(req.body));

            let query = `insert into puertas values(
                '${data.pk}',
                '${data.estatus}'
                );`;
            await db(query);

            //console.log(test);

            res.json({
                estatus: 'Puerta agregada correctamente!',
                nuevaPuerta: {data}
            });
        }
        catch(err){
            console.log(err);
        }
        
    })

router.route('/puertas/:pk')
    .get(async (req, res) => {
        let query = `select * from puertas where valor_pta_pk='${req.params.pk}';`;
        res.json(await db(query));
    })
    .delete(async (req, res) => {
        try{
            let query = `delete from puertas where valor_pta_pk='${req.params.pk}';`;
            await db(query);
            res.json({estatus: `Elemento puerta eliminado satisfactoriamente, pk=${req.params.pk}`})
        }
        catch(err){
            console.log(err);
        }
        
    })

module.exports = router;