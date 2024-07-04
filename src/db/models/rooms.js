// Номери (Номер, Кількість осіб, Комфортність, Ціна).

import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
    room_number: { type: Number, required: true },
    capacity: { type: Number, required: true },
    comfort_level: { type: String, enum: ['Standard', 'Semi-Lux', 'Lux'], required: true },
    price: { type: Number, required: true },
    isAvailable: {type: Boolean, required: true},
  }, { timestamps: false, versionKey: false });

  export const Room = model('room', roomSchema);
