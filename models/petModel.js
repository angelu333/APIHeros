import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  superPower: String,
  vida: { type: Number, default: 100 },
  hambre: { type: Number, default: 100 },
  felicidad: { type: Number, default: 100 },
  limpieza: { type: Number, default: 100 },
  personalidad: { type: String, default: 'alegre' },
  enfermedades: { type: Array, default: [] },
  ropa: { type: Array, default: [] },
  ultimaActualizacion: { type: String, default: () => new Date().toISOString() }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet; 