import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Angel0407:Perra2002xd@cluster0.g6gbqv9.mongodb.net/api-superheroes?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }
}; 