const WallController = require('../controllers/wall.controller');

module.exports = function(app){
    app.get('/api/walls', WallController.getAllWalls);
    app.get('/api/walls/:id', WallController.getWall);
    app.post('/api/walls/add_wall', WallController.createWall);
    app.put('/api/walls/:id', WallController.updateWall);
    app.delete('/api/walls/:id',WallController.deleteWall);
    app.put('/api/walls/:id/add_climb', WallController.createClimb);
    // app.put('/api/walls/:id/edit_climb', TrainingController.updateWorkout);
    app.put('/api/walls/:id/delete/:climbid', WallController.deleteClimb);
}