import express from 'express';
import db from '../../../database';

const router = express.Router();

router.route('/t_consecutivos')
    .get(async (req, res) => {
        let query = `select * from t_consecutivos;`
        res.json(await db(query));
    });

router.route('/t_consecutivos/:pk')
    .get(async (req, res) => {
        let query = `select * from t_usuarios where cedula_usu_pk=${req.params.pk};`;
        res.json(await db(query));
    })
    .delete(async (req, res) => {
        let query = `delete from t_usuarios where cedula_usu_pk=${req.params.pk};`;
        await db(query);
        res.json({estatus: `Elemento eliminado satisfactoriamente, pk=${req.params.pk}`})
    })

module.exports = router;