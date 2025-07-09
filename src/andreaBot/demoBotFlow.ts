import { join } from 'path'
import {  addKeyword } from '@builderbot/bot'
import { commonMessag } from '~/common/CommonMessages';//Para mensajes comunes
import { welcomeFlow } from './welcomeFlow'; //Bienvenida al usuario 
import { uptime } from 'os';

//La opcion 6 es para mostrar los productos de la empresa
const Productos = addKeyword(["6"])
  .addAnswer(
    "📦 *Productos de Tremec*",
  )
  .addAnswer(
    [
      "Aquí tienes algunos catálogos y recursos disponibles:",
      "",
      "🔗 *Catálogo de alto rendimiento (PDF)*",
      "https://tremec.com/wp-content/uploads/2023/09/TREMEC_Performance.pdf",
      "",
      "📘 *Manual técnico TR-3450 en español*",
      "https://www.engranesimportados.com/catalogos/TR3450_ServiceManual_Spanish.pdf",
      "",
      "🌐 *Sitio oficial - Literatura técnica*",
      "https://tremec.com/aftermarket/resources/product-literature/",
    ].join('\n')
  )
  .addAnswer(
    [
      "¿Te puedo asistir con algo más?",
      "1️⃣ Regresar al menú",
      "2️⃣ Finalizar conversación"
    ].join('\n'),
    { capture: true },
    async (ctx, { fallBack, endFlow, gotoFlow }) => {
      const opcion = ctx.body;
      const validOptions = ["1", "2"];

      if (opcion === "2") {
        return endFlow(commonMessag.endMessage);
      } else if (opcion === "1") {
        return gotoFlow(welcomeFlow);
      } else {
        return fallBack(commonMessag.selectOption(ctx.name));
      }
    }
  );

//La opcion 5 es para la agendar una cita tecnica
const Cita = addKeyword(["5"])
  .addAnswer("🛠️ *Agendar Cita Técnica para Asesoría*")
  .addAnswer("¿Sobre qué tema necesitas la asesoría técnica?", { capture: true }, async (ctx, { state, flowDynamic }) => {
    await state.update({ temaAsesoria: ctx.body });

    await flowDynamic("¿Qué día y hora te gustaría agendar la cita? (Ejemplo: 12 de julio a las 10:00 AM)");
  })
  .addAnswer("", { capture: true }, async (ctx, { state, flowDynamic }) => {
    const fechaHora = ctx.body;
    const datos = await state.getMyState();

    console.log(`📅 Cita técnica solicitada:\nTema: ${datos.temaAsesoria}\nFecha y hora: ${fechaHora}`);

    await flowDynamic([
      `✅ Tu cita técnica ha sido registrada.`,
      `📝 *Tema:* ${datos.temaAsesoria}`,
      `📅 *Fecha y hora:* ${fechaHora}`,
      "",
      "¿Te puedo asistir con algo más?",
      "1️⃣ Regresar al menú",
      "2️⃣ Finalizar conversación"
    ].join('\n'));
  })
  .addAnswer("", { capture: true }, async (ctx, { endFlow, gotoFlow, fallBack }) => {
    const opcion = ctx.body.trim();
    const validOptions = ["1", "2"];

    if (opcion === "2") {
      return endFlow("✅ ¡Gracias por usar el bot! Hasta pronto.");
    } else if (opcion === "1") {
      return gotoFlow(welcomeFlow);
    } else {
      return fallBack("⚠️ Por favor, elige una opción válida:\n1️⃣ Regresar al menú\n2️⃣ Finalizar conversación");
    }
  });


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
export const demoBotFlow = addKeyword("2")
  .addAnswer("🤖 Demo del Tremec Bot - Te muestro cómo funciona.")
  .addAnswer(`👩🏽‍💻 ¡Hola! Soy Dana, la asistente virtual de Tremec. ¿En qué puedo ayudarte hoy?`)
  .addAnswer(
    [
      "Elige una opción:",
      "1️⃣ Regresar al menú principal 🏠",
      "2️⃣ Objetivo del Bot",
      "3️⃣ Recursos Humanos 👤",
      "4️⃣ Información técnica 📑",
      "5️⃣ Agenda una cita técnica 📅",
      "6️⃣ Conoce nuestros productos 📦",
      "7️⃣ Salir 🚪",
    ].join('\n'),
    { capture: true },
    async (ctx, { fallBack, endFlow, gotoFlow }) => {
      const option = ctx.body;
      const validOptions = ["1", "2", "3", "4", "5", "6", "7"];

      if (!validOptions.includes(option)) {
        return fallBack(commonMessag.selectOption(ctx.name));
      }
      if (option === "7") return endFlow(commonMessag.endMessage);
      if (option === "1") return gotoFlow(welcomeFlow);
      if (option === "2") return gotoFlow(Objetivo);
      if (option === "3") return gotoFlow(Recursos);
      if (option === "4") return gotoFlow(Informacion);
      if (option === "5") return gotoFlow(Cita);
      if (option === "6") return gotoFlow(Productos);
    },
    [
        Objetivo, Recursos, Informacion, Cita, Productos
    ]
);