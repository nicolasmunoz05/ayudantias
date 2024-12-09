import estudianteModel from "../models/estudianteModel.js";
import adminModel from "../models/adminModel.js";
import encargadoModel from "../models/encargadoModel.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await estudianteModel.findOne({
    where: { rut_estudiante: username, contraseña_estudiante: password },
  });
  if (user) {
    const token = jwt.sign(
      {
        username: username,
      },
      process.env.SECRET_KEY
    );
    res.json({ message: "Se encontró un estudiante", token });
  } else {
    const admin = await adminModel.findOne({
      where: {
        rut_administrador: username,
        contraseña_administrador: password,
      },
    });
    if (admin) {
      const token = jwt.sign(
        {
          username: username,
        },
        process.env.SECRET_KEY
      );
      res.json({ message: "Se encontró un admin", token });
    } else {
      const encargado = await encargadoModel.findOne({
        where: { rut_evaluador: username, contraseña_evaluador: password },
      });
      if (encargado) {
        const token = jwt.sign(
          {
            username: username,
          },
          process.env.SECRET_KEY
        );

        res.json({ message: "Se encontró un encargado", token });
      } else {
        res.send("No existe el usuario");
      }
    }
  }
};
