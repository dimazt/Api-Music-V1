const autoBind = require("auto-bind")
const { validateAlbumPayload } = require("../../validator/album")

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service,
            this._validator = validator

        autoBind(this)
    }

    async postAlbumHandler(request, h) {
        this._validator = validateAlbumPayload(request.payload)
        const { name, year } = request.payload
        const albumId = await this._service.addAlbum({ name, year })

        const response = h.response({
            status: 'success',
            data: { albumId }
        })
        response.code(201)
        return response
    }

    async getAlbumByIdHandler(request, h) {
        const { id } = request.params
        const album = await this._service.getAlbumById(id)
        const response = {
            status: 'success',
            data: {
                album
            }
        }
        return response
    }

    async putAlbumByIdHandler(request, h){
        const {id} = request.params
        this._validator = validateAlbumPayload(request.payload)
        await this._service.editAlbumById(id, request.payload)

        return {
            status: 'success',
            message: 'Berhasil memperbarui album'
        }
    }

    async deleteAlbumByIdHandler(request, h){
        const { id } = request.params;
        await this._service.deleteAlbumById(id);
        return {
          status: 'success',
          message: 'Album berhasil di hapus',
        };
    }
}

module.exports = AlbumsHandler