// Клієнти (Клієнт, Прізвище, Ім'я, По батькові, Паспортні дані, Коментар)

import { Schema, model } from 'mongoose';

const clientSchema = new Schema(
  {
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    middle_name: { type: String },
    passport_details: { type: String, required: true },
    comment: { type: String },
  },
  { timestamps: false, versionKey: false },
);

export const Client = model('client', clientSchema);
