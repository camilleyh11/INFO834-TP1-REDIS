//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/controllerRedis');

//GET
router.get("/readRedis", (req, res) => {
    controller.readRedis(req, res);
});

//POST
router.post("/addRedis", (req, res) => {
    controller.addRedis(req, res);
});

module.exports = router;