// Поселення (Клієнт, Номер, Дата поселення, Дата звільнення, Примітка).
import { Schema, model } from 'mongoose';

const checkInSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
    room_id: { type: Schema.Types.ObjectId, ref: 'rooms', required: true },
    check_in_date: { type: Date, required: true },
    check_out_date: { type: Date, required: true },
    note: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const CheckIn = model('check-ins', checkInSchema);
