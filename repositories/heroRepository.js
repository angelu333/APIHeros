import Hero from '../models/heroModel.js';

async function getHeroes() {
    return await Hero.find().lean();
}

async function saveHeroes(heroes) {
    // Borra todos y vuelve a insertar (para compatibilidad con la lógica actual)
    await Hero.deleteMany({});
    await Hero.insertMany(heroes);
}

export default {
    getHeroes,
    saveHeroes
};
