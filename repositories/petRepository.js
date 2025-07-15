import Pet from '../models/petModel.js';

async function getPets() {
    return await Pet.find().lean();
}

async function savePets(pets) {
    // Borra todos y vuelve a insertar (para compatibilidad con la lógica actual)
    await Pet.deleteMany({});
    await Pet.insertMany(pets);
}

export default {
    getPets,
    savePets
}; 