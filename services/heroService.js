import heroRepository from '../repositories/heroRepository.js';
import petRepository from '../repositories/petRepository.js';

async function getAllHeroes() {
    const heroes = await heroRepository.getHeroes();
    const pets = await petRepository.getPets();
    // Incluye el nombre de la mascota si tiene
    return heroes.map(hero => {
        let petName = null;
        if (hero.petId) {
            const pet = pets.find(p => p.id === hero.petId);
            petName = pet ? pet.name : null;
        }
        return { ...hero, petName };
    });
}

async function addHero(hero) {
    if (!hero.name || !hero.alias) {
        throw new Error("El héroe debe tener un nombre y un alias.");
    }

    const heroes = await heroRepository.getHeroes();
    const newId = heroes.length > 0 ? Math.max(...heroes.map(h => h.id)) + 1 : 1;
    const newHero = { ...hero, id: newId };
    heroes.push(newHero);
    await heroRepository.saveHeroes(heroes);
    return newHero;
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
    const heroes = await heroRepository.getHeroes();
    const pets = await petRepository.getPets();
    const heroIndex = heroes.findIndex(hero => hero.id === parseInt(heroId));
    if (heroIndex === -1) throw new Error('Héroe no encontrado');
    const pet = pets.find(pet => pet.id === parseInt(petId));
    if (!pet) throw new Error('Mascota no encontrada');
    // Verifica si la mascota ya ha sido adoptada por otro héroe
    const alreadyAdopted = heroes.some(hero => hero.petId === pet.id);
    if (alreadyAdopted) throw new Error('Esta mascota ya ha sido adoptada por otro héroe.');
    heroes[heroIndex].petId = pet.id;
    await heroRepository.saveHeroes(heroes);
    // Devuelvo el héroe con el nombre de la mascota
    return { ...heroes[heroIndex], petName: pet.name };
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

export default {
    getAllHeroes,
    addHero,
    updateHero,
    deleteHero,
    findHeroesByCity,
    faceVillain,
    adoptPet,
    removePetReferenceFromHeroes
}; 