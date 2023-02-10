export default function routes(router) {
    let fruitController = require('../controllers/fruitController');

    router.get('/fruits', fruitController.list_all_fruits);
    router.post('/fruit', fruitController.create_a_fruit);

    router.get('/fruit/:fruittId', fruitController.read_a_fruits);
    router.put('/fruit/:fruittId', fruitController.update_a_fruit);
    router.delete('/fruit/:fruittId', fruitController.delete_a_fruit);
};  