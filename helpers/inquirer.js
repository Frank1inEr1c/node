const inquirer = require('inquirer');
const colors = require('colors');

const mostrarMenu = async () => {
  console.clear();
  console.log('======================================'.green);
  console.log('      Seleccione una opción'.rainbow);
  console.log('======================================\n'.green);

  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué desea hacer?',
      choices: [
        { value: 'crear', name: `${'1.'.green} Crear tarea` },
        { value: 'listar', name: `${'2.'.green} Listar tareas` },
        { value: 'listarCompletas', name: `${'3.'.green} Listar tareas completas` },
        { value: 'listarPendientes', name: `${'4.'.green} Listar tareas pendientes` },
        { value: 'completar', name: `${'5.'.green} Completar tarea(s)` },
        { value: 'borrar', name: `${'6.'.green} Borrar tarea` },
        { value: 'salir', name: `${'0.'.green} Salir` },
      ],
    },
  ]);

  return opcion;
};

const pausa = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'pausa',
      message: `Presione ${'Enter'.green} para continuar`,
    },
  ]);
};

const leerDescripcion = async (message) => {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return 'Por favor ingrese una descripción válida';
        }
        return true;
      },
    },
  ]);
  return descripcion;
};

const seleccionarTareaBorrar = async (tareas) => {
  const choices = tareas.map((tarea, i) => ({
    value: tarea.id,
    name: `${(i + 1 + '.').green} ${tarea.descripcion}`,
  }));

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  });

  const { tareaId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tareaId',
      message: 'Seleccione una tarea para borrar:',
      choices,
    },
  ]);

  return tareaId;
};

const seleccionarTareasCompletar = async (tareas) => {
  const choices = tareas.map((tarea, i) => ({
    value: tarea.id,
    name: `${(i + 1 + '.').green} ${tarea.descripcion}`,
    checked: tarea.completada ? true : false,
  }));

  const { tareaIds } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'tareaIds',
      message: 'Seleccione las tareas a completar:',
      choices,
    },
  ]);

  return tareaIds;
};

const confirmar = async (message) => {
  const { confirmacion } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmacion',
      message,
    },
  ]);

  return confirmacion;
};

module.exports = {
  mostrarMenu,
  pausa,
  leerDescripcion,
  seleccionarTareaBorrar,
  seleccionarTareasCompletar,
  confirmar,
};