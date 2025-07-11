import petRepository from '../repositories/petRepository.js';
import heroService from './heroService.js';
import heroRepository from '../repositories/heroRepository.js';

async function getAllPets() {
    return await petRepository.getPets();
}

async function addPet(pet) {
    if (!pet.name || !pet.type || !pet.superPower) {
        throw new Error("La mascota debe tener nombre, tipo y super poder.");
    }
    const pets = await petRepository.getPets();
    const newId = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
    const newPet = { ...pet, id: newId };
    pets.push(newPet);
    await petRepository.savePets(pets);
    return newPet;
}

async function deletePet(id) {
    // Solo se puede eliminar si la mascota ya ha sido adoptada
    const heroes = await heroRepository.getHeroes();
    const adopted = heroes.some(hero => hero.petId === parseInt(id));
    if (!adopted) {
        throw new Error('Solo puedes eliminar una mascota que ya ha sido adoptada por un héroe.');
    }
    const pets = await petRepository.getPets();
    const index = pets.findIndex(pet => pet.id === parseInt(id));
    if (index === -1) {
        throw new Error('Mascota no encontrada');
    }
    const filteredPets = pets.filter(pet => pet.id !== parseInt(id));
    await petRepository.savePets(filteredPets);
    // Eliminar referencia en héroes
    await heroService.removePetReferenceFromHeroes(id);
    return { message: 'Mascota eliminada' };
}

export default {
    getAllPets,
    addPet,
    deletePet
}; 