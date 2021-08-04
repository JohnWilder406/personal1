const Walls = require("../models/wall.model");

module.exports.createWall = (req,res) => {
    const {name, duration, difficulty} = req.body;
    Walls.create({
        name,
        angle,
        height
    })
        .then(wall=> res.json(wall))
        .catch(err => res.json(err))
}

module.exports.getAllWalls = (req,res) => {
    Walls.find({})
        .then(walls => res.json(walls))
        .catch(err => res.json(err))
}

module.exports.getWall = (req,res) => {
    Walls.findOne({_id: req.params.id})
        .then(wall => res.json(wall))
        .catch(err => res.json(err))
}

// module.exports.getWorkout = (req, res) => {
//     Training.findById(req.params.id)
//         .then(workout => res.json(workout))
//         .catch(err => res.json(err))
// }

module.exports.updateWall= (req, res) => {
    Walls.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
        context: "query"
    })
        .then(updatedWall => res.json(updatedWall))
        .catch(err => res.json(err))
}

module.exports.deleteWall = (req,res) => {
    Walls.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.createClimb= (req, res) => {
    Walls.updateOne({'_id': req.params.id},
        {$push: {
            climbs: req.body.climb
        }})
        .then(updatedWall => res.json(updatedWall))
        .catch(err => res.json(err))
}

// module.exports.updateClimb = (req, res) => {
//     Walls.updateOne({'climbs._id': req.params.id},
//         {'$set': {
//             'climbs.$.name': req.body.workout.name,
//             'climbs.$.difficulty': req.body.workout.duration,
//             'climbs.$.intensity': req.body.workout.intensity,
//             'workouts.$.difficulty': req.body.workout.difficulty,
//             'workouts.$.frequency': req.body.workout.frequency
//         }})
//         .then(updatedWorkout => res.json(updatedWorkout))
//         .catch(err => res.json(err))
// }


module.exports.deleteClimb = (req, res) => {
    Walls.findByIdAndUpdate(
        req.params.id, {
            $pull: {
                "climbs": {_id: req.params.climbid}
            }
        }, {safe: true, upsert: true},
    )
        .then(updatedWall => res.json(updatedWall))
        .catch(err => res.json(err))
}