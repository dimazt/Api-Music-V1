const Joi = require('joi')

const AlbumPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required()
})

const SongsPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performner: Joi.string().required(),
    duration: Joi.number(),
    albumId: Joi.string()
})

module.exports = { AlbumPayloadSchema, SongsPayloadSchema }