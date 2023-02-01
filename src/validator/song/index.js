const InvariantError = require("../../exceptions/InvariantError")
const {SongsPayloadSchema } = require("./schema")

const SongsValidation = {
    validateSongPayload : (payload) => {
        const validateResult = SongsPayloadSchema.validate(payload)
        if(validateResult.error){
            throw new InvariantError(validateResult.error.message)
        }
    }
}

module.exports = SongsValidation
