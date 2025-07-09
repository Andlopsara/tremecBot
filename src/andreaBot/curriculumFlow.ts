import { join } from 'path'
import {  addKeyword } from '@builderbot/bot'
import { commonMessag } from '~/common/CommonMessages'; //Para mensajes comunes
import { welcomeFlow } from './welcomeFlow';//Bienvenida al usuario 



    export const curriculumFlow = addKeyword("1")
    .addAnswer(">Curriculum📄")
    .addAnswer(`Estoy muy interesada en la oportunidad de formar parte de TREMEC 🤝, por lo que decidí realizar este MVP 🚀 para que puedan conocer mis habilidades 💻. Muchas gracias por su tiempo y consideración . Sin más, les comparto mi currículum 📄.`, 
        { media: join(process.cwd(), 'assets', '/AndreaLópez_CV.pdf') }
    )
    .addAnswer(
        [
            "Elige una opción:",
            "1️⃣ Regresar al menú principal 🏠",
            "2️⃣ Salir 🚪",
        ].join('\n'),
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
        },
    );