import express from 'express';

const router = express.Router();

module.exports = (db) => {

    // USUARIOS
    router.route('/t_usuarios')
        .get(async (req, res) => {
            let query = `select * from t_usuarios;`
            res.json(await db(query));
        });

    router.route('/t_usuarios/:pk')
        .get(async (req, res) => {
            let query = `select * from t_usuarios where cedula_usu_pk=${req.params.pk};`;
            res.json(await db(query));
        })
        .delete(async (req, res) => {
            let query = `delete from t_usuarios where cedula_usu_pk=${req.params.pk};`;
            await db(query);
            res.json({estatus: `Elemento eliminado satisfactoriamente, pk=${req.params.pk}`})
        })

    return router;
};