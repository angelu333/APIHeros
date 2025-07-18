import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  name: String,
  alias: String,
  city: String,
  team: String,
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', default: null },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Hero = mongoose.model('Hero', heroSchema);

export default Hero; 