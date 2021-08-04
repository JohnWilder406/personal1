const mongoose = require('mongoose');
const {conn2} = require('../config/mongoose.config')
const uniqueValidator = require('mongoose-unique-validator');

const ClimbSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    difficulty: {
        type: Number,
    },
    firstAscent: {
        type: String,
    },
    ascents: [],
})

const WallSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "Wall Name is required"],
    },

    angle: {
        type: Number,
        required: [true, "Wall Angle is required"]
    },

    height: {
        type: Number,
        required: [true, "Wall Height is required"]
    },

    climbs: [ClimbSchema],

}, {timestamps: true});

WallSchema.plugin(uniqueValidator, {message: 'Error: wall name must be unique'})

const wallModel = conn2.model('Walls', WallSchema);

module.exports = wallModel;