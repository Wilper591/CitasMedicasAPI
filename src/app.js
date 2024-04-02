const axios = require("axios");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const chalk = require("chalk");
const _ = require("lodash");

const app = express();
const PORT = 3000;

// Ruta para consultar y devolver la lista de usuarios registrados divididos por sexo usando Lodash
app.get("/usuarios", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    const userData = response.data.results.map((user) => ({
      id: "ID: " + uuidv4(),
      name:
        "Nombre: " + user.name.first + " - " + "Apellido: " + user.name.last,
      gender: "Género: " + user.gender,
      timestamp: "Timestamp: " + moment().format("Do MMMM YYYY, h:mm:ss a"),
    }));

    const usuariosGenero = _.groupBy(userData, "gender");
    console.log(chalk.bgBlue.white("Lista de usuarios agrupados por género:"));
    _.forEach(usuariosGenero, (group, gender) => {
      console.log(chalk.bgRed.blue(`${gender}`));
      _.forEach(group, (user) => {
        console.log(
          chalk.bgWhite.blue(`${user.name} - ${user.id} - ${user.timestamp}`)
        );
      });
    });
    res.json(usuariosGenero);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

module.exports = { app, PORT };