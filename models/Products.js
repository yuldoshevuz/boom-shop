const { Schema, model } = require('mongoose')

const ProductsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Products = model('Products', ProductsSchema)

module.exports = Products
