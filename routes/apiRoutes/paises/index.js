import express from "express";
import db from "../../../database";

const router = express.Router();

router
  .route("/paises")
  .get(async (req, res) => {
    let query = `select * from paises;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into paises values(
                '${data.pk}',
                '${data.nombre}',
                '${data.url_img}'
                );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "País agregado correctamente!",
        nuevoPais: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/paises/:pk")
  .get(async (req, res) => {
    let query = `select * from paises where valor_pais_pk='${req.params.pk}';`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from paises where valor_pais_pk='${req.params.pk}';`;
      await db(query);
      res.json({
        estatus: `Elemento pais eliminado satisfactoriamente, pk=${req.params.pk}`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
