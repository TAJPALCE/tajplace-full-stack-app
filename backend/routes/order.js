const Order = require('../models/Order');
const Hotel = require('../models/Hotels');
const Room = require('../models/Room');
const { verifyAdmin } = require('../utils/Verifytoken');


const router = require('express').Router();

// CREATE ORDER
router.post('/add', async (req, res, next) => {
    try {
        const newOrder = await Order(req.body);
        await newOrder.save();
        res.status(200).json('order saved successfully')
    } catch (err) {
        next(err);
        console.log(err);
    }
})


// GET ORDER
router.get('/get', verifyAdmin, async (req, res, next) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (err) {
        console.log(err)
        next(err)
    }
})
// GET BOOKED ROOM BY EMAIL
router.get('/booked', async (req, res, next) => {
    const email = req.query.email
    try {
        const getroom = await Order.find({ email: email })
        res.status(200).json(getroom)
    } catch (err) {
        next(err);
        console.log(err);
    }
})
// VIEW BOOKED ROOM DETAILS BY ID
router.get('/bookedRoom/:id', async (req, res, next) => {
    try {
        const hotel = await Room.findById(req.params.id);
        const list = await Promise.all(
            hotel.roomNumbers.map((room) => {
                // return Room.find({room: room.roomNumbers});
                return (room)
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
        console.log(err);
    }
})
// DELETE ORDER FROM ORDER COLLECTION 
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('article deleted')
    } catch (err) {
        console.log(err)
        next(err)
    }
})

// DELETE BOOKED ROOM FROM ROOM COLLECTION 
router.put('/rmvBookedDates/:id', async (req, res, next) => {

    try {
        const room = await Room.updateOne(
                {}, {"$pull":{"roomNumbers.unavailableDates":""}}
            );

        // const list = await Promise.all(
        //     room.roomNumbers.map((room) => {
        //         return (room.unavailableDates)
        //     })
        // );
        // const updated = await list.update({}, {$unset: {unavailableDates: ""}})

        // const update = await Room.updateOne(
        //     { room: req.params.id },
        //     { unavailableDates: 'dates' },
        //     {
        //         $unset: {
        //             "roomNumbers.unavailableDates": "edited",
        //             // "roomNumbers.$.unavailableDates": " ",
        //         },
        //     }
        // );
        res.status(200).json(room);
        console.log(room);

    } catch (err) {
        next(err);
        console.log(err);
    }
})
module.exports = router;