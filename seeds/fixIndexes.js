import mongoose from 'mongoose';
import { connectDB } from '../db.js';

async function fixIndexes() {
  await connectDB();
  const collection = mongoose.connection.collection('heros');
  // Elimina el índice único sobre el campo id si existe
  await collection.dropIndex('id_1').catch(e => {
    if (!String(e).includes('index not found')) console.error(e);
  });
  console.log('Índice único sobre id eliminado (si existía)');
  await mongoose.disconnect();
}

fixIndexes(); 