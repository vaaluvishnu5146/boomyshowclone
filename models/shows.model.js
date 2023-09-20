const { default: mongoose, model } = require("mongoose");

/**
 * Create a schema
 * What is schema/prototype?
 * Schema is the blueprint of what our data will look like
 */

const ShowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banners: {
      type: Array,
      required: true,
    },
    ratings: {
      maxRating: {
        type: Number,
        required: true,
      },
      averageRating: {
        type: Number,
        default: 0,
      },
    },
    format: {
      type: String,
      required: true,
    },
    genre: {
      type: Array,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const ShowsModel = mongoose.model("show", ShowSchema);

module.exports = ShowsModel;
