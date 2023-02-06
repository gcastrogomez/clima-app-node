import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";
import * as dotenv from "dotenv";
dotenv.config();

const main = async () => {
  let opt;
  const busqueda = new Busquedas();
  do {
    opt = await inquirerMenu("Seleccione");
    switch (opt) {
      case 1:
        //¿Qué ciudad?
        const lugar = await leerInput("Ciudad: ");
        //Busqueda de lugares con ese nombre
        const lugares= await busqueda.busqueda(lugar);
        //Seleccionar ese lugar
        const id = await listarLugares(lugares);
        if(id==='0') continue;
        const lugarSeleccionado = lugares.find( l => l.id === id);
        //Grabamos la busqueda en el historial
        busqueda.agregarHistorial(lugarSeleccionado.nombre);
        //Su clima
        const climaCiudad = await busqueda.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
        //Mostrar información de la ciudad
        console.log('Información de la ciudad');
        console.log('Nombre: ', lugarSeleccionado.nombre);
        console.log('Latitud: ', lugarSeleccionado.lat);
        console.log('Longitud: ', lugarSeleccionado.lng);
        console.log('Clima: ', climaCiudad.desc);
        console.log('Temperatura: ', climaCiudad.temp);
        console.log('Temperatura mínima: ', climaCiudad.min);
        console.log('Temperatura máxima: ', climaCiudad.max);
        console.log('Humedad: ', climaCiudad.hum); 
        await pausa();
        break;
      case 2:
        busqueda.historialCapitalizado.forEach( (lugar, i) => {
            const idx= `${i+1}.`.green;
            console.log( `${idx} ${lugar}` )
        });
        await pausa();
        break;
    }
  } while (opt !== 0);
};

main();
