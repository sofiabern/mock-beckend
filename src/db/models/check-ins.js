// Поселення (Клієнт, Номер, Дата поселення, Дата звільнення, Примітка).
import { Schema, model } from 'mongoose';

const checkInSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    room_id: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    check_in_date: { type: Date, required: true },
    check_out_date: { type: Date, required: true },
    note: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const CheckIn = model('check-ins', checkInSchema);
