const { Router } = require('express')
const router = Router()
const Products = require('../models/Products')
const authMiddleware = require('../middlewares/auth')

// Get Products page
router.get('/products', authMiddleware, async (req, res) => {
    const products = (await Products.find({ user: req.userId }).populate('user').lean()).reverse()
    res.render('products', {
        title: 'Products | Boom Shop',
        isProducts: true,
        products,
        userId: req.userId ? req.userId.toString() : null,
    })
})
// Get Add product page
router.get('/add', authMiddleware, (req, res) => {
    res.render('add', {
        title: 'Add product | Boom Shop',
        isAdd: true,
        addErr: req.flash('addErr'),
    })
})
// Post Add product
router.post('/add-product', authMiddleware, async (req, res) => {
    const { title, description, image, price } = req.body
    try {
        if (!title || !description || !image || !price) {
            req.flash('addErr', 'Sorry, you did not fill out all the fields')
            res.redirect('/add')
            return
        }
        const product = await Products.create({ ...req.body, user: req.userId })
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
})
router.get('/product/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).lean().populate('user')
        res.render('product', {
            title: `${product.title} | Boom Shop`,
            isProduct: true,
            id: req.params.id,
            product,
            user: product.user,
        })
    } catch (error) {
        res.redirect('/')
    }
    
})
router.get('/edit-product/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).lean().populate('user')
        if (!product.user._id.equals(req.userId)) {
            return res.redirect('/')
        }
        res.render('edit-product', {
            product,
            title: `Edit ${product.title} | Boom Shop`,
            isEdit: true,
            editErr: req.flash('editErr'),
        })
    } catch (error) {
        res.redirect('/')
    }
    
})
router.post('/edit-product/:id', async (req, res) => {
    try {
        const { title, description, image, price } = req.body
        const product = await Products.findById(req.params.id).populate('user')
        if (product.user._id.equals(req.userId)) {
            if (!title || !description || !image || !price) {
                req.flash('editErr', 'Sorry, you did not fill out all the fields')
                res.redirect(`/edit-product/${product._id}`)
                return
            }
            const updProduct = await Products.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/')
        }
    } catch (error) {
        res.redirect('/')
    }
})
router.get('/delete-product/:id', (req, res) => {
    res.redirect('/')
})
router.post('/delete-product/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate('user')
        if (!product.user._id.equals(req.userId)) {
            return res.redirect('/')
        }
        const deleteProduct = await Products.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }
})

module.exports = router