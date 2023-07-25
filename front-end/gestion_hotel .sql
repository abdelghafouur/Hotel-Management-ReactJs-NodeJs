-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 10, 2023 at 09:54 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `chambre`
--

DROP TABLE IF EXISTS `chambre`;
CREATE TABLE IF NOT EXISTS `chambre` (
  `NumChamb` int NOT NULL,
  `NumEtage` int NOT NULL,
  `NmbCouchage` int NOT NULL,
  `NmbBain` int NOT NULL,
  `Type` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `Prix` int NOT NULL,
  PRIMARY KEY (`NumChamb`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chambre`
--

INSERT INTO `chambre` (`NumChamb`, `NumEtage`, `NmbCouchage`, `NmbBain`, `Type`, `image`, `Prix`) VALUES
(55, 3, 3, 3, 'single', 'image-1675996325672.pic3.jpg', 300);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `IdCl` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Tele` varchar(50) NOT NULL,
  `Adresse` varchar(50) NOT NULL,
  `User` varchar(50) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Role` varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`IdCl`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`IdCl`, `Nom`, `Prenom`, `Email`, `Tele`, `Adresse`, `User`, `Password`, `Role`) VALUES
(10, 'eeeeeeeeeeeee', 'lopaa', 'Amanu.abdou@gmail.com', '06544343', 'kkkkkkkkkkklo', 'admin', 'admin', 'admin'),
(11, 'youssefff', 'allaoui', 'abdfrrrr@gmail.com', '3434355', 'user', 'user', 'user', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `compte`
--

DROP TABLE IF EXISTS `compte`;
CREATE TABLE IF NOT EXISTS `compte` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `User` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
  `IdCl` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Fk1_idx` (`IdCl`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservationn`
--

DROP TABLE IF EXISTS `reservationn`;
CREATE TABLE IF NOT EXISTS `reservationn` (
  `IdRes` int NOT NULL AUTO_INCREMENT,
  `DateRes` date NOT NULL,
  `DateDebut` date NOT NULL,
  `NmbrNuits` int NOT NULL,
  `PrixTotal` int NOT NULL,
  `IdCln` int NOT NULL,
  `NumChambr` int NOT NULL,
  PRIMARY KEY (`IdRes`),
  KEY `FK1_idx` (`IdCln`),
  KEY `FK2_idx` (`NumChambr`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reservationn`
--

INSERT INTO `reservationn` (`IdRes`, `DateRes`, `DateDebut`, `NmbrNuits`, `PrixTotal`, `IdCln`, `NumChambr`) VALUES
(51, '2023-02-10', '2023-02-11', 3, 900, 11, 55),
(52, '2023-02-10', '2023-02-11', 2, 600, 11, 55);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `Fk1` FOREIGN KEY (`IdCl`) REFERENCES `client` (`IdCl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservationn`
--
ALTER TABLE `reservationn`
  ADD CONSTRAINT `kk1` FOREIGN KEY (`IdCln`) REFERENCES `client` (`IdCl`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kk2` FOREIGN KEY (`NumChambr`) REFERENCES `chambre` (`NumChamb`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
