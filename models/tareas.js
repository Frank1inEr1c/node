const fs = require('fs');
const Tarea = require('./tarea');

class Tareas {
  constructor() {
    this.lista = [];
    this.cargarTareas();
  }

  cargarTareas() {
    try {
      const data = fs.readFileSync('./db/data.json', 'utf-8');
      if (data) {
        this.lista = JSON.parse(data);
      }
    } catch (error) {
      this.lista = [];
    }
  }

  guardarTareas() {
    fs.writeFileSync('./db/data.json', JSON.stringify(this.lista));
  }

  crearTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this.lista.push(tarea);
    this.guardarTareas();
  }

  listarTareas(completadas = null) {
    let listaFiltrada = this.lista;
    if (completadas !== null) {
      listaFiltrada = this.lista.filter((tarea) => tarea.completada === completadas);
    }

    listaFiltrada.forEach((tarea, i) => {
      const estado = tarea.completada ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${(i + 1 + '.').yellow} ${tarea.descripcion} :: ${estado}`);
    });
  }

  completarTareas(ids) {
    ids.forEach((id) => {
      const tarea = this.lista.find((tarea) => tarea.id === id);
      if (tarea) {
        tarea.completada = true;
      }
      tarea.completada = true;
    });
    this.guardarTareas();
  }

  borrarTarea(id) {
    this.lista = this.lista.filter((tarea) => tarea.id !== id);
    this.guardarTareas();
  }
}

module.exports = Tareas;
