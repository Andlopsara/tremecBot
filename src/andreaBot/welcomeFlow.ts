import { addKeyword, EVENTS } from "@builderbot/bot";
import { curriculumFlow } from "./curriculumFlow";
import { commonMessag } from "~/common/CommonMessages";
import { demoBotFlow} from './demoBotFlow';

export const welcomeFlow = addKeyword(EVENTS.WELCOME || EVENTS.VOICE_NOTE )
    .addAnswer(`*¡Hola! 👋*, Gracias por contactarme. `)
    .addAnswer("Estoy muy interesada en la oportunidad de formar parte de TREMEC 🤝, por lo que decidí realizar este MVP 🚀 para que puedan conocer mis habilidades 💻.")
    .addAnswer(
        [
            'Por favor, elige una opción:',
            '1️⃣ 📄 Currículum - Te comparto mi CV actualizado.',
            '2️⃣ 🤖 Demo del Tremec Bot - Te muestro cómo funciona.',
            '3️⃣ 🚪 Salir - Finalizar conversación.',
            ' ',
            'Espero tu respuesta. ¡Saludos! 😊'
        ].join('\n'),
        { capture: true },
        async (ctx, { fallBack ,provider ,endFlow}) => {
            const options = ["1", "2", "3"];
            if(ctx.body === "3"){
                return endFlow(commonMessag.endMessage);
            }
            if (!options.includes(ctx.body)){
                return fallBack(commonMessag.selectOption(ctx.name))
            }
        },
        [curriculumFlow, demoBotFlow]
    )