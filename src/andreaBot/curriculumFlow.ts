import { join } from 'path'
import {  addKeyword } from '@builderbot/bot'

export const curriculumFlow = addKeyword(['hi', 'hello', 'hola'])
    .addAnswer(`*¡Hola! 👋*, Gracias por contactarme. Por favor, elige una opción:`)
    .addAnswer(
        [
            '1️⃣ 📄 Currículum - Te comparto mi CV actualizado.',
            '2️⃣ 📲 Contacto - Mis datos directos para comunicación.',
            '3️⃣ 🤖 Demo del Tremec Bot - Te muestro cómo funciona.',
            '4️⃣ 🚪 Salir - Finalizar conversación.',
            ' ',
            'Espero tu respuesta. ¡Saludos! 😊'
        ].join('\n'),
        { capture: true },
        async (ctx, { fallBack }) => {
            if (!ctx.body.toLocaleLowerCase().includes('doc')) {
                return fallBack('You should type *doc*')
            }
            return
        }
    )