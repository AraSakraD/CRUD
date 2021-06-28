/*jshint esversion: 6 */

const express = require('express');
const Product = require('../models/product');
const router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/insertProduct', (req,res) => {
    res.render('addProduct');
});

router.get('/api/product', (req,res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({message: `Error en la consulta ${err}`});
        if (!products) return res.status(404).send({message: 'No se encontró el producto'})
        res.render('showProducts', { products });
    }).lean();
});

router.get('/api/product/:dato', (req, res) => {
    let dato = req.params.dato;

    Product.findById(dato, (err, products) => {    
        if(err) return res.status(500).send({message: `Error en la consulta ${err}`});
        if (!products) return res.status(404).send({message: 'No se encontró el producto'});
        res.render('editProduct', {product : products});
    }).lean();
});

router.post('/api/product', (req, res) => {
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category.toLowerCase();
    product.description = req.body.description;

    product.save((err, productStored) => {
        if(err) return res.status(500).send({message: `Error al salvar ${err}`});
        res.redirect('/api/product');
    });
});

const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId', putProduct);
const delProduct = require('../controllers/delProduct');
router.delete('/api/product/:productId', delProduct);

const loginController = require('../controllers/login');
router.get('/auth/login', loginController);
const loginUserController = require('../controllers/loginUser');
router.post('/users/login', loginUserController);
const newUser = require('../controllers/newUser')
router.get('/users/register', newUser);
const storeUser = require('../controllers/storeUser');
router.post('/auth/register', storeUser);

router.use((req, res) => {
    res.status(404).send('Pagina no encontrada');
});