import { join } from 'path'
import {  addKeyword } from '@builderbot/bot'
import { commonMessag } from '~/common/CommonMessages';//Para mensajes comunes
import { welcomeFlow } from './welcomeFlow'; //Bienvenida al usuario 
import { uptime } from 'os';


//La opcion 4 es para la informacion de la empresa 
const Informacion= addKeyword(["4"]) 
  .addAnswer(
    [
      "📌Información sobre Tremec",
      "",
      "Tremec es una empresa líder en el diseño y manufactura de transmisiones, sistemas de propulsión y soluciones para vehículos de alto rendimiento.",
      "",
      "Con presencia internacional y centros de operaciones en México, EE.UU. y Bélgica, Tremec forma parte de Grupo KUO, un conglomerado industrial mexicano.",
      "",
      "La empresa se especializa en soluciones para las industrias automotriz, de vehículos comerciales y de competencia.",
    ].join('\n')
  )
  .addAnswer(
    [
      "¿Te puedo asistir con algo más?",
      "1️⃣ Regresar al menú",
      "2️⃣ Finalizar conversación",
    ].join('\n'),
    { capture: true },
    async (ctx, { fallBack, endFlow, gotoFlow }) => {
      const validOptions = ["1", "2"];
      if (ctx.body === "2") {
        return endFlow(commonMessag.endMessage);
      } else if (ctx.body === "1") {
        return gotoFlow(welcomeFlow);
      }
      if (!validOptions.includes(ctx.body)) {
        return fallBack(commonMessag.selectOption(ctx.name));
      }
    }
  );

// La opcion 3 es de recursos humanos del bot. Función para Recursos Humanos
const Recursos = addKeyword(["3"])
  .addAnswer(
    [
      "> ¿Qué opción le interesa?",
      "",
      "1️⃣ Regresar al menú principal 🏠",
      "2️⃣ Solicitar vacaciones",
      "3️⃣ Acceder a cursos y capacitaciones",
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
    },
    [
      //para cursos y capacitaciones
      addKeyword(["3"]) 
      .addAnswer("> Acceso a Cursos y Capacitaciones")
      .addAnswer("¿Qué curso o capacitación deseas tomar?", { capture: true }, async (ctx, { state, flowDynamic }) => {
        const cursoSolicitado = ctx.body;
        await state.update({ cursoSolicitado });
        console.log(`🎓 Solicitud de capacitación enviada: ${cursoSolicitado}`);
        await flowDynamic([
          `✅ Se ha registrado tu solicitud para el curso/capacitación: *${cursoSolicitado}*.`,
          "",
          "¿Te puedo asistir con algo más?",
          "1️⃣ Regresar al menú",
          "2️⃣ Finalizar conversación"
        ].join('\n'));
      })
      .addAnswer("", { capture: true }, async (ctx, { endFlow, gotoFlow, fallBack }) => {
        const opcion = ctx.body;
        const validOptions = ["1", "2"];

        if (opcion === "2") {
          return endFlow(commonMessag.endMessage);
        } else if (opcion === "1") {
          return gotoFlow(welcomeFlow);
        } else {
          return fallBack(commonMessag.selectOption(ctx.name));
        }
      }),
      //para solicitar vacaciones
      addKeyword(["2"])
      .addAnswer("> Solicitar Vacaciones")
      .addAnswer("¿Qué día deseas solicitar tus vacaciones?", {capture: true}, async (createContext, {state, flowDynamic}) => {
        const fechaSolicitada = createContext.body;
        await state.update({vacacionesSolicitadas: fechaSolicitada});
        console.log(`📩 Solicitud enviada a Recursos Humanos: ${fechaSolicitada}`);
        await flowDynamic([
          `✅ Se ha registrado tu solicitud de vacaciones para el *${fechaSolicitada}*.`,
          "",
          "¿Te puedo asistir con algo más?",
          "1️⃣ Regresar al menú",
          "2️⃣ Finalizar conversación"
        ].join('\n'));
      })
      .addAnswer("", { capture: true }, async (ctx, { endFlow, gotoFlow, fallBack }) => {
        const validOptions = ["1", "2"];
        const opcion = ctx.body;
        if (opcion === "2") {
          return endFlow(commonMessag.endMessage);
        } else if (opcion === "1") {
          return gotoFlow(welcomeFlow);
        } else {
          return fallBack(commonMessag.selectOption(ctx.name));
        }
      }),
    ]
  );

//La opcion 2 es el Objetivo del bot. Función para Objetivo
const Objetivo = addKeyword (["2"])
   .addAnswer(
        [
          "Este Bot es un demo y fue desarrollado para demostrar como es que funciona.",
          "",
          "El Bot puede servir para apoyar a los colaboradores de Tremec en tareas internas, como:",
          "",
          "Reportes rápidos, consultas técnicas, gestión de turno y trámites de recursos humanos.",
          "",
          "El principal objetivo es facilitar el acceso a la información y mejorar la eficiencia operativa dentro de la planta,",
          "",
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
//.........
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
            Objetivo, Recursos, Informacion
        ]
    );