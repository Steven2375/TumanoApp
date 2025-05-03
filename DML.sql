-- Insertar un rol llamado "tecnico" con una descripción
INSERT INTO roles (id, nombre, descripcion)
VALUES (1, 'tecnico', 'descripcion');

-- Insertar un tipo de servicio llamado "Saneamiento Ambiental"
INSERT INTO servicio (id, nombre)
VALUES (1, 'Saneamiento Ambiental');

-- Insertar un cliente con ID alfanumérico "GA567"
INSERT INTO clientes (id, nombre, industria, fecha_registro, tiemporeingreso, servicio_id)
VALUES ('GA567', 'Granja Los Girasoles', 'Agricultura', CURRENT_TIMESTAMP, 72, 1);

-- Asociar el cliente "GA567" con un usuario (ID usuario = 1) en la tabla intermedia
INSERT INTO usuario_cliente (id, cliente_id, estado, usuario_id, fecha)
VALUES (1, 'GA567', true, 1, CURRENT_TIMESTAMP);

-- Insertar tres áreas distintas asociadas al cliente "GA567"
INSERT INTO areascliente (id, nombre, estado, cliente_id)
VALUES (1, 'Invernaderos', 'completado', 'GA567');

INSERT INTO areascliente (id, nombre, estado, cliente_id)
VALUES (2, 'Bodega Suministros', 'completado', 'GA567');

INSERT INTO areascliente (id, nombre, estado, cliente_id)
VALUES (3, 'Zona de cultivo exterior', 'en proceso', 'GA567');

-- Insertar insumos para el área 1 (Invernaderos)
INSERT INTO insumos (id, areacliente_id, nombre, unidad_medida, cantidad)
VALUES (DEFAULT, 1, 'fungicida orgánico', 'litros', 20);

INSERT INTO insumos (id, areacliente_id, nombre, unidad_medida, cantidad)
VALUES (DEFAULT, 1, 'jabón potásico', 'litros', 5);

-- Insertar insumos para el área 2 (Bodega Suministros)
INSERT INTO insumos (id, areacliente_id, nombre, unidad_medida, cantidad)
VALUES (DEFAULT, 2, 'trampas para roedores', 'unidades', 15);

INSERT INTO insumos (id, areacliente_id, nombre, unidad_medida, cantidad)
VALUES (DEFAULT, 2, 'desinfectante', 'litros', 10);

-- Insertar insumos para el área 3 (Zona de cultivo exterior)
INSERT INTO insumos (id, areacliente_id, nombre, unidad_medida, cantidad)
VALUES (DEFAULT, 3, 'insecticida biodegradable', 'litros', 30);

INSERT INTO insumos (id, areacliente_id, nombre, unidad_medida, cantidad)
VALUES (DEFAULT, 3, 'fertilizante orgánico', 'kilogramos', 100);

-- Insertar categoría para hallazgos
INSERT INTO categorias_diccionario (id, nombre, descripcion)
VALUES (1, 'Plagas comunes', 'Categoría que agrupa plagas frecuentes en entornos urbanos');

-- Insertar un tipo de hallazgo relacionado con plagas
INSERT INTO diccionario_hallazgos (id, codigo, nombre, descripcion, tipo, categoria_id)
VALUES (
    1,
    'C001',
    'Presencia de cucarachas',
    'Indica la detección de cucarachas en el área evaluada',
    'Visual',
    1
);

-- Insertar dispositivos de plagas asociados a distintas áreas
-- Área 1 (Invernaderos)
INSERT INTO dispositivos_plagas (id, areacliente_id, diccionario_hallazgos_id, codigo, estado, clase_dispositivo_plaga_id)
VALUES ('GA001', 1, 1, '001', 'completado', 'A001');

INSERT INTO dispositivos_plagas (id, areacliente_id, diccionario_hallazgos_id, codigo, estado, clase_dispositivo_plaga_id)
VALUES ('GA002', 1, 1, '001', 'completado', 'A002');

-- Área 2 (Bodega Suministros)
INSERT INTO dispositivos_plagas (id, areacliente_id, diccionario_hallazgos_id, codigo, estado, clase_dispositivo_plaga_id)
VALUES ('GA101', 2, 1, '003', 'completado', 'A003');

-- Área 3 (Zona de cultivo exterior)
INSERT INTO dispositivos_plagas (id, areacliente_id, diccionario_hallazgos_id, codigo, estado, clase_dispositivo_plaga_id)
VALUES ('GA201', 3, 1, '004', 'en proceso', 'A004');

INSERT INTO dispositivos_plagas (id, areacliente_id, diccionario_hallazgos_id, codigo, estado, clase_dispositivo_plaga_id)
VALUES ('GA202', 3, 1, '005', 'pendiente', 'A005');

INSERT INTO dispositivos_plagas (id, areacliente_id, diccionario_hallazgos_id, codigo, estado, clase_dispositivo_plaga_id)
VALUES ('GA203', 3, 1, '006', 'pendiente', 'A006');
