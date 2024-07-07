// Номери (Номер, Кількість осіб, Комфортність, Ціна).
import { Schema, model} from 'mongoose';


const BookingSchema = new Schema({
  check_in_date: { type: String, required: true },
  check_out_date: { type: String, required: true },
});


const Booking = model('booking', BookingSchema);

const roomSchema = new Schema(
  {
    room_number: { type: Number, required: true },
    capacity: { type: Number, required: true },
    bookings: [BookingSchema],
    comfort_level: {
      type: String,
      enum: ['Standard', 'Semi-Lux', 'Lux'],
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const Room = model('Room', roomSchema);
