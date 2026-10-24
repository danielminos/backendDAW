-- Ejecutar sobre la base "clinica" (en pgAdmin: Query Tool de esa base).
-- Clave de TODOS los usuarios: 123456

INSERT INTO usuarios (documento, apellidos, nombres, email, clave, estado, rol) VALUES
('11111111', 'Gomez',  'Carlos', 'admin@clinica.com',      '$2b$10$4upgBVZ5zJG6IXD7PLfJ3em4KD0oYqKJMAvmzul8QCQqm1CpL8vsW', 'ACTIVO', 'ADMINISTRADOR'),
('22222222', 'Perez',  'Maria',  'medico@clinica.com',     '$2b$10$4upgBVZ5zJG6IXD7PLfJ3em4KD0oYqKJMAvmzul8QCQqm1CpL8vsW', 'ACTIVO', 'MEDICO'),
('33333333', 'Lopez',  'Juan',   'paciente@clinica.com',   '$2b$10$4upgBVZ5zJG6IXD7PLfJ3em4KD0oYqKJMAvmzul8QCQqm1CpL8vsW', 'ACTIVO', 'PACIENTE'),
('44444444', 'Garcia', 'Ana',    'medico2@clinica.com',    '$2b$10$4upgBVZ5zJG6IXD7PLfJ3em4KD0oYqKJMAvmzul8QCQqm1CpL8vsW', 'ACTIVO', 'MEDICO'),
('55555555', 'Diaz',   'Laura',  'paciente2@clinica.com',  '$2b$10$4upgBVZ5zJG6IXD7PLfJ3em4KD0oYqKJMAvmzul8QCQqm1CpL8vsW', 'ACTIVO', 'PACIENTE'),
('66666666', 'Suarez', 'Pedro',  'baja@clinica.com',       '$2b$10$4upgBVZ5zJG6IXD7PLfJ3em4KD0oYqKJMAvmzul8QCQqm1CpL8vsW', 'BAJA',   'PACIENTE')
ON CONFLICT (documento) DO NOTHING;

INSERT INTO medicos (id_usuario, matricula, valor_consulta)
SELECT u.id, 12345, 10000 FROM usuarios u
WHERE u.email = 'medico@clinica.com'
  AND NOT EXISTS (SELECT 1 FROM medicos m WHERE m.id_usuario = u.id);

INSERT INTO medicos (id_usuario, matricula, valor_consulta)
SELECT u.id, 54321, 8000 FROM usuarios u
WHERE u.email = 'medico2@clinica.com'
  AND NOT EXISTS (SELECT 1 FROM medicos m WHERE m.id_usuario = u.id);