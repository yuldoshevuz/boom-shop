const { Router } = require('express')
const router = Router()
const Products = require('../models/Products')

// Get Home page
router.get('/', async (req, res) => {
    const products = (await Products.find({ is_deleted: false }).lean()).reverse()

    res.render('home', {
        title: "Home | Boom Shop",
        isHome: true,
        products,
        userId: req.userId ? req.userId.toString() : null,
    })
})

module.exports = router
