BEGIN;

-- Eliminar tablas (orden correcto por dependencias)
DROP TABLE IF EXISTS public.usuarios_dispositivos;
DROP TABLE IF EXISTS public.usuario_cliente;
DROP TABLE IF EXISTS public.check_list;
DROP TABLE IF EXISTS public.insumos;
DROP TABLE IF EXISTS public.hallazgos;
DROP TABLE IF EXISTS public.dispositivos_plagas;
DROP TABLE IF EXISTS public.dispositivo_movil;
DROP TABLE IF EXISTS public.clientes_hallazgos;
DROP TABLE IF EXISTS public.areascliente;
DROP TABLE IF EXISTS public.usuarios;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.autorizacion;
DROP TABLE IF EXISTS public.clientes;
DROP TABLE IF EXISTS public.servicio;
DROP TABLE IF EXISTS public.diccionario_hallazgos;
DROP TABLE IF EXISTS public.categorias_diccionario;

-- Crear secuencias necesarias
CREATE SEQUENCE IF NOT EXISTS areascliente_id_seq;
CREATE SEQUENCE IF NOT EXISTS autorizacion_id_seq;
CREATE SEQUENCE IF NOT EXISTS categorias_diccionario_id_seq;
CREATE SEQUENCE IF NOT EXISTS diccionario_hallazgos_id_seq;
CREATE SEQUENCE IF NOT EXISTS dispositivo_movil_id_seq;
CREATE SEQUENCE IF NOT EXISTS hallazgos_id_seq;
CREATE SEQUENCE IF NOT EXISTS insumos_id_seq;
CREATE SEQUENCE IF NOT EXISTS roles_id_seq;
CREATE SEQUENCE IF NOT EXISTS servicio_id_seq;
CREATE SEQUENCE IF NOT EXISTS usuario_cliente_id_seq;
CREATE SEQUENCE IF NOT EXISTS usuarios_id_seq;
CREATE SEQUENCE IF NOT EXISTS check_list_id_seq;

