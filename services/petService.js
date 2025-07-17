import Hero from '../models/heroModel.js';
import Pet from '../models/petModel.js';
import heroService from './heroService.js';

function randomIllnessEvent(pet) {
    // Enfermedades posibles
    const illnesses = [
        { nombre: 'Sarpullido', daño: 5 },
        { nombre: 'Gripe', daño: 10 },
        { nombre: 'Dolor de estómago', daño: 15 },
        { nombre: 'Dolor de cabeza', daño: 8 }
    ];
    // Probabilidad de enfermarse por día (por ejemplo, 20%)
    const illnessChance = 0.2;
    // Probabilidad de curarse por día (por ejemplo, 30%)
    const cureChance = 0.3;
    // Si no tiene enfermedades, puede enfermarse aleatoriamente
    if (!pet.enfermedades || pet.enfermedades.length === 0) {
        if (Math.random() < illnessChance) {
            const illness = illnesses[Math.floor(Math.random() * illnesses.length)];
            pet.enfermedades.push(illness);
        }
    } else {
        // Si tiene enfermedades, puede curarse aleatoriamente
        if (Math.random() < cureChance) {
            pet.enfermedades = [];
        }
    }
    return pet;
}

function degradePetStats(pet) {
    // Definir tasas de degradación por hora
    const HUNGER_INCREASE = 10; // hambre sube 10 por hora (más hambre)
    const CLEANLINESS_DECAY = 8; // limpieza baja 8 por hora
    const HAPPINESS_DECAY = 5; // felicidad baja 5 por hora

    const now = new Date();
    const lastUpdate = new Date(pet.ultimaActualizacion);
    const hoursPassed = Math.max(0, (now - lastUpdate) / (1000 * 60 * 60));
    const daysPassed = Math.floor(hoursPassed / 24);

    // Degradar valores
    pet.hambre = Math.min(100, pet.hambre + Math.floor(HUNGER_INCREASE * hoursPassed)); // hambre sube
    pet.limpieza = Math.max(0, pet.limpieza - Math.floor(CLEANLINESS_DECAY * hoursPassed));
    pet.felicidad = Math.max(0, pet.felicidad - Math.floor(HAPPINESS_DECAY * hoursPassed));

    // Si hambre sube mucho, baja vida y puede enfermarse
    if (pet.hambre > 80) pet.vida = Math.max(0, pet.vida - 5 * hoursPassed);
    if (pet.limpieza < 20) pet.vida = Math.max(0, pet.vida - 5 * hoursPassed);

    // Enfermedades afectan vida
    if (pet.enfermedades && pet.enfermedades.length > 0) {
        for (const enf of pet.enfermedades) {
            pet.vida = Math.max(0, pet.vida - (enf.daño || 0) * hoursPassed);
        }
    }

    // Si hambre sube mucho, puede enfermarse automáticamente
    if (pet.hambre > 90 && !pet.enfermedades.some(e => e.nombre === 'Desnutrición')) {
        pet.enfermedades.push({ nombre: 'Desnutrición', daño: 10 });
    }
    if (pet.limpieza < 10 && !pet.enfermedades.some(e => e.nombre === 'Infección')) {
        pet.enfermedades.push({ nombre: 'Infección', daño: 8 });
    }

    // Enfermedades aleatorias (no por acción)
    if (daysPassed >= 1) {
        pet = randomIllnessEvent(pet);
    }

    pet.vida = Math.round(pet.vida); // Redondear vida a entero
    pet.ultimaActualizacion = now.toISOString();
    return pet;
}

async function getAllPets() {
    const pets = await Pet.find().lean();
    // Devuelvo los datos básicos + _id
    return pets.map(pet => ({
        _id: pet._id,
        name: pet.name,
        type: pet.type,
        superPower: pet.superPower
    }));
}

async function addPet(pet) {
    if (!pet.name || !pet.type || !pet.superPower) {
        throw new Error("La mascota debe tener nombre, tipo y super poder.");
    }
    // Crea y guarda la mascota directamente en MongoDB
    const newPet = new Pet({
        name: pet.name,
        type: pet.type,
        superPower: pet.superPower,
        vida: 100,
        hambre: 100,
        felicidad: 100,
        limpieza: 100,
        personalidad: pet.personalidad || 'alegre',
        enfermedades: [],
        ropa: [],
        ultimaActualizacion: new Date().toISOString()
    });
    await newPet.save();
    return newPet.toObject();
}

async function deletePet(id) {
    // Solo se puede eliminar si la mascota ya ha sido adoptada
    const heroes = await Hero.find().lean();
    const adopted = heroes.some(hero => hero.petId === parseInt(id));
    if (!adopted) {
        throw new Error('Solo puedes eliminar una mascota que ya ha sido adoptada por un héroe.');
    }
    const pet = await Pet.findById(id);
    if (!pet) {
        throw new Error('Mascota no encontrada');
    }
    await pet.deleteOne();
    // Eliminar referencia en héroes
    await heroService.removePetReferenceFromHeroes(id);
    return { message: 'Mascota eliminada' };
}

async function getPetById(id) {
    const pet = await Pet.findById(id).lean();
    if (!pet) throw new Error('Mascota no encontrada');
    const updatedPet = degradePetStats(pet);
    await Pet.findByIdAndUpdate(id, updatedPet);
    return updatedPet;
}

const FOOD_VALUES = {
    manzana: 15,
    galleta: 10,
    pizza: 50,
    pastel: 40,
    zanahoria: 12,
    carne: 30
};

async function feedPet(id, comida) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    degradePetStats(pet);
    if (!comida || !FOOD_VALUES[comida.toLowerCase()]) {
        throw new Error('Debes especificar una comida válida: ' + Object.keys(FOOD_VALUES).join(', '));
    }
    const amount = FOOD_VALUES[comida.toLowerCase()];
    pet.hambre = Math.max(0, pet.hambre - amount); // alimentar baja el hambre
    pet.felicidad = Math.min(100, pet.felicidad + 5);
    // Si se pasa de alimentar (hambre < 0), puede enfermarse de empacho
    if (pet.hambre === 0 && !pet.enfermedades.some(e => e.nombre === 'Empacho')) {
        pet.enfermedades.push({ nombre: 'Empacho', daño: 12 });
    }
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    return pet.toObject();
}

async function bathPet(id) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    degradePetStats(pet);
    pet.limpieza = 100;
    pet.felicidad = Math.min(100, pet.felicidad + 10);
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    return pet.toObject();
}

async function walkPet(id) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    degradePetStats(pet);
    pet.felicidad = Math.min(100, pet.felicidad + 15);
    pet.hambre = Math.min(100, pet.hambre + 10); // pasear da hambre
    pet.limpieza = Math.max(0, pet.limpieza - 10);
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    return pet.toObject();
}

async function equipPet(id, item) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    degradePetStats(pet);
    if (!pet.ropa.some(r => r.nombre === item.nombre)) {
        pet.ropa.push(item);
    }
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    return pet.toObject();
}

async function unequipPet(id, itemName) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    degradePetStats(pet);
    pet.ropa = pet.ropa.filter(r => r.nombre !== itemName);
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    return pet.toObject();
}

async function curePet(id) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    degradePetStats(pet);
    pet.enfermedades = [];
    pet.vida = Math.min(100, pet.vida + 20);
    pet.ultimaActualizacion = new Date().toISOString();
    await pet.save();
    return pet.toObject();
}

export {
  degradePetStats,
  feedPet,
  bathPet,
  walkPet,
  equipPet,
  unequipPet,
  curePet,
  getAllPets,
  addPet,
  deletePet,
  getPetById
}; 