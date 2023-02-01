const AlbumsService = require("./service/postgress/AlbumsService")
const SongsService = require("./service/postgress/SongsService")

const Hapi = require('@hapi/hapi')
const ClientError = require("./exceptions/ClientError")
const songs = require("./api/songs")
const SongsValidation = require("./validator/song")
const albums = require("./api/albums")
const { AlbumsValidation } = require("./validator/album")
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
          plugin: albums,
          options: {
            service: albumService,
            validator: AlbumsValidation
          },
        },
        {
          plugin: songs,
          options: {
            service: songService,
            validator: SongsValidation,
          },
        },
      ]);
    await server.ext('onPreResponse', (request, h) => {
        const { response } = request

        if (response instanceof Error) {
            if (response instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message
                })
                newResponse.code(response.statusCode)
                return newResponse
            }

            if (!response.isServer) {
                return h.continue
            }

            // penanganan server error sesuai kebutuhan
            const newResponse = h.response({
                status: 'error',
                message: 'terjadi kegagalan pada server kami',
            });
            newResponse.code(500);
            return newResponse;
        }

        // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
        return h.continue;
    })
    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init()