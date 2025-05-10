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

-- Insertar categoría
INSERT INTO categoria (id, nombre) VALUES
(1, 'Hallazgos en dispositivos'),
(2, 'Estado físico del dispositivo'),
(3, 'Estado del cebo'),
(4, 'Presencia de roedores'),
(5, 'Ubicación y entorno'),
(6, 'Evidencia de actividad plagas'),
(7, 'Fuentes de alimento y agua'),
(8, 'Condiciones ambientales'),
(9, 'Puntos de entrada'),
(10, 'Otros hallazgos');

INSERT INTO categoria_contexto (categoria_id, aplica_a) VALUES
(1, 'Dispositivo'),
(2, 'Dispositivo'),
(3, 'Dispositivo'),
(4, 'Dispositivo'),
(5, 'Dispositivo'),
(6, 'Área'),
(7, 'Área'),
(8, 'Área'),
(9, 'Área'),
(10, 'Área');

-- Hallazgos en dispositivos (1)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(1, 'Captura'),
(1, 'Obstruido'),
(1, 'Consumo'),
(1, 'Dispositivo Dañado'),
(1, 'Otra especie'),
(1, 'Dispositivo no existe'),
(1, 'No tiene barilla'),
(1, 'Dispositivo sin cebo'),
(1, 'Dispositivo obstruido'),
(1, 'Dispositivo sin anclar'),
(1, 'Dispositivo con rótulo dañado'),
(1, 'Dispositivo sin rótulo'),
(1, 'Dispositivo sucio'),
(1, 'Dispositivo en buen estado'),
(1, 'Dispositivo con muchos cebos o con más de 4 cebos');

-- Estado físico del dispositivo (2)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(2, 'Obstruido'),
(2, 'Dañado'),
(2, 'No existe'),
(2, 'Posible vandalismo'),
(2, 'Sin barilla'),
(2, 'Sin anclar'),
(2, 'Anclado'),
(2, 'Rótulo dañado'),
(2, 'Sin rótulo'),
(2, 'Sucio'),
(2, 'Buen estado'),
(2, 'Corrosión'),
(2, 'Oxidación'),
(2, 'Dispositivo inundado de agua'),
(2, 'Dispositivo inundado de barro');

INSERT INTO dato_categoria (categoria_id, valor) VALUES
(3, 'Correcta cantidad'),
(3, 'Ausencia'),
(3, 'Exceso'),
(3, 'En buen estado'),
(3, 'Contaminado'),
(3, 'Presencia de moho'),
(3, 'Consumo');

-- Presencia de roedores (4)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(4, 'Huellas dentro del dispositivo'),
(4, 'Huellas fuera del dispositivo'),
(4, 'Huellas de otra especie'),
(4, 'Excrementos dentro del dispositivo'),
(4, 'Excrementos fuera del dispositivo'),
(4, 'Excrementos de otra especie'),
(4, 'Nido dentro del dispositivo'),
(4, 'Nido cerca del dispositivo'),
(4, 'Roedor muerto (Rata de techo)'),
(4, 'Roedor muerto (Rata de Alcantarilla)'),
(4, 'Roedor muerto (Rata doméstica)'),
(4, 'Roedor muerto (Otra)'),
(4, 'Roedor vivo (Rata de techo)'),
(4, 'Roedor vivo (Rata de Alcantarilla)'),
(4, 'Roedor vivo (Rata doméstica)'),
(4, 'Roedor vivo (Otra)'),
(4, 'Otra especie capturada viva'),
(4, 'Otra especie capturada muerta');

-- Ubicación y entorno (5)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(5, 'Dispositivo accesible'),
(5, 'Dispositivo obstruido'),
(5, 'Dispositivo protegido (sol, lluvia etc)'),
(5, 'Dispositivo no protegido (sol, lluvia etc)'),
(5, 'Crecimiento excesivo de vegetación alrededor');

-- Evidencia de actividad plagas (6)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(6, 'Huellas'),
(6, 'Excrementos'),
(6, 'Roedores'),
(6, 'Nidos'),
(6, 'Cebos'),
(6, 'Insectos muertos'),
(6, 'Cucaracha muerta');

-- Fuentes de alimento y agua (7)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(7, 'Residuos de comida'),
(7, 'Contenedores de basura'),
(7, 'Plantas'),
(7, 'Fuentes de agua');

-- Condiciones ambientales (8)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(8, 'Vegetación'),
(8, 'Escombros'),
(8, 'Humedad'),
(8, 'Temperatura'),
(8, 'Fugas en tuberías'),
(8, 'Áreas oscuras y poco iluminadas'),
(8, 'Drenajes obstruidos'),
(8, 'Materiales densos');

-- Puntos de entrada (9)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(9, 'Grietas'),
(9, 'Hendiduras'),
(9, 'Aberturas alrededor de tuberías'),
(9, 'Puertas'),
(9, 'Ventanas'),
(9, 'Condensación en paredes'),
(9, 'Condensación en techos'),
(9, 'Entradas de fácil acceso para la plaga');

-- Otros hallazgos (10)
INSERT INTO dato_categoria (categoria_id, valor) VALUES
(10, 'Orina'),
(10, 'Mal olor producido por plagas'),
(10, 'Daños materiales'),
(10, 'Puertas o cortinas deterioradas'),
(10, 'Ventanas abiertas'),
(10, 'Temperatura'),
(10, 'Cables roídos'),
(10, 'Maderas perforadas'),
(10, 'Telas deshilachadas'),
(10, 'Problemas de higiene y saneamiento');

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
