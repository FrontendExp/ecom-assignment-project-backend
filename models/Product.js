const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  optionValues: {
    type: Map,
    of: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    images: [{
      type: String,
    }],
    variants: [productVariantSchema],
    inventory: {
      type: Number,
      required: true,
      default: 0,
    },
    categories: [{
      type: String,
    }],
    tags: [{
      type: String,
    }],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search functionality
productSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model("Product", productSchema);
