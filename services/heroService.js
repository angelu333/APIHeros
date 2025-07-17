import Hero from '../models/heroModel.js';
import Pet from '../models/petModel.js';
import { degradePetStats } from './petService.js';

async function getAllHeroes() {
    const heroes = await Hero.find().lean();
    // Devuelvo los datos básicos + _id
    return heroes.map(hero => ({
        _id: hero._id,
        name: hero.name,
        alias: hero.alias,
        city: hero.city,
        team: hero.team,
        petId: hero.petId
    }));
}

async function getHeroById(id) {
    const hero = await Hero.findById(id).lean();
    if (!hero) throw new Error('Héroe no encontrado');
    return hero;
}

async function addHero(hero) {
    if (!hero.name || !hero.alias) {
        throw new Error("El héroe debe tener un nombre y un alias.");
    }
    // Crea y guarda el héroe directamente en MongoDB
    const newHero = new Hero({
        name: hero.name,
        alias: hero.alias,
        city: hero.city,
        team: hero.team,
        petId: null
    });
    await newHero.save();
    return newHero.toObject();
}

async function updateHero(id, updatedHero) {
    const hero = await Hero.findById(id);
    if (!hero) {
        throw new Error('Héroe no encontrado');
    }
    delete updatedHero.id;
    Object.assign(hero, updatedHero);
    await hero.save();
    return hero.toObject();
}

async function deleteHero(id) {
    const hero = await Hero.findById(id);
    if (!hero) {
        throw new Error('Héroe no encontrado');
    }
    await hero.deleteOne();
    return { message: 'Héroe eliminado' };
}

async function findHeroesByCity(city) {
    const heroes = await Hero.find({ city: city.toLowerCase() }).lean();
    return heroes.map(hero => ({
        _id: hero._id,
        name: hero.name,
        alias: hero.alias,
        city: hero.city,
        team: hero.team,
        petId: hero.petId
    }));
}

async function faceVillain(heroId, villain) {
    const hero = await Hero.findById(heroId).lean();
    if (!hero) {
        throw new Error('Héroe no encontrado');
    }
    return `${hero.alias} enfrenta a ${villain}`;
}

async function adoptPet(heroId, petId) {
    const hero = await Hero.findById(heroId);
    if (!hero) throw new Error('Héroe no encontrado');
    const pet = await Pet.findById(petId);
    if (!pet) throw new Error('Mascota no encontrada');
    // Verifica si la mascota ya ha sido adoptada por otro héroe
    const alreadyAdopted = await Hero.findOne({ petId: pet._id });
    if (alreadyAdopted) throw new Error('Esta mascota ya ha sido adoptada por otro héroe.');
    // Reinicio de valores al adoptar
    pet.vida = 100;
    pet.hambre = 100;
    pet.felicidad = 100;
    pet.limpieza = 100;
    pet.enfermedades = [];
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    hero.petId = pet._id;
    await hero.save();
    return { ...hero.toObject(), petName: pet.name };
}

async function removePetReferenceFromHeroes(petId) {
    const heroes = await Hero.find({ petId: petId });
    for (const hero of heroes) {
        hero.petId = null;
        await hero.save();
    }
}

async function getHeroesWithPets() {
    const heroes = await Hero.find().lean();
    let pets = await Pet.find().lean(); // Changed from petRepository.getPets()
    let petsUpdated = false;
    const result = heroes
        .filter(hero => hero.petId)
        .map(hero => {
            let pet = pets.find(p => p._id.toString() === hero.petId); // Changed from p.id === hero.petId
            if (pet) {
                const updatedPet = degradePetStats(pet);
                // Solo si cambió, actualiza en el array
                if (JSON.stringify(pet) !== JSON.stringify(updatedPet)) {
                    pets = pets.map(p => p._id.toString() === pet._id.toString() ? updatedPet : p); // Changed from p.id === pet.id
                    petsUpdated = true;
                }
                pet = updatedPet;
            }
            return {
                ...hero,
                pet: pet || null
            };
        });
    if (petsUpdated) {
        await Pet.bulkWrite(pets.map(p => ({ updateOne: { filter: { _id: p._id }, update: p } }))); // Changed from petRepository.savePets(pets)
    }
    return result;
}

export default {
    getAllHeroes,
    addHero,
    updateHero,
    deleteHero,
    findHeroesByCity,
    faceVillain,
    adoptPet,
    removePetReferenceFromHeroes,
    getHeroesWithPets
}; 