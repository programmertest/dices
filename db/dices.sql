-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2017 a las 04:59:53
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dices`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `play`
--

CREATE TABLE `play` (
  `play_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `play_points` int(10) NOT NULL,
  `play_number` int(10) NOT NULL,
  `user_versus` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `play`
--

INSERT INTO `play` (`play_id`, `user_id`, `play_points`, `play_number`, `user_versus`) VALUES
(1, 1, 12, 1, 2),
(2, 1, 12, 1, 2),
(3, 1, 12, 1, 2),
(4, 1, 12, 2, 3),
(5, 1, 12, 2, 3),
(6, 1, 12, 2, 3),
(7, 2, 10, 1, 1),
(8, 2, 10, 1, 1),
(9, 2, 10, 1, 1),
(10, 3, 10, 1, 1),
(11, 3, 10, 1, 1),
(12, 3, 10, 1, 1),
(13, 2, 5, 2, 3),
(14, 2, 5, 2, 3),
(15, 2, 5, 2, 3),
(16, 3, 5, 2, 2),
(17, 3, 5, 2, 2),
(18, 3, 5, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(80) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_play` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_play`) VALUES
(1, 'Anónimo 1', 'Test1@gmail.com', '849fa636d4a3cb6fe18aa28b3316691142c35993', 3),
(2, 'Anónimo 2', 'Test2@gmail.com', '849fa636d4a3cb6fe18aa28b3316691142c35993', 3),
(3, 'Anónimo 3', 'Test3@gmail.com', '849fa636d4a3cb6fe18aa28b3316691142c35993', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `play`
--
ALTER TABLE `play`
  ADD PRIMARY KEY (`play_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `play`
--
ALTER TABLE `play`
  MODIFY `play_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
