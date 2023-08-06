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

module.exports = {
  mostrarMenu,
  pausa,
};
