const Room = require("../models/Room");
const Hotel = require("../models/Hotels");

// CREATE NEW ROOM
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      return next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    return next(err);
  }
};

// UPDATE ROOM
const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(room);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// DELETE ROOM
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const deleteroom = await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("room has been deleted");
  } catch (err) {
    next(err);
  }
};
// DELETE ROOM FROM ROOM COLLECTION
const rooms = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("room deleted from room collection");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
// DELETE ROOMS PARTICULAR FEILD FROM COLLECTION
const deleteBooked = async (req, res, next) => {
  // const roomId = req.params.id;

  try {
    try {
      const deleted = await Room.updateMany({}, { $unset: { desc: " " } });
      res.status(200).json(deleted);
    } catch (err) {
      next(err);
    }
    res.status(200).json("room has been deleted");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
// GET ALL ROOM
const getAllRooms = async (req, res, next) => {
  try {
    const room = await Room.find({});
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
// GET ROOM BY ID
const getRoomByID = async (req, res, next) => {
  try {
    const getRoomByID = await Room.findById(req.params.id);
    res.status(200).json(getRoomByID);
  } catch (err) {
    next(err);
  }
};
// BOOK ROOM WITH EXACT DATE BY ROOM ID
const updateRoomAvail = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoomByID,
  updateRoomAvail,
  rooms,
  deleteBooked,
};
