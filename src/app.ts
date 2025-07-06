import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
import { MongoAdapter as Database } from '@builderbot/database-mongo'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { curriculumFlow } from './andreaBot/curriculumFlow'
import { commonMessag } from './common/CommonMessages'

const PORT = process.env.PORT ?? 3008

export const welcomeFlow = addKeyword<Provider, Database>(['hi', 'hello', 'hola'])
    .addAnswer(`*¡Hola! 👋*, Gracias por contactarme. `)
    .addAnswer(
        [
            'Por favor, elige una opción:',
            '1️⃣ 📄 Currículum - Te comparto mi CV actualizado.',
            '2️⃣ 📲 Contacto - Mis datos directos para comunicación.',
            '3️⃣ 🤖 Demo del Tremec Bot - Te muestro cómo funciona.',
            '4️⃣ 🚪 Salir - Finalizar conversación.',
            ' ',
            'Espero tu respuesta. ¡Saludos! 😊'
        ].join('\n'),
        { capture: true },
        async (ctx, { fallBack }) => {
            console.log(ctx);
            const options = ["1", "2", "3", "4"];
            if (!options.includes(ctx.body)){
                return fallBack(commonMessag.selectOption(ctx.name))
            }
        },
        [curriculumFlow]
    )


const main = async () => {
    const adapterFlow = createFlow([welcomeFlow])
    
    const adapterProvider = createProvider(Provider)
        const adapterDB = new Database({
        dbUri: "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1",
        dbName: "tremec"
    })

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()
