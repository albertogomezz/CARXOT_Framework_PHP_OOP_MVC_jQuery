-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2023 a las 19:18:17
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carxot`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bodywork`
--

CREATE TABLE `bodywork` (
  `id_bodywork` varchar(11) NOT NULL,
  `name_bodywork` varchar(25) NOT NULL,
  `img_bodywork` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bodywork`
--

INSERT INTO `bodywork` (`id_bodywork`, `name_bodywork`, `img_bodywork`) VALUES
('1', 'Berlina', 'view/img/bodywork/berlina.png'),
('2', 'Familiar', 'view/img/bodywork/familiar.png'),
('3', 'Coupe', 'view/img/bodywork/coupe.png'),
('4', 'Monovolumen', 'view/img/bodywork/monovolumen.png'),
('5', 'SUV', 'view/img/bodywork/suv.png'),
('6', 'Cabrio', 'view/img/bodywork/cabrio.png'),
('7', 'Pick Up', 'view/img/bodywork/pick-up.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brand`
--

CREATE TABLE `brand` (
  `id_brand` varchar(11) NOT NULL,
  `name_brand` varchar(25) NOT NULL,
  `img_brand` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brand`
--

INSERT INTO `brand` (`id_brand`, `name_brand`, `img_brand`) VALUES
('AUD', 'Audi', 'view/img/brand/audi.png'),
('BMW', 'BMW', 'view/img/brand/bmw.png'),
('CTR', 'Citroen', 'view/img/brand/citroen.png'),
('FRD', 'Ford', 'view/img/brand/ford.png'),
('MRC', 'Mercedes', 'view/img/brand/mercedes.png'),
('PGT', 'Peugeot', 'view/img/brand/peugeot.png'),
('TYT', 'Toyota', 'view/img/brand/toyota.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car`
--

CREATE TABLE `car` (
  `id_car` int(11) NOT NULL,
  `vin_num` varchar(18) DEFAULT NULL,
  `num_plate` varchar(8) DEFAULT NULL,
  `model` varchar(25) DEFAULT NULL,
  `bodywork` varchar(11) NOT NULL,
  `Km` int(8) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `num_doors` varchar(20) DEFAULT NULL,
  `motor` varchar(20) DEFAULT NULL,
  `matriculation_date` varchar(10) DEFAULT NULL,
  `price` int(8) DEFAULT NULL,
  `img_car` varchar(300) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `car`
--

INSERT INTO `car` (`id_car`, `vin_num`, `num_plate`, `model`, `bodywork`, `Km`, `color`, `num_doors`, `motor`, `matriculation_date`, `price`, `img_car`, `lat`, `lon`, `city`, `count`, `stock`) VALUES
(1, '123456789', '1234ERT', '1', '4', 0, 'Negro', '5', 'G', '12/03/2015', 15000, 'view/img/CMAX/CMAX.1.jpg', '38.82367390980723', '-0.601181851177484', 'Ontinyent', 11, 10),
(2, '213456789', '1234DFG', '2', '5', 0, 'Azul', '5', 'G', '24/08/2017', 16000, 'view/img/Q5/Q5.1.jpg', '38.825525628248116', '-0.5997350817087959', 'Ontinyent', 56, 10),
(3, '312456789', '1234CVB', '3', '1', 10000, 'Negro', '5', 'D', '12/03/2015', 17000, 'view/img/FOCUS/FOCUS.1.jpg', '38.82166111774936', '-0.6136860730140034', 'Ontinyent', 10, 10),
(4, '193453789', '5555JPN', '4', '1', 34000, 'Blanco', '5', 'H', '23/05/2019', 25000, 'view/img/YARIS/YARIS.1.jpg', '38.818701985288875', '-0.6030137238136771', 'Ontinyent', 59, 10),
(5, '123946789', '8888UWU', '5', '1', 20000, 'Gris', '5', 'D', '12/03/2015', 19000, 'view/img/CLASE_A/CLASE_A.1.jpg', '38.82370911425378', '-0.5983900799962639', 'Ontinyent', 5, 10),
(6, '223466799', '7495LOL', '6', '3', 5000, 'Negro', '3', 'H', '12/03/2015', 69000, 'view/img/I8/I8.1.jpg', '38.82330756698975', '-0.6040710613129716', 'Ontinyent', 9, 10),
(7, '1W2D50JIL04J3L5K1', '4567DAB', '7', '3', 200000, 'Negro', '5', 'G', '15/04/2019', 50000, 'view/img/I4/I4.1.jpg', '38.8232769', '-0.600155', 'Ontinyent', 8, 10),
(8, '1W2D50JIL04J3L7R2', '7368THF', '8', '3', 0, 'Azul', '5', 'G', '30/03/2019', 60000, 'view/img/MUSTANG/MUSTANG.1.jpg', '38.82421587514509', '-0.6005771635021804', 'Ontinyent', 131, 10),
(9, '1W2D50JIL04J3L3P4', '3248WPL', '9', '5', 100000, 'Red', '5', 'G', '25/02/2019', 30000, 'view/img/A6/A6.1.jpg', '38.818685597301496', '-0.6110650426489811', 'Ontinyent', 147, 9),
(10, '89023452', '5499IFR', '10', '3', 0, 'Blanco', '2', 'G', '23/08/2020', 124000, 'view/img/R8/R8.1.jpg', '38.82121664147923', '-0.6092072861892415', 'Ontinyent', 121, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cars_img`
--

CREATE TABLE `cars_img` (
  `id_img` varchar(11) NOT NULL,
  `cod_car` varchar(11) DEFAULT NULL,
  `img_cars` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cars_img`
--

INSERT INTO `cars_img` (`id_img`, `cod_car`, `img_cars`) VALUES
('10', '1', 'view/img/CMAX/CMAX.2.jpg'),
('11', '1', 'view/img/CMAX/CMAX.3.jpg'),
('12', '1', 'view/img/CMAX/CMAX.4.jpg'),
('13', '1', 'view/img/CMAX/CMAX.5.jpg'),
('14', '3', 'view/img/FOCUS/FOCUS.1.jpg'),
('15', '3', 'view/img/FOCUS/FOCUS.2.jpg'),
('16', '3', 'view/img/FOCUS/FOCUS.3.jpg'),
('17', '3', 'view/img/FOCUS/FOCUS.4.jpg'),
('18', '3', 'view/img/FOCUS/FOCUS.5.jpg'),
('19', '4', 'view/img/YARIS/YARIS.1.jpg'),
('20', '4', 'view/img/YARIS/YARIS.2.jpg'),
('21', '4', 'view/img/YARIS/YARIS.3.jpg'),
('22', '4', 'view/img/YARIS/YARIS.4.jpg'),
('23', '5', 'view/img/CLASE_A/CLASE_A.1.jpg'),
('24', '5', 'view/img/CLASE_A/CLASE_A.2.jpg'),
('25', '5', 'view/img/CLASE_A/CLASE_A.3.jpg'),
('26', '6', 'view/img/I8/I8.1.jpg'),
('27', '6', 'view/img/I8/I8.2.jpg'),
('28', '6', 'view/img/I8/I8.3.jpg'),
('29', '6', 'view/img/I8/I8.4.jpg'),
('30', '6', 'view/img/I8/I8.5.jpg'),
('31', '7', 'view/img/I4/I4.1.jpg'),
('32', '7', 'view/img/I4/I4.2.jpg'),
('33', '7', 'view/img/I4/I4.3.jpg'),
('34', '8', 'view/img/MUSTANG/MUSTANG.1.jpg'),
('35', '8', 'view/img/MUSTANG/MUSTANG.2.jpg'),
('36', '8', 'view/img/MUSTANG/MUSTANG.3.jpg'),
('37', '9', 'view/img/A6/A6.1.jpg'),
('38', '9', 'view/img/A6/A6.2.jpg'),
('39', '9', 'view/img/A6/A6.3.jpg'),
('4', '2', 'view/img/Q5/Q5.1.jpg'),
('40', '10', 'view/img/R8/R8.1.jpg'),
('41', '10', 'view/img/R8/R8.2.jpg'),
('42', '10', 'view/img/R8/R8.3.jpg'),
('5', '2', 'view/img/Q5/Q5.2.jpg'),
('6', '2', 'view/img/Q5/Q5.3.jpg'),
('7', '2', 'view/img/Q5/Q5.4.jpg'),
('8', '2', 'view/img/Q5/Q5.5.jpg'),
('9', '1', 'view/img/CMAX/CMAX.1.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(10) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_car` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `id_car`, `qty`) VALUES
(82, 40, 9, 2),
(83, 40, 8, 2),
(84, 40, 10, 1);

--
-- Disparadores `cart`
--
DELIMITER $$
CREATE TRIGGER `No_Superar_Stock_Maximo` AFTER UPDATE ON `cart` FOR EACH ROW BEGIN
	DECLARE stock_actual INT;
    SELECT stock INTO stock_actual FROM car WHERE id_car = NEW.id_car;
    IF NEW.qty > stock_actual THEN
        UPDATE qty SET qty = stock_actual WHERE id_car = NEW.id_car;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cambiar_0_A_1_QTY` AFTER UPDATE ON `cart` FOR EACH ROW BEGIN
        IF new.qty < 1 THEN
            UPDATE cart SET NEW.qty = 1 WHERE id_user = old.id_user;
        END IF;
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_user` int(30) NOT NULL,
  `id_car` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_like`, `id_user`, `id_car`) VALUES
(94, 41, 2),
(95, 41, 4),
(96, 41, 9),
(97, 41, 8),
(98, 41, 10),
(100, 41, 1),
(122, 40, 6),
(125, 40, 1),
(126, 43, 9),
(127, 43, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model`
--

CREATE TABLE `model` (
  `id_model` varchar(20) NOT NULL,
  `name_model` varchar(25) DEFAULT NULL,
  `brand` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `model`
--

INSERT INTO `model` (`id_model`, `name_model`, `brand`) VALUES
('1', 'CMAX', 'FRD'),
('10', 'R8', 'AUD'),
('2', 'Q5', 'AUD'),
('3', 'FOCUS', 'FRD'),
('4', 'YARIS', 'TYT'),
('5', 'CLASE_A', 'MRC'),
('6', 'I8', 'BMW'),
('7', 'I4', 'BMW'),
('8', 'MUSTANG', 'FRD'),
('9', 'A6', 'AUD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `cod_pedido` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_car` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `precio_total` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_motor`
--

CREATE TABLE `type_motor` (
  `cod_tmotor` varchar(10) NOT NULL,
  `name_tmotor` varchar(25) NOT NULL,
  `img_tmotor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_motor`
--

INSERT INTO `type_motor` (`cod_tmotor`, `name_tmotor`, `img_tmotor`) VALUES
('D', 'Diesel', 'view/img/type_motor/diesel.png'),
('E', 'Electrico', 'view/img/type_motor/electrico.png'),
('G', 'Gasolina', 'view/img/type_motor/gasolina.png'),
('H', 'Hibrido', 'view/img/type_motor/hibrido.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`) VALUES
(40, 'Alberto', '$2y$12$wNx/1MYuY1TdvsCNn9GZW.Z3tu7clqQzJ70a62HHON2WHAIFIwpPu', 'albertogomez@gmail.com', 'client', 'https://i.pravatar.cc/500?u=8fc781402474f1957a038c61443ae1b3'),
(41, 'Joan', '$2y$12$E/QaieBuXyN3hMuVzjfh6.T5f/ml32683wWeVzxwvyh6bNX/rTKYS', 'joan@gmail.com', 'client', 'https://i.pravatar.cc/500?u=0368cc988a37f13f16420daa9f746e7b'),
(43, 'Pablo', '$2y$12$y64IF6rpuNnI6UoLpTmNBe6nubDmgYsSQOswfIpl6xXLatUPLguI6', 'pablo@gmail.com', 'client', 'https://i.pravatar.cc/500?u=71182af69ae34c8d431aca417bdc5694');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bodywork`
--
ALTER TABLE `bodywork`
  ADD PRIMARY KEY (`id_bodywork`);

--
-- Indices de la tabla `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_brand`);

--
-- Indices de la tabla `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`),
  ADD UNIQUE KEY `vin_num` (`vin_num`),
  ADD UNIQUE KEY `num_plate` (`num_plate`),
  ADD KEY `motor` (`motor`),
  ADD KEY `model` (`model`),
  ADD KEY `bodywork` (`bodywork`);

--
-- Indices de la tabla `cars_img`
--
ALTER TABLE `cars_img`
  ADD PRIMARY KEY (`id_img`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id_model`),
  ADD KEY `brand` (`brand`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`cod_pedido`);

--
-- Indices de la tabla `type_motor`
--
ALTER TABLE `type_motor`
  ADD PRIMARY KEY (`cod_tmotor`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `cod_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`motor`) REFERENCES `type_motor` (`cod_tmotor`),
  ADD CONSTRAINT `car_ibfk_2` FOREIGN KEY (`model`) REFERENCES `model` (`id_model`),
  ADD CONSTRAINT `car_ibfk_3` FOREIGN KEY (`bodywork`) REFERENCES `bodywork` (`id_bodywork`);

--
-- Filtros para la tabla `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `model_ibfk_1` FOREIGN KEY (`brand`) REFERENCES `brand` (`id_brand`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
