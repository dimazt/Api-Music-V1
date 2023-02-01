const InvariantError = require("../../exceptions/InvariantError")
const { AlbumPayloadSchema} = require("./schema")

const AlbumsValidation = {
    validateAlbumPayload : (payload) => {
        const validateResult = AlbumPayloadSchema.validate(payload)
        if(validateResult.error){
            throw new InvariantError(validateResult.error.message)
        }
    }
}

module.exports = AlbumsValidation
