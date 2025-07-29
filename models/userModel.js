import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Se almacenará encriptada
  createdAt: { type: Date, default: Date.now },
  selectedHero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero', default: null },
  selectedPet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', default: null }
});

const User = mongoose.model('User', userSchema);

export default User; 