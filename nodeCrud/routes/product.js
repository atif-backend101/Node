const router = require("express").Router();
const productController = require('../controllers/productController');

router.get("/", productController.product_all);
router.get("/:productId", productController.product_details);
router.post("/create", productController.product_create);
router.put("/update/:productId", productController.product_update);
router.delete("/delete/:productId", productController.product_delete);
router.post("/search-product", productController.product_search);

module.exports = router; 