-- Tabla: servicio
CREATE TABLE public.servicio (
    id INTEGER NOT NULL DEFAULT nextval('servicio_id_seq'),
    nombre VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla: clientes
CREATE TABLE public.clientes (
    id VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    industria VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tiemporeingreso INTEGER,
    servicio_id INTEGER NOT NULL
);

-- Tabla: categorias_diccionario
CREATE TABLE public.categorias_diccionario (
    id INTEGER NOT NULL DEFAULT nextval('categorias_diccionario_id_seq'),
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Tabla: diccionario_hallazgos
CREATE TABLE public.diccionario_hallazgos (
    id INTEGER NOT NULL DEFAULT nextval('diccionario_hallazgos_id_seq'),
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50),
    categoria_id INTEGER,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Tabla: areascliente
CREATE TABLE public.areascliente (
    id INTEGER NOT NULL DEFAULT nextval('areascliente_id_seq'),
    nombre VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    cliente_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla: dispositivos_plagas
CREATE TABLE public.dispositivos_plagas (
    id VARCHAR(10) PRIMARY KEY,
    areacliente_id INTEGER NOT NULL,
    diccionario_hallazgos_id INTEGER NOT NULL,
    codigo VARCHAR NOT NULL,
    estado VARCHAR NOT NULL,
    clase_dispositivo_plaga_id VARCHAR
);

-- Tabla: hallazgos
CREATE TABLE public.hallazgos (
    id INTEGER NOT NULL DEFAULT nextval('hallazgos_id_seq'),
    areacliente_id INTEGER NOT NULL UNIQUE,
    diccionario_hallazgos_id INTEGER NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- Tabla: insumos
CREATE TABLE public.insumos (
    id INTEGER NOT NULL DEFAULT nextval('insumos_id_seq'),
    areacliente_id INTEGER NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- Tabla: clientes_hallazgos
CREATE TABLE public.clientes_hallazgos (
    cliente_id VARCHAR(10) NOT NULL,
    hallazgo_id INTEGER NOT NULL,
    fecha_hallazgo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cliente_id, hallazgo_id)
);

-- Tabla: autorizacion
CREATE TABLE public.autorizacion (
    id INTEGER NOT NULL DEFAULT nextval('autorizacion_id_seq'),
    url_firma VARCHAR NOT NULL,
    fecha TIMESTAMP,
    nombre VARCHAR(50),
    telefono VARCHAR(50),
    observaciones VARCHAR(250),
    PRIMARY KEY (id)
);

-- Tabla: roles
CREATE TABLE public.roles (
    id INTEGER NOT NULL DEFAULT nextval('roles_id_seq'),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    PRIMARY KEY (id)
);

-- Tabla: usuarios
CREATE TABLE public.usuarios (
    id INTEGER NOT NULL DEFAULT nextval('usuarios_id_seq'),
    identificacion_numero INTEGER,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,
    fecha_ultimo_login TIMESTAMP,
    rol_id INTEGER,
    PRIMARY KEY (id)
);

-- Tabla: usuario_cliente
CREATE TABLE public.usuario_cliente (
    id INTEGER NOT NULL DEFAULT nextval('usuario_cliente_id_seq'),
    cliente_id VARCHAR(10) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    usuario_id INTEGER NOT NULL UNIQUE,
    fecha TIMESTAMP,
    autorizacion_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla: dispositivo_movil
CREATE TABLE public.dispositivo_movil (
    id INTEGER NOT NULL DEFAULT nextval('dispositivo_movil_id_seq'),
    modelo VARCHAR(50),
    sistema_operativo VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "IMEI" VARCHAR,
    PRIMARY KEY (id)
);

-- Tabla: usuarios_dispositivos
CREATE TABLE public.usuarios_dispositivos (
    usuario_id INTEGER NOT NULL,
    dispositivo_movil_id INTEGER NOT NULL,
    fecha_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitud VARCHAR(50) NOT NULL,
    longitud VARCHAR(50) NOT NULL,
    PRIMARY KEY (usuario_id, dispositivo_movil_id)
);

-- Tabla: check_list
CREATE TABLE public.check_list (
    id INTEGER NOT NULL DEFAULT nextval('check_list_id_seq'),
    nombre VARCHAR,
    estado VARCHAR NOT NULL,
    clientes_id VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

-- RELACIONES (FOREIGN KEYS)
ALTER TABLE public.clientes
    ADD FOREIGN KEY (servicio_id) REFERENCES public.servicio (id) ON DELETE CASCADE;

ALTER TABLE public.areascliente
    ADD FOREIGN KEY (cliente_id) REFERENCES public.clientes (id) ON DELETE CASCADE;

ALTER TABLE public.clientes_hallazgos
    ADD FOREIGN KEY (cliente_id) REFERENCES public.clientes (id) ON DELETE CASCADE;

ALTER TABLE public.clientes_hallazgos
    ADD FOREIGN KEY (hallazgo_id) REFERENCES public.diccionario_hallazgos (id) ON DELETE CASCADE;

ALTER TABLE public.diccionario_hallazgos
    ADD FOREIGN KEY (categoria_id) REFERENCES public.categorias_diccionario (id) ON DELETE CASCADE;

ALTER TABLE public.dispositivos_plagas
    ADD FOREIGN KEY (areacliente_id) REFERENCES public.areascliente (id) ON DELETE CASCADE;

ALTER TABLE public.dispositivos_plagas
    ADD FOREIGN KEY (diccionario_hallazgos_id) REFERENCES public.diccionario_hallazgos (id);

ALTER TABLE public.hallazgos
    ADD FOREIGN KEY (areacliente_id) REFERENCES public.areascliente (id) ON DELETE CASCADE;

ALTER TABLE public.hallazgos
    ADD FOREIGN KEY (diccionario_hallazgos_id) REFERENCES public.diccionario_hallazgos (id) ON DELETE CASCADE;

ALTER TABLE public.insumos
    ADD FOREIGN KEY (areacliente_id) REFERENCES public.areascliente (id) ON DELETE CASCADE;

ALTER TABLE public.usuario_cliente
    ADD FOREIGN KEY (cliente_id) REFERENCES public.clientes (id) ON DELETE CASCADE;

ALTER TABLE public.usuario_cliente
    ADD FOREIGN KEY (usuario_id) REFERENCES public.usuarios (id) ON DELETE CASCADE;

ALTER TABLE public.usuario_cliente
    ADD FOREIGN KEY (autorizacion_id) REFERENCES public.autorizacion (id) ON DELETE CASCADE;

ALTER TABLE public.usuarios
    ADD FOREIGN KEY (rol_id) REFERENCES public.roles (id) ON DELETE SET NULL;

ALTER TABLE public.usuarios_dispositivos
    ADD FOREIGN KEY (usuario_id) REFERENCES public.usuarios (id) ON DELETE CASCADE;

ALTER TABLE public.usuarios_dispositivos
    ADD FOREIGN KEY (dispositivo_movil_id) REFERENCES public.dispositivo_movil (id) ON DELETE CASCADE;

ALTER TABLE public.check_list
    ADD FOREIGN KEY (clientes_id) REFERENCES public.clientes (id);

END;
