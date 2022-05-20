const router = require("express").Router();
const productsController = require('../controllers/productsController');

router.get("/", productsController.product_all);
router.get("/:productId", productsController.product_details);
router.get("/clr", productsController.product_insert);
router.post("/create", productsController.product_create);
router.put("/update/:productId", productsController.product_update);
router.delete("/delete/:productId", productsController.product_delete);
router.post("/search-product", productsController.product_search);

module.exports = router; 