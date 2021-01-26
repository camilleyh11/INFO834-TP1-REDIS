//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/controllerUser');

//CREATE
router.post("/user", (req, res) => {   
    controller.create(req, res);
});

//READ
router.get("/users", (req, res) => {  
    controller.reads(req, res);  
});

router.get("/user/:id", (req, res) => {
    controller.read(req, res);
});

//UPDATE
router.put("/user/:id", (req, res) => {
    controller.update(req, res);
});

//DELETE
router.delete("/user/:id", (req, res) => {   
    controller.delete(req, res);
});

module.exports = router;