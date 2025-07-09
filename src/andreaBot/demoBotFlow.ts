import { join } from 'path'
import {  addKeyword } from '@builderbot/bot'
import { commonMessag } from '~/common/CommonMessages';//Para mensajes comunes
import { welcomeFlow } from './welcomeFlow'; //Bienvenida al usuario 

// Opción 3
const Recursos = addKeyword(["3"])
  .addAnswer(
    [
      "> ¿Qué opción le interesa?",
      "",
      "1️⃣ Regresar al menú principal 🏠",
      "2️⃣ Objetivo del Bot",
      "3️⃣ Recursos Humanos 👤",
      "4️⃣ Salir",
    ].join("\n"),
    { capture: true },
    async (ctx, { fallBack, endFlow, gotoFlow }) => {
      const validOptions = ["1", "2", "3", "4"];
      if (ctx.body === "4") {
        return endFlow(commonMessag.endMessage); 
      }
      if (ctx.body === "1") {
        return gotoFlow(welcomeFlow);
      }
      if (!validOptions.includes(ctx.body)) {
        return fallBack(commonMessag.selectOption(ctx.name)); 
      }
    }
  );

//La opcion 2 es el Objetivo del bot. Función para Objetivo
const Objetivo = addKeyword (["2"])
   .addAnswer(
        [
          "Este Bot es un demo y fue desarrollado para demostrar como es que funciona.",
          "El Bot puede servir para apoyar a los colaboradores de Tremec en tareas internas, como:",
          "Reportes rápidos, consultas técnicas, gestión de turno y trámites de recursos humanos.",
          "El principal objetivo es facilitar el acceso a la información y mejorar la eficiencia operativa dentro de la planta,",
          "puede ser un Bot con intenligencia artifical que nos ayude a tener respuestas más especificas y tambíen podemos hacer que nos devuelva archivos pdf"  
        ].join ('\n')
   ).addAnswer(
        [
            "¿Te puedo asistir con algo más?",
            "1️⃣ Regresar al menú",
            "2️⃣ Finalizar conversación",
        ].join ('\n'),
        { capture: true },
        async (ctx, { fallBack,endFlow, gotoFlow}) => {
            const validOptions = ["1","2"];
        if(ctx.body === "2"){
                return endFlow(commonMessag.endMessage);
            }else if(ctx.body === "1"){
                return gotoFlow(welcomeFlow);
            }
            if (!validOptions.includes(ctx.body)) {
                 return fallBack(commonMessag.selectOption(ctx.name));
            }
        }
    );


//La opción 1 es el regrso al menu


// Menu del demoBot
    export const demoBotFlow = addKeyword("2")//numero de opción que el usuario puede elegir
    .addAnswer("🤖 Demo del Tremec Bot - Te muestro cómo funciona.")
    .addAnswer(`👩🏽‍💻 ¡Hola! Soy Dana la asistente virtual de Tremec, por el momento soy un demo. ¿En qué puedo ayudarte hoy?`)
    .addAnswer(
        [
            "Elige una opción:",
            "1️⃣ Regresar al menú principal 🏠",
            "2️⃣ Objetivo del Bot",
            "3️⃣ Recursos Humanos 👤",
            "4️⃣ Información Técnica 📑",
            "5️⃣ Salir 🚪",
        ].join('\n'),
        { capture: true },
        async (ctx, { fallBack,endFlow, gotoFlow}) => {
            const validOptions = ["1","2","3","4","5"];
            if(ctx.body === "5"){
                return endFlow(commonMessag.endMessage);
            }else if(ctx.body === "1"){
                return gotoFlow(welcomeFlow);
            }

            if (!validOptions.includes(ctx.body)) {
                 return fallBack(commonMessag.selectOption(ctx.name));
            }
        },
        [
            Objetivo, Recursos, Informacion, Turnos
        ]
    );