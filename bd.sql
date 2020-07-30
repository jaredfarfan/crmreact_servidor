
CREATE TABLE `divisas`(
`id` int not null AUTO_INCREMENT,
`name` varchar(50),
`nomenclatura` varchar(10),
`user_at` varchar(200) not null,
`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
UNIQUE KEY `nomenclatura` (`nomenclatura`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `contacto_principal` varchar(200),
  `tel_contacto_principal` varchar(200),
  `contacto_secundario` varchar(200),
  `tel_contacto_secundario` varchar(200),
  `is_active` tinyint(1) DEFAULT '1',
  `user_at` varchar(200) not null,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `razones_sociales`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200),
  `rfc`  varchar(15),
  `direccion` varchar(200),
  `cp` varchar(10),
  `telefono_uno` varchar(20),
  `telefono_dos` varchar(20),
  `user_at` varchar(200) not null,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `departamentos`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `user_at` varchar(200) not null,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `razon_social_id` int not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`razon_social_id`) REFERENCES `razones_sociales`('id') 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
LOCK TABLES `departamentos` WRITE;
INSERT INTO `departamentos` (`id`, `name`, `user_at`,`created_at`, `updated_at`)
VALUES
	(1,'PRINCIPAL','ADMIN GENERAL','2020-11-24 20:14:43','2020-11-24 20:15:02');

UNLOCK TABLES;


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `city` varchar(250) DEFAULT '',
  `is_active` tinyint(1) DEFAULT '1',
  `user_at` varchar(200) not null,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contrasenia` varchar(200),
  `departamento_id` int,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`departamento_id`) REFERENCES `departamentos`(`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,  
  `descripcion` varchar(50) NOT NULL,
  `monto_proyecto` decimal(18,2),
  `cliente_id` int,
  `divisa_id` int,
  `razon_social_id` int,
  `is_active` tinyint(1) DEFAULT '1',
  `porcentaje_avance` int,
  `url_archivo_proyecto` varchar(200),
  `estatus` varchar(15),
  `user_at` varchar(200) not null,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`), 
  FOREIGN KEY (`divisa_id`) REFERENCES `divisas`(`id`), 
  FOREIGN KEY (`razon_social_id`) REFERENCES `razones_sociales`(`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `usuario_proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proyectoid` int NOT NULL,  
  `usuarioid` int NOT NULL,
  PRIMARY KEY (`id`),  
  FOREIGN KEY (`proyectoid`) REFERENCES `proyectos`(`id`), 
  FOREIGN KEY (`usuarioid`) REFERENCES `users`(`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
