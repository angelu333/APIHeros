// Script de seed para cargar 30 héroes y 30 mascotas aleatorias en MongoDB Atlas
import mongoose from 'mongoose';
import Hero from '../models/heroModel.js';
import Pet from '../models/petModel.js';
import { connectDB } from '../db.js';

const HEROES = [
  { name: 'Clark Kent', alias: 'Superman', city: 'Metrópolis', team: 'Liga de la Justicia' },
  { name: 'Tony Stark', alias: 'Iron Man', city: 'Nueva York', team: 'Los Vengadores' },
  { name: 'Bruce Wayne', alias: 'Batman', city: 'Gotham City', team: 'Liga de la Justicia' },
  { name: 'Steve Rogers', alias: 'Capitán América', city: 'Nueva York', team: 'Los Vengadores' },
  { name: 'Diana Prince', alias: 'Mujer Maravilla', city: 'Themyscira', team: 'Liga de la Justicia' },
  { name: 'Thor Odinson', alias: 'Thor', city: 'Asgard', team: 'Los Vengadores' },
  { name: 'Barry Allen', alias: 'Flash', city: 'Central City', team: 'Liga de la Justicia' },
  { name: 'Bruce Banner', alias: 'Hulk', city: 'Dayton', team: 'Los Vengadores' },
  { name: 'Arthur Curry', alias: 'Aquaman', city: 'Atlantis', team: 'Liga de la Justicia' },
  { name: 'Peter Parker', alias: 'Spider-Man', city: 'Nueva York', team: 'Ninguno' },
  { name: 'Hal Jordan', alias: 'Linterna Verde', city: 'Coast City', team: 'Liga de la Justicia' },
  { name: 'Natasha Romanoff', alias: 'Viuda Negra', city: 'Moscú', team: 'Los Vengadores' },
  { name: 'Oliver Queen', alias: 'Green Arrow', city: 'Star City', team: 'Liga de la Justicia' },
  { name: 'Clint Barton', alias: 'Ojo de Halcón', city: 'Waverly', team: 'Los Vengadores' },
  { name: 'Victor Stone', alias: 'Cyborg', city: 'Detroit', team: 'Liga de la Justicia' },
  { name: 'Stephen Vincent Strange', alias: 'Doctor Strange', city: 'Nueva York', team: 'Los Vengadores' },
  { name: 'Billy Batson', alias: 'Shazam', city: 'Fawcett City', team: 'Liga de la Justicia' },
  { name: 'T\'Challa', alias: 'Black Panther', city: 'Wakanda', team: 'Los Vengadores' },
  { name: 'Kara Danvers', alias: 'Supergirl', city: 'National City', team: 'Ninguno' },
  { name: 'Wanda Maximoff', alias: 'Bruja Escarlata', city: 'Transia', team: 'Los Vengadores' },
  { name: 'Dick Grayson', alias: 'Nightwing', city: 'Blüdhaven', team: 'Ninguno' },
  { name: 'Charles Xavier', alias: 'Profesor X', city: 'Salem Center', team: 'X-Men' },
  { name: 'Barbara Gordon', alias: 'Batgirl', city: 'Gotham City', team: 'Birds of Prey' },
  { name: 'James Howlett', alias: 'Wolverine', city: 'Canadá', team: 'X-Men' },
  { name: 'J\'onn J\'onzz', alias: 'Detective Marciano', city: 'Ninguna', team: 'Liga de la Justicia' },
  { name: 'Ororo Munroe', alias: 'Tormenta', city: 'El Cairo', team: 'X-Men' },
  { name: 'Kate Kane', alias: 'Batwoman', city: 'Gotham City', team: 'Ninguno' },
  { name: 'Scott Summers', alias: 'Cíclope', city: 'Anchorage', team: 'X-Men' },
  { name: 'Kyle Rayner', alias: 'Linterna Verde', city: 'Los Ángeles', team: 'Liga de la Justicia' },
  { name: 'Jean Grey', alias: 'Fénix', city: 'Annandale-on-Hudson', team: 'X-Men' }
];

const PET_TYPES = ['Perro', 'Gato', 'Tortuga', 'Conejo', 'Hámster', 'Ave', 'Lagarto', 'Pez', 'Erizo', 'Zorro'];
const SUPER_POWERS = [
  'Volar', 'Invisibilidad', 'Superfuerza', 'Telepatía', 'Regeneración', 'Control del fuego',
  'Control del agua', 'Velocidad', 'Elasticidad', 'Rayos láser', 'Multiplicación', 'Cambio de forma',
  'Control de la electricidad', 'Telequinesis', 'Control del clima', 'Superinteligencia'
];
const PERSONALIDADES = ['alegre', 'travieso', 'tímido', 'valiente', 'curioso', 'perezoso', 'juguetón', 'protector'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomName() {
  const nombres = ['Max', 'Luna', 'Rocky', 'Bella', 'Simba', 'Nala', 'Thor', 'Milo', 'Coco', 'Lola', 'Zeus', 'Maya', 'Toby', 'Sasha', 'Rex', 'Molly', 'Leo', 'Kira', 'Jack', 'Daisy', 'Lucky', 'Nina', 'Bruno', 'Mimi', 'Bobby', 'Chispa', 'Gala', 'Chloe', 'Tom', 'Arya'];
  return randomItem(nombres) + ' ' + Math.floor(Math.random() * 1000);
}

function randomPet() {
  return {
    name: randomName(),
    type: randomItem(PET_TYPES),
    superPower: randomItem(SUPER_POWERS),
    vida: 100,
    hambre: 100,
    felicidad: 100,
    limpieza: 100,
    personalidad: randomItem(PERSONALIDADES),
    enfermedades: [],
    ropa: [],
    ultimaActualizacion: new Date().toISOString()
  };
}

async function seed() {
  await connectDB();
  console.log('Conectado a MongoDB');

  // Borra datos previos
  await Hero.deleteMany({});
  await Pet.deleteMany({});

  // Inserta héroes
  await Hero.insertMany(HEROES);
  console.log('Héroes insertados');

  // Genera e inserta mascotas
  const pets = Array.from({ length: 30 }, randomPet);
  await Pet.insertMany(pets);
  console.log('Mascotas insertadas');

  await mongoose.disconnect();
  console.log('Seed finalizado');
}

seed().catch(e => {
  console.error(e);
  mongoose.disconnect();
}); 