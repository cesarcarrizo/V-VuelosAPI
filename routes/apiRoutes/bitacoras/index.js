import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/bitacoras")
  .get(async (req, res) => {
    let query = `select * from bitacoras;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into bitacoras values(
                '${data.cedula}',
                ${data.rol},
                '${data.fechahora}',
                ${data.transanccion}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Bitácora agregada correctamente!",
        nuevoBitacora: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/bitacoras/:pk")
  .get(async (req, res) => {
    let query = `select * from bitacoras where bitacora_pk=${req.params.pk};`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from usuarios where bitacora_pk=${req.params.pk};`;
      await db(query);
      res.json({
        estatus: `Elemento bitácora eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
