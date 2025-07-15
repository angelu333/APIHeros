import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  name: String,
  alias: String,
  city: String,
  team: String,
  petId: { type: Number, default: null }
});

const Hero = mongoose.model('Hero', heroSchema);

export default Hero; 