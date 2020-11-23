import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/errores")
  .get(async (req, res) => {
    let query = `select * from errores;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into errores values(
                '${data.pk}',
                '${data.locacion}',
                '${data.hora}',
                '${data.fecha}',
                ${data.tipo}
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Error agregado correctamente!",
        nuevoError: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/errores/:pk")
  .get(async (req, res) => {
    let query = `select * from errores where valor_err_pk='${req.params.pk}';`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from errores where valor_err_pk='${req.params.pk}';`;
      await db(query);
      res.json({
        estatus: `Elemento eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
