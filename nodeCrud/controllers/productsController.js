const Product = require("../model/Product");

// get All products
const product_all = async (req, res) => {
	try{
		const products = await Product.find();
		res.render('index.ejs', {quotes:products});
	} catch (error) {
		res.json({ message: error })
	}	
}

const product_details = async (req, res) => {	
	// try{
	// 	const products = await Product.findById(req.params.productId);
	// 	res. render('view.ejs', {quotes:products});
	// } catch (error) {
	// 	res.json({ message: error })
	// }
}

const product_insert = async (req, res) => {	
	res.json('test')
}

const product_create = async (req, res) => {
	const product = new Product({
	title: req.body.title,
	price: req.body.price,
	image: req.body.image,
	details: req.body.details
	});

	try{
		const saveProduct = await product.save();
		res.send(saveProduct);		
	} catch (error) {
		res.status(400).send(error);
	}
}

const product_update = async (req, res) => {
	try{
	const product = {
		title: req.body.title,
		price: req.body.price,
		image: req.body.image,
		details: req.body.details
		};
		const updateProduct = await Product.findByIdAndUpdate(
			{ _id: req.params.productId },
			product			
		);			
			res.json({'message' : 'success', 'status': '1' , 'data': updateProduct});		
		} catch (error) {
			res.json({message : error});
	}
}

const product_delete = async (req, res) => {
	try{	
		const removeProduct = await Product.findByIdAndDelete(
			{ _id: req.params.productId },
		);			
			res.json(removeProduct);		
		} catch (error) {
			res.json({message : error});
	}
}

const product_search = async (req, res) => {
	try{
		const products = await Product.find({ title: req.body.title });
		res.json(products);
	} catch (error) {
		res.json({ message: error })
	}	
}


module.exports = {
    product_all,
	product_details,
	product_insert,
	product_create,
	product_update,
	product_delete,
	product_search
};