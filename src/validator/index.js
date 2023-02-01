const InvariantError = require("../exceptions/InvariantError")
const { AlbumPayloadSchema, SongsPayloadSchema } = require("./schema")

const AlbumsValidation = {
    validateAlbumPayload: (payload) => {
        const validateResult = AlbumPayloadSchema.validate(payload)
        if(validateResult.error){
            throw new InvariantError(validateResult.error.message)
        }
    }
}

const SongsValidation = {
    validateSongPayload: (payload) => {
        const validateResult = SongsPayloadSchema.validate(payload)
        if(validateResult.error){
            throw new InvariantError(validateResult.error.message)
        }
    }
}

module.exports = {
    AlbumsValidation, SongsValidation
}