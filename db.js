import mongoose from 'mongoose';

const uri = 'mongodb+srv://Angel0407:Angel0407@cluster0.g6gbqv9.mongodb.net/api-superheroes?retryWrites=true&w=majority&appName=Cluster0';

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
} 