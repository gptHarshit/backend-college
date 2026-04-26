const College = require("../models/College");

exports.addCollege = async (req, res) => {
  try {
    const { name, fees, location, rating, averagePackage } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "Name and Location are required",
      });
    }

    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 5",
      });
    }

    const existing = await College.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "College already exists",
      });
    }

    const college = new College({
      name,
      fees,
      location,
      rating,
      averagePackage,
    });

    const savedCollege = await college.save();

    res.status(201).json({
      success: true,
      data: savedCollege,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ rating: -1 });

    res.json({
      success: true,
      count: colleges.length,
      data: colleges,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.filterColleges = async (req, res) => {
  try {
    const { location, rating, minFees, maxFees } = req.query;

    let filter = {};
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    if (minFees || maxFees) {
      filter.fees = {};
      if (minFees) filter.fees.$gte = Number(minFees);
      if (maxFees) filter.fees.$lte = Number(maxFees);
    }

    const colleges = await College.find(filter).sort({ rating: -1 });

    res.json({
      success: true,
      count: colleges.length,
      data: colleges,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};