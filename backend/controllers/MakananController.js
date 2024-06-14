const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");

const findAll = async (req, res) => {
  try {
    // Ensure page and limit are integers and set default values
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    // Fetch data with pagination
    if (!page) {
      const makanan = await prisma.makanan.findMany({
        select: {
          id: true,
          name: true,
          deskripsi: true,
        },
      });

      res.status(200).json({
        success: true,
        message: "Makanan fetched successfully",
        data: makanan,
      });
    } else {
      const makanan = await prisma.makanan.findMany({
        skip: skip,
        take: limit,
      });
      // Fetch total count for pagination
      const totalMakanan = await prisma.makanan.count();
      const totalPages = Math.ceil(totalMakanan / limit);

      // Send response
      res.status(200).json({
        success: true,
        message: "Makanan fetched successfully",
        data: makanan,
        meta: {
          page: page,
          limit: limit,
          totalPages: totalPages,
          totalMakanan: totalMakanan,
        },
      });
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch makanan",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  const { name, deskripsi } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const makanan = await prisma.makanan.create({
      data: {
        name,
        deskripsi,
      },
    });
    res.status(201).json({
      success: true,
      message: "Data successfully created",
      data: makanan,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const makanan = await prisma.makanan.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      message: "Get by id successfully",
      data: makanan,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, deskripsi } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const makanan = await prisma.makanan.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        deskripsi,
      },
    });
    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: makanan,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const makanan = await prisma.makanan.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      message: "Makanan deleted successfully",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  findAll,
  create,
  findById,
  update,
  deleteById,
};
