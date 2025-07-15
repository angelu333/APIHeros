import heroRepository from '../repositories/heroRepository.js';
import Hero from '../models/heroModel.js';
import Pet from '../models/petModel.js';
import petRepository from '../repositories/petRepository.js';
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
    const heroes = await heroRepository.getHeroes();
    const index = heroes.findIndex(hero => hero.id === parseInt(id));
    if (index === -1) {
        throw new Error('Héroe no encontrado');
    }
    delete updatedHero.id;
    heroes[index] = { ...heroes[index], ...updatedHero };
    await heroRepository.saveHeroes(heroes);
    return heroes[index];
}

async function deleteHero(id) {
    const heroes = await heroRepository.getHeroes();
    const index = heroes.findIndex(hero => hero.id === parseInt(id));
    if (index === -1) {
        throw new Error('Héroe no encontrado');
    }
    const filteredHeroes = heroes.filter(hero => hero.id !== parseInt(id));
    await heroRepository.saveHeroes(filteredHeroes);
    return { message: 'Héroe eliminado' };
}

async function findHeroesByCity(city) {
    const heroes = await heroRepository.getHeroes();
    return heroes.filter(hero => hero.city && hero.city.toLowerCase() === city.toLowerCase());
}

async function faceVillain(heroId, villain) {
    const heroes = await heroRepository.getHeroes();
    const hero = heroes.find(hero => hero.id === parseInt(heroId));
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
    const heroes = await heroRepository.getHeroes();
    let updated = false;
    for (const hero of heroes) {
        if (hero.petId === parseInt(petId)) {
            hero.petId = null;
            updated = true;
        }
    }
    if (updated) {
        await heroRepository.saveHeroes(heroes);
    }
}

async function getHeroesWithPets() {
    const heroes = await heroRepository.getHeroes();
    let pets = await petRepository.getPets();
    let petsUpdated = false;
    const result = heroes
        .filter(hero => hero.petId)
        .map(hero => {
            let pet = pets.find(p => p.id === hero.petId);
            if (pet) {
                const updatedPet = degradePetStats(pet);
                // Solo si cambió, actualiza en el array
                if (JSON.stringify(pet) !== JSON.stringify(updatedPet)) {
                    pets = pets.map(p => p.id === pet.id ? updatedPet : p);
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
        await petRepository.savePets(pets);
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