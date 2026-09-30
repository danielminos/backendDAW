// src/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Importo las rutas de las entidades y migraciones para que TypeORM pueda encontrarlas
import { Usuario } from './modules/auth/entities/usuario.entity.js';
import { Medico } from './modules/turnos/entities/medico.entity.js';
import { Reserva } from './modules/turnos/entities/reserva.entity.js';

// Carga las variables del .env
dotenv.config();

// en ES Module reemplazo nativo para __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Acá se definen las entidades y migraciones que TypeORM debe usar para crear la base de datos y sus tablas
  entities: [Usuario, Medico, Reserva],
  migrations: ['./src/migrations/*.{js,ts}'],
  synchronize: false, // ¡Obligatorio desactivar usando migraciones!
});
