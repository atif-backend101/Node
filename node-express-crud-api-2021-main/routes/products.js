const router = require("express").Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const auth = require('../middleware/auth');
const connectEnsureLogin = require('connect-ensure-login');
const express = require("express");
const jwt = require("jsonwebtoken")
// app.use(setCurrentUser);
    
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log("storage definition")
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        console.log("filname definition ========> ",file)

        cb(null, (Date.now() + file.originalname.toString()).toString());
    }
});

const fileFilter = (req, file, cb) => {
    console.log("checking mimeType")
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get("/logout", productsController.logout);
router.get("/login", productsController.login);

router.post("/login_check", productsController.login_check);

router.post("/", upload.single('file'), productsController.product_create);
router.get("/",  productsController.product_all);
router.get("/add",  productsController.product_add);
router.get("/view/:productId",  productsController.product_view);
router.get("/edit/:productId", productsController.product_edit);
router.get("/:productId", productsController.product_details);
router.post("/update/:productId", productsController.product_update);
router.get("/remove/:productId", productsController.product_delete);

module.exports = router;
