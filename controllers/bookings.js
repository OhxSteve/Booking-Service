const db = require('../models');
const redisClient = require('redis').createClient;

const redis = redisClient();

module.exports = {
  get: (req, res, next) => {
    const roomId = req.params.id;
    redis.get(roomId, (err, data) => {
      if (err) {
        res.json(err);
      } else if (data) {
        res.json(JSON.parse(data));
      } else {
        db.Booking.find({ roomId })
          .exec()
          .then((data) => {
            if (!data || !data.length) {
              next();
            } else {
              // console.log('sample items', data[0].bookings);
              redis.set(roomId, JSON.stringify(data), () => {
                res.json(data);
              });
            }
          })
          .catch(next);
      }
    });
  },

  post: (req, res, next) => {
    const newBooking = new db.Booking(req.body);
    newBooking.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(newBooking);
    });
  },

  put: (req, res) => {
    const roomId = req.params.id;
    const bookings = req.body;
    console.log({ bookings });
    console.log({ roomId });
    db.Booking.update({ roomId }, { $push: { bookings } }, { new: true }, (err, booking) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(booking);
    });
  },
  delete: (req, res) => {
    const roomId = req.params.id;
    db.Booking.remove({ roomId }, (err, booking) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: 'successfully deleted',
      };
      return res.status(200).send(response);
    });
  },

  create(req, res) {},
};
