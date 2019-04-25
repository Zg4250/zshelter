const pets = require("../controllers/pets");

module.exports = function(app){
    app.get('/pets', pets.getAll);
    app.post('/pets', pets.create);
    app.get('/pets/:_id', pets.getOne);
    app.delete('/pets/:_id',pets.delete);
    app.put('/pets/:_id', pets.update);
}