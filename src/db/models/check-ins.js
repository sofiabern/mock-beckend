// Поселення (Клієнт, Номер, Дата поселення, Дата звільнення, Примітка).
import { Schema, model } from 'mongoose';

const checkInSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    check_in_date: { type: String, required: true },
    check_out_date: { type: String, required: true },
    note: { type: String },
    booking: { type: Schema.Types.ObjectId, ref: 'booking', required: true }
  },
  { timestamps: false, versionKey: false }
);

export const CheckIn = model('check-in', checkInSchema);
