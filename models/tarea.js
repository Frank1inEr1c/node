class Tarea {
    constructor(descripcion) {
      this.id = new Date().getTime().toString();
      this.descripcion = descripcion;
      this.completada = false;
    }
  }
  
  module.exports = Tarea;
  