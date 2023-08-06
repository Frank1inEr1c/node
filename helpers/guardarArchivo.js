const fs = require('fs');

// Rutas de archivos
const archivoTareas = './db/data.json';

// Carga las tareas desde el archivo JSON
const cargarTareas = () => {
  try {
    return JSON.parse(fs.readFileSync(archivoTareas, 'utf8'));
  } catch (error) {
    return [];
  }
};

// Guarda las tareas en el archivo JSON
const guardarTareas = (tareas) => {
  fs.writeFileSync(archivoTareas, JSON.stringify(tareas));
};

module.exports = {
  cargarTareas,
  guardarTareas,
};
