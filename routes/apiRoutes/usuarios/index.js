import express from "express";
import db from "../../../database";

const router = express.Router();

// ruta para actualizar el passwd
router.route("/usuarios/cp/:pk/:newPwd").get(async (req, res) => {
  let query = `update usuarios set passwd_usu='${req.params.newPwd}' where cedula_usu_pk=${req.params.pk};`;
  await db(query);
  res.json({ estatus: "Password actualizado satisfactoriamente" });
});

router.route("/usuarios/:pk/:newRole").get(async (req, res) => {
  let query = `update usuarios set rol_usu=${req.params.newRole} where cedula_usu_pk=${req.params.pk};`;
  await db(query);
  res.json({ estatus: "Rol actualizado satisfactoriamente" });
});

router
  .route("/usuarios")
  .get(async (req, res) => {
    let query = `select * from usuarios;`;
    res.json(await db(query));
  })
  .post(async (req, res) => {
    try {
      let data = JSON.parse(Object.keys(req.body)[0]);

      let query = `insert into usuarios values(
          '${data.pk}',
          '${data.nombre}',
          '${data.usuario}',
          '${data.password}',
          '${data.email}',
          '${data.preg}',
          '${data.res}',
          ${data.epsafecode},
          ${data.eppassword},
          ${data.rol}
          );`;
      await db(query);

      //console.log(test);

      res.json({
        estatus: "Usuario agregado correctamente!",
        nuevoUsuario: { data },
      });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/usuarios/:pk")
  .get(async (req, res) => {
    let query = `select * from usuarios where cedula_usu_pk='${req.params.pk}';`;
    res.json(await db(query));
  })
  .delete(async (req, res) => {
    try {
      let query = `delete from usuarios where cedula_usu_pk='${req.params.pk}';`;
      await db(query);
      res.json({
        estatus: `Elemento eliminado satisfactoriamente, pk='${req.params.pk}'`,
      });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
