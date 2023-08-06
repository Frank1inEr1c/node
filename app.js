const { mostrarMenu, pausa } = require('./helpers/mensajes');
const {
  leerDescripcion,
  seleccionarTareaBorrar,
  seleccionarTareasCompletar,
  confirmar,
} = require('./helpers/inquirer');
const { cargarTareas, guardarTareas } = require('./helpers/guardarArchivo');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
  const tareas = new Tareas();

  let opcion = '';
  do {
    opcion = await mostrarMenu();

    switch (opcion) {
      case 'crear':
        const descripcion = await leerDescripcion('Ingrese la descripción de la tarea:');
        tareas.crearTarea(descripcion);
        console.log('Tarea creada con éxito.');
        break;

      case 'listar':
        tareas.listarTareas();
        break;

      case 'listarCompletas':
        tareas.listarTareas(true);
        break;

      case 'listarPendientes':
        tareas.listarTareas(false);
        break;

      case 'completar':
        const tareaIdsCompletar = await seleccionarTareasCompletar(tareas.lista);
        tareas.completarTareas(tareaIdsCompletar);
        console.log('Tarea(s) completada(s) con éxito.');
        break;
      case 'borrar':
        const tareaIdBorrar = await seleccionarTareaBorrar(tareas.lista);
        if (tareaIdBorrar !== '0') {
          const confirmacion = await confirmar('¿Está seguro de que desea borrar esta tarea?');
          if (confirmacion) {
            tareas.borrarTarea(tareaIdBorrar);
            console.log('Tarea borrada con éxito.');
          }
        }
        break;

      case 'salir':
        break;

      default:
        console.log('Opción no válida.');
        break;
    }

    guardarTareas(tareas.lista);
    await pausa();
  } while (opcion !== 'salir');
};

main();
