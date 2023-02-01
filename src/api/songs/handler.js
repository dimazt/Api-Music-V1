const autoBind = require('auto-bind')
const { validateSongPayload } = require('../../validator/song');

class SongsHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator
        autoBind(this)
        // this.postSongHandler = this.postSongHandler.bind(this);
        // this.getSongsHandler = this.getSongsHandler.bind(this);
        // this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        // this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        // this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        this._validator = validateSongPayload(request.payload)
        const { title, year, performer, genre, duration, albumId} = request.payload
        const songId = await this._service.addSong({ title, year,performer, genre, duration, albumId })

        const response = h.response({
            status: 'success',
            data: { songId }
        })
        response.code(201)
        // console.log(response);
        return response

    }

    async getSongsHandler() {
        const songs = await this._service.getSongs()
        // console.log(songs);
        return {
            status: 'success',
            data : { songs }
        }
    }

    async getSongByIdHandler(request, h) {
        const { id } = request.params
        const song = await this._service.getSongById(id)
        const response = {
            status: 'success',
            data: {
                song
            }
        }
        return response
    }

    async putSongByIdHandler(request, h) {
        const {id} = request.params
        this._validator = validateSongPayload(request.payload)
        await this._service.editSongById(id, request.payload)

        return {
            status: 'success',
            message: 'Berhasil memperbarui song'
        }
    }

    async deleteSongByIdHandler(request, h) {
        const { id } = request.params;
        await this._service.deleteSongById(id);
        return {
          status: 'success',
          message: 'Song berhasil di hapus',
        };
    }
}

module.exports = SongsHandler