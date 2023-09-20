const ShowsModel = require("../models/shows.model");
const { response } = require("../services/service");

/**
 * Controller file will have all the business logics
 */

async function getAllShows(req, res, next) {
  try {
    const response = await ShowsModel.find();

    if (response && response.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Fetched All Show",
        data: response,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No Shows found",
        data: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong",
    });
  }
}

function getAShow(req, res, next) {
  const { showId } = req.params;

  if (showId.length != 24) {
    return res.status(400).json({
      success: false,
      error: "Object Id is invalid",
    });
  }

  ShowsModel.findById({ _id: showId })
    .then((response) => {
      if (response && response?._id) {
        return res.status(200).json({
          message: "Fetched a show",
          data: response,
        });
      } else {
        return res.status(200).json({
          message: "No show found",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "Something went wrong",
      });
    });
}

function createAShow(req, res, next) {
  const Show = new ShowsModel(req.body);

  Show.save()
    .then((response) => {
      if (response && response._id) {
        return res.status(200).json({
          success: true,
          message: "Creating new show successful",
          data: response,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Creating Show Un Successful",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "Something went wrong",
      });
    });
}

module.exports = {
  getAllShows,
  getAShow,
  createAShow,
};
