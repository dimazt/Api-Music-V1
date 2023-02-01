const AlbumsService = require("./service/postgress/AlbumsService")
const SongsService = require("./service/postgress/SongsService")

const Hapi = require('@hapi/hapi')
const { AlbumsValidation, SongsValidation } = require("./validator")
const song = require('./api/songs')      
const album = require('./api/album')      
require('dotenv').config()
const init = async () => {
    const albumService = new AlbumsService()
    const songService = new SongsService()
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })

    await server.register([
        {
            plugin : album ,
            options: {
                service : albumService,
                validator : AlbumsValidation
            }
        },
        {
            plugin: song,
            options: {
                service: songService,
                validator: SongsValidation
            }
        }
    ])

    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`);
} 

init()