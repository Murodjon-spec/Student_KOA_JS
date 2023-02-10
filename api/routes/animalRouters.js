export default function routes(router) {
    let studentController = require('../controllers/animalController');

    router.get('/animals', studentController.list_all_animals);
    router.post('/animal', studentController.create_a_animal);

    router.get('/animal/:animaltId', studentController.read_a_animals);
    router.put('/animal/:animaltId', studentController.update_a_animal);
    router.delete('/animal/:animaltId', studentController.delete_a_animal);
};