import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/consecutivos")
  .get(async (req, res) => {
    let query = `select * from consecutivos;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into consecutivos values(
                '${data.tabla}',
                '${data.primarykey}',
                ${data.estatus}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Consecutivo agregado correctamente!",
        nuevoConsecutivo: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/consecutivos/:pk")
  .get(async (req, res) => {
    let query = `select * from consecutivos where codigo_c_pk=${req.params.pk};`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from consecutivos where codigo_c_pk=${req.params.pk};`;
      await db(query);
      res.json({
        estatus: `Elemento consecutivo eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
