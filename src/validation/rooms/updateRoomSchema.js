import Joi from 'joi';

const BookingSchema = Joi.object({
  check_in_date: Joi.string().isoDate(),
  check_out_date: Joi.string().isoDate(),
});


export const updateRoomSchema = Joi.object({
  room_number: Joi.number().integer(),
  capacity: Joi.number().integer(),
  bookings: Joi.array().items(BookingSchema),
  comfort_level: Joi.string().valid('Standard', 'Semi-Lux', 'Lux'),
  price: Joi.number(),
});
