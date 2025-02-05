-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 05, 2025 at 05:36 AM
-- Server version: 8.3.0
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
CREATE TABLE IF NOT EXISTS `assets` (
  `name` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `warranty_exp` datetime NOT NULL,
  `assigned_to` int DEFAULT NULL,
  `service_company_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`serial_number`),
  KEY `assigned_to` (`assigned_to`),
  KEY `service_company_id` (`service_company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Equipment Issue', NULL, '2024-12-17 10:01:05', '2024-12-17 10:01:05', NULL),
(2, 'Software Issue', NULL, '2024-12-17 10:01:13', '2024-12-17 10:01:13', NULL),
(3, 'Network Issue', NULL, '2025-01-24 09:37:13', '2025-01-24 09:37:13', NULL),
(4, 'RAMIS System Issue', NULL, '2025-01-24 09:37:42', '2025-01-24 09:37:42', NULL),
(5, 'Email Issue', NULL, '2025-01-24 09:37:52', '2025-01-24 09:37:52', NULL),
(6, 'Others', NULL, '2025-01-24 09:38:01', '2025-01-24 09:38:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
CREATE TABLE IF NOT EXISTS `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `device_type` varchar(255) NOT NULL,
  `purchase_date` date NOT NULL,
  `warranty_expiration_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `brand`, `model`, `company_id`, `createdAt`, `updatedAt`, `user_id`, `deletedAt`, `serial_number`, `device_type`, `purchase_date`, `warranty_expiration_date`) VALUES
(1, 'HP', 'cs15', 1, '2024-12-19 09:42:48', '2024-12-19 09:42:48', 2, NULL, '2345882', 'Monitor', '2020-12-20', '2024-12-20'),
(2, 'Dell', 'LKS', 1, '2024-12-19 16:19:09', '2024-12-19 16:19:09', 2, NULL, NULL, 'Monitor', '2023-12-20', '2024-12-20');

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
CREATE TABLE IF NOT EXISTS `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'colombo', '2024-12-17 09:45:57', '2024-12-17 09:45:57', NULL),
(2, 'Head Office-Mehewara Piyasa-Narahenpita', '2025-01-17 18:45:20', '2025-01-17 18:45:20', NULL),
(3, 'Head Office-Metro Offices', '2025-01-17 18:46:11', '2025-01-17 18:46:11', NULL),
(4, 'Head Office-Nawam Mawatha', '2025-01-17 18:47:10', '2025-01-17 18:47:10', NULL),
(5, 'Head Office-Scout Building', '2025-01-17 18:47:43', '2025-01-17 18:47:43', NULL),
(6, 'Regional Offices', '2025-01-17 18:48:11', '2025-01-17 18:48:11', NULL),
(7, 'Head Office Main Building', '2024-12-17 09:45:57', '2024-12-17 09:45:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_companies`
--

DROP TABLE IF EXISTS `service_companies`;
CREATE TABLE IF NOT EXISTS `service_companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `service_start` datetime NOT NULL,
  `service_end` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `service_companies`
--

INSERT INTO `service_companies` (`id`, `name`, `address`, `email`, `phone`, `service_start`, `service_end`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Nalin', 'Palali rd, Jaffna', 'nalin@email.com', '023123567', '2023-12-19 09:41:07', '2024-12-22 00:00:00', '2024-12-19 09:41:07', '2024-12-19 09:41:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `priority` tinyint NOT NULL DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `serial_no` varchar(100) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tickets_serial_no_foreign_idx` (`serial_no`),
  KEY `user_id` (`user_id`),
  KEY `assigned_to` (`assigned_to`),
  KEY `category_id` (`category_id`),
  KEY `device_id` (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `description`, `status`, `priority`, `user_id`, `assigned_to`, `createdAt`, `updatedAt`, `deletedAt`, `category_id`, `serial_no`, `model`, `brand`, `device_id`) VALUES
(110, 'Fugiat deserunt nesc ft', 1, 0, 3, 5, '2025-01-08 14:32:36', '2025-01-29 09:47:23', NULL, 2, '', 'cs15', 'HP', 1),
(111, 'Fugiat deserunt nesc delete', 1, 0, 3, 5, '2025-01-06 14:33:20', '2025-01-29 09:22:59', '2025-01-29 09:26:11', 1, '', 'cs15', 'HP', 1),
(112, 'Fugiat deserunt nesc delete', 2, 0, 3, NULL, '2025-01-06 14:34:17', '2025-01-29 09:27:16', '2025-01-29 09:28:27', 1, '', 'LKS', 'Dell', 2),
(113, 'Fugiat deserunt nesc113', 2, 0, 3, NULL, '2025-01-06 14:41:42', '2025-01-29 09:58:12', NULL, 1, '', 'null', 'null', NULL),
(114, 'Fugiat deserunt nesc114', 1, 0, 3, NULL, '2025-01-06 14:42:09', '2025-01-29 09:58:31', NULL, 1, '', 'null', 'null', NULL),
(115, 'Fugiat deserunt nesc115', 0, 0, 3, NULL, '2025-01-24 14:48:47', '2025-01-29 09:59:00', '2025-01-29 10:01:43', 1, '', 'null', 'null', NULL),
(116, 'Fugiat deserunt nesc116', 0, 0, 3, NULL, '2025-01-06 14:49:07', '2025-01-29 10:02:05', '2025-01-29 10:02:58', 1, '', 'null', 'null', NULL),
(117, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 14:59:13', '2025-01-06 14:59:13', '2025-01-29 10:03:11', 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(118, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:04:31', '2025-01-06 15:04:31', '2025-01-29 10:03:23', 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(119, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:04:58', '2025-01-06 15:04:58', '2025-01-29 10:04:41', 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(120, 'Fugiat deserunt nesc120', 0, 0, 3, NULL, '2025-01-06 15:06:50', '2025-01-29 10:05:08', '2025-01-29 10:05:18', 1, '', 'null', 'null', NULL),
(121, 'Fugiat deserunt nesc121', 0, 0, 3, NULL, '2025-01-06 15:06:52', '2025-01-29 10:05:51', '2025-01-29 10:05:58', 1, '', 'null', 'null', NULL),
(122, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:06:52', '2025-01-06 15:06:52', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(123, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:06:52', '2025-01-06 15:06:52', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(124, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:06:52', '2025-01-06 15:06:52', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(125, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:07:07', '2025-01-06 15:07:07', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(126, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:07:38', '2025-01-06 15:07:38', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(127, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:08:49', '2025-01-06 15:08:49', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(128, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2025-01-06 15:09:33', '2025-01-06 15:09:33', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(129, 'Fugiat deserunt nesc', 0, 1, 3, NULL, '2025-01-06 15:09:35', '2025-01-06 15:09:35', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(130, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2024-12-13 15:10:59', '2025-01-06 15:10:59', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(131, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2024-12-31 15:12:53', '2025-01-06 15:12:53', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(132, 'Fugiat deserunt nesc', 0, 0, 3, NULL, '2024-11-12 15:12:55', '2025-01-06 15:12:55', NULL, 1, '', 'Eveniet doloremque error quasi aliquid saepe dolor', 'Impedit ut est quo fugit voluptatem debitis qui ex', NULL),
(143, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-06 15:23:45', '2025-01-06 15:23:45', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(144, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-23 15:24:05', '2025-01-06 15:24:05', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(145, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-06 15:25:24', '2025-01-06 15:25:24', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(146, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-06 15:27:11', '2025-01-06 15:27:11', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(147, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-06 15:27:24', '2025-01-06 15:27:24', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(148, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-06 15:28:15', '2025-01-06 15:28:15', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(149, 'Veniam doloribus no', 0, 2, 3, NULL, '2025-01-06 15:32:10', '2025-01-06 15:32:10', NULL, 1, '', 'Aspernatur dolor adipisicing est rem voluptas est ', 'Illum porro sit voluptatem ipsum laudantium et et ', NULL),
(150, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:33:10', '2025-01-06 15:33:10', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(151, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:33:29', '2025-01-06 15:33:29', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(152, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:40:09', '2025-01-06 15:40:09', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(153, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:40:16', '2025-01-06 15:40:16', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(154, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:40:47', '2025-01-06 15:40:47', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(155, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:41:36', '2025-01-06 15:41:36', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(156, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:41:43', '2025-01-06 15:41:43', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(157, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:42:30', '2025-01-06 15:42:30', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(158, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:42:59', '2025-01-06 15:42:59', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(159, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:43:42', '2025-01-06 15:43:42', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(160, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:44:35', '2025-01-06 15:44:35', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(161, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:47:19', '2025-01-06 15:47:19', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(162, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:48:46', '2025-01-06 15:48:46', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(163, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:49:49', '2025-01-06 15:49:49', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(164, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:51:30', '2025-01-06 15:51:30', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(165, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:52:46', '2025-01-06 15:52:46', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(166, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:54:36', '2025-01-06 15:54:36', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(167, 'Eum sit rerum nesciu', 0, 2, 3, NULL, '2025-01-06 15:55:18', '2025-01-06 15:55:18', NULL, 1, '', 'Quod architecto dolor exercitation quas velit id c', 'Quod labore in dolores laudantium dolorem exceptur', NULL),
(168, 'Amet aut veniam in', 0, 0, 3, NULL, '2025-01-06 16:00:04', '2025-01-06 16:00:04', NULL, 1, '', 'Voluptas do maxime excepteur dolor dolore dolorem ', 'Temporibus quas deserunt inventore eiusmod sunt qu', NULL),
(169, 'Mollit sed et et err', 0, 2, 3, NULL, '2025-01-07 12:06:57', '2025-01-07 12:06:57', NULL, 1, '', 'Ut qui quidem voluptas eiusmod tempore fuga Consec', 'Sapiente ipsa ab sint quia explicabo Sit possimus ', NULL),
(170, 'Mollit sed et et err', 0, 0, 3, NULL, '2025-01-07 12:08:25', '2025-01-07 12:08:25', NULL, 1, '', 'Ut qui quidem voluptas eiusmod tempore fuga Consec', 'Sapiente ipsa ab sint quia explicabo Sit possimus ', NULL),
(171, 'Mollit sed et et err', 0, 1, 3, NULL, '2025-01-07 12:08:30', '2025-01-07 12:08:30', NULL, 1, '', 'Ut qui quidem voluptas eiusmod tempore fuga Consec', 'Sapiente ipsa ab sint quia explicabo Sit possimus ', NULL),
(172, 'Mollit sed et et err', 0, 1, 3, NULL, '2025-01-07 12:08:35', '2025-01-07 12:08:35', NULL, 1, '', 'Ut qui quidem voluptas eiusmod tempore fuga Consec', 'Sapiente ipsa ab sint quia explicabo Sit possimus ', NULL),
(173, 'Mollit sed et et err', 0, 1, 3, NULL, '2025-01-07 12:08:44', '2025-01-07 12:08:44', NULL, 2, '', 'Ut qui quidem voluptas eiusmod tempore fuga Consec', 'Sapiente ipsa ab sint quia explicabo Sit possimus ', NULL),
(176, 'Ut qui totam nostrum', 0, 2, 4, 5, '2025-01-27 09:43:10', '2025-01-27 09:43:10', NULL, 1, '', 'Sit esse irure rerum architecto eligendi repellend', 'Sed libero dolor est nesciunt officia', 1),
(179, 'Fugit nihil Nam ut ', 0, 2, 4, NULL, '2025-01-27 12:12:45', '2025-01-27 12:12:45', NULL, 1, '', 'Qui doloribus fugiat ab duis voluptatem consectetu', 'Culpa doloremque officia esse sunt voluptas volupt', NULL),
(180, 'Fugit nihil Nam ut ', 0, 2, 4, NULL, '2025-01-27 12:12:50', '2025-01-27 12:12:50', NULL, 1, '', 'Qui doloribus fugiat ab duis voluptatem consectetu', 'Culpa doloremque officia esse sunt voluptas volupt', NULL),
(181, 'Reprehenderit commod', 0, 2, 4, NULL, '2025-01-27 14:48:33', '2025-01-29 09:15:26', NULL, 1, '', 'null', 'null', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_comments`
--

DROP TABLE IF EXISTS `ticket_comments`;
CREATE TABLE IF NOT EXISTS `ticket_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `ticket_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_images`
--

DROP TABLE IF EXISTS `ticket_images`;
CREATE TABLE IF NOT EXISTS `ticket_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `ticket_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ticket_images`
--

INSERT INTO `ticket_images` (`id`, `path`, `ticket_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(10, '', 161, '2025-01-06 15:47:19', '2025-01-06 15:47:19', NULL),
(11, '', 161, '2025-01-06 15:47:19', '2025-01-06 15:47:19', NULL),
(12, '', 162, '2025-01-06 15:48:46', '2025-01-06 15:48:46', NULL),
(13, '', 162, '2025-01-06 15:48:46', '2025-01-06 15:48:46', NULL),
(14, '', 163, '2025-01-06 15:49:49', '2025-01-06 15:49:49', NULL),
(15, '', 163, '2025-01-06 15:49:49', '2025-01-06 15:49:49', NULL),
(16, '', 164, '2025-01-06 15:51:30', '2025-01-06 15:51:30', NULL),
(17, '', 164, '2025-01-06 15:51:30', '2025-01-06 15:51:30', NULL),
(18, '', 165, '2025-01-06 15:52:46', '2025-01-06 15:52:46', NULL),
(19, '', 165, '2025-01-06 15:52:46', '2025-01-06 15:52:46', NULL),
(20, '', 166, '2025-01-06 15:54:36', '2025-01-06 15:54:36', NULL),
(21, '', 166, '2025-01-06 15:54:36', '2025-01-06 15:54:36', NULL),
(23, 'uploads\\file-1736159118414-948282039.png', 167, '2025-01-06 15:55:18', '2025-01-06 15:55:18', NULL),
(24, 'uploads\\file-1736159404524-564373183.jpg', 168, '2025-01-06 16:00:04', '2025-01-06 16:00:04', NULL),
(25, 'uploads\\file-1736159404535-314167047.jpg', 168, '2025-01-06 16:00:04', '2025-01-06 16:00:04', NULL),
(26, 'uploads\\file-1737951190325-664049782.png', 176, '2025-01-27 09:43:10', '2025-01-27 09:43:10', NULL),
(27, 'http://localhost:8080/uploads/file-1737969513005-18795304.jpeg', 181, '2025-01-27 14:48:34', '2025-01-27 14:48:34', NULL),
(28, 'http://localhost:8080/uploads/file-1737969513007-380590837.png', 181, '2025-01-27 14:48:34', '2025-01-27 14:48:34', '2025-01-29 09:14:18');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
CREATE TABLE IF NOT EXISTS `units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `region_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `region_id` (`region_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `region_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'unit01', 1, '2024-12-17 09:46:19', '2024-12-17 09:46:19', NULL),
(2, 'Budulla', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(3, 'Batticaloa', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(4, 'Capital Gain Tax', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(5, 'Central Document Management', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(6, 'Central Processing', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(7, 'Change Management', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(8, 'Clearance & Directions', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(9, 'Colombo Central', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(10, 'Colombo City', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(11, 'Colombo East', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(12, 'Colombo South', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(13, 'Colombo West', 3, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(14, 'Commissioner General Office', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(15, 'Customer Information Update', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(16, 'Human Resource Management', 4, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(17, 'ITAS-Data Center', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(18, 'ITAS-Head Office', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(19, 'ITAS-Data Recovery', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(20, 'Finance', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(21, 'Forced Registration', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(22, 'LTO Appeal', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(23, 'LTO Default Tax Collection', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(24, 'LTO Finance 01', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(25, 'LTO Finance 02', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(26, 'LTO Investigation', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(27, 'LTO Manufacturing', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(28, 'LTO Service 01', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(29, 'LTO Service 02', 5, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(30, 'MCO Service 01', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(31, 'MCO Service 02', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(32, 'MCO Service 03', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(33, 'MCO W & R1', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(34, 'MCO W & R2', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(35, 'MCO W & R3', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(36, 'MCO Finance', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(37, 'MCO Manufacturing', 2, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(38, 'Dambulla', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(39, 'Galle', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(40, 'Gampaha East', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(41, 'Gampaha West', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(42, 'Jaffna', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(43, 'Kalutara', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(44, 'Kandy', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(45, 'Kegalle', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(46, 'Kurunegala', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(47, 'Matara', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(48, 'Negombo', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(49, 'Nuwara Eliya', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(50, 'Rathnapura', 6, '2025-01-01 10:00:00', '2025-01-01 10:00:00', NULL),
(51, 'Colombo', 6, '2024-12-17 09:46:19', '2024-12-17 09:46:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `emId` int NOT NULL AUTO_INCREMENT,
  `employeeId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `firstLogin` tinyint(1) DEFAULT '0',
  `setExpiryDate` date DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'staff',
  `password` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `unit_id` int DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`emId`),
  UNIQUE KEY `users_email` (`email`),
  KEY `users_status` (`status`),
  KEY `unit_id` (`unit_id`),
  KEY `serial_number` (`serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`emId`, `employeeId`, `name`, `email`, `contact`, `designation`, `firstLogin`, `setExpiryDate`, `role`, `password`, `status`, `unit_id`, `serial_number`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(2, 'jdsfn', 'staff33', 'staff3@email.com', '+94763787940', '', 1, '2024-11-30', 'staff', '$2a$08$Vz3T45oziBER8IBda7RFxe5mbLCWkG5V0nclx78QNmQvbWBPKoMFO', 0, 1, NULL, '2024-12-17 15:16:38', '2025-01-29 09:16:34', NULL),
(3, 'jdsfn', 'staff2', 'staff2@email.com', '+94763787940', 'Account', 0, '2024-11-30', 'staff', '$2a$08$UZxZd/dXuHdWOLiAQNwGzefCfqZ4Ap/7wQbxCdxXlftrfOvpAj9ci', 0, 1, NULL, '2024-12-17 15:17:04', '2024-12-17 15:17:04', NULL),
(4, 'admin', 'admin', 'admin@email.com', '0777123456', 'admin', 0, NULL, 'admin', '$2a$08$UZxZd/dXuHdWOLiAQNwGzefCfqZ4Ap/7wQbxCdxXlftrfOvpAj9ci', 1, 1, NULL, '2024-12-19 11:13:20', '2024-12-19 11:13:20', NULL),
(5, 'itsaff', 'IT staff', 'reyanson4222@gmail.com', '+94 76 378 7940', 'ICTA', 1, NULL, 'it_team', '$2a$08$pRblYr8n3.LBFigEYYM26.FwhlJF3XvlcivcFggJzg/m8B8UneBVW', 1, 1, NULL, '2025-01-07 11:37:10', '2025-01-07 11:37:10', NULL),
(6, 'itsaff', 'It Director', 'itdirector@gmail.com', '+94 76 378 7940', 'ICTA', 1, NULL, 'it_director', '$2a$08$q4r69p5vjSzIsG2tSBWZvOphX629nXIloAgHB7J3ciD2DC1yfcP.u', 1, 1, NULL, '2025-01-07 11:38:24', '2025-01-07 11:38:24', NULL),
(7, 'itteam', 'IT team ', 'it-incharge@gmail.com', '+94 76 378 7940', 'ICTA', 1, NULL, 'it_in_charge', '$2a$08$UZxZd/dXuHdWOLiAQNwGzefCfqZ4Ap/7wQbxCdxXlftrfOvpAj9ci', 1, 1, NULL, '2025-01-07 11:40:24', '2025-01-07 11:40:24', NULL),
(8, 'accstaff', 'account staff', 'accountstaff@gmail.com', '+94 76 378 7940', 'ICTA', 1, NULL, 'account_staff', '$2a$08$Ose7faY7qmTGrnvPbsZBluIopDTtUP/nJfZdY.pvL1PAwJ.CngTn2', 1, 1, NULL, '2025-01-07 11:43:42', '2025-01-07 11:43:42', NULL),
(9, 'supplystaff', 'supply staff', 'supplystaff@gmail.com', '+94 76 378 7940', 'ICTA', 1, NULL, 'supply_staff', '$2a$08$dI9VB97PrUixoig.Ymy/nueQtZ/Ogclwle.qHLI/ejiEXkuGbKKl.', 1, 1, NULL, '2025-01-07 11:46:21', '2025-01-07 11:46:21', NULL),
(12, 'Tempore rerum corporis aspernatur et', 'Drew House', 'john@gmail.com', '+17 68 993 9311', 'ICTA', 1, NULL, 'it_team', '$2a$08$UZxZd/dXuHdWOLiAQNwGzefCfqZ4Ap/7wQbxCdxXlft...', 1, 1, NULL, '2025-01-07 11:47:12', '2025-01-07 11:47:12', NULL),
(13, 'Officia in sunt rerum vel sed quo quasi excepteur dolor consectetur ea perspiciatis eu itaque', 'Oprah Mcintyre', 'mike@gmail.com', '+18 08 741 1164', 'ICTA', 1, NULL, 'it_team', '$2a$08$UZxZd/dXuHdWOLiAQNwGzefCfqZ4Ap/7wQbxCdxXlft...', 1, 1, NULL, '2025-01-07 11:47:37', '2025-01-07 11:47:37', NULL),
(14, 'Ratione in sint laborum Excepturi eu ad est est aliqua Sed unde quos aspernatur dolore', 'Charde Castro', 'vaxuheqar@mailinator.com', '+17 24 445 4062', 'ICTA', 1, NULL, 'staff', '$2a$08$HnY2OaAuRfP00cv2zYBmWuUsBfZYkFwgpRMIhWZ8sic0G0DlVGT6i', 1, 1, NULL, '2025-01-07 11:47:55', '2025-01-07 11:47:55', NULL),
(15, 'Et voluptas placeat voluptatem laborum saepe aute delectus dolor voluptatem saepe quis eum hic', 'Mallory Cook', 'tohydisi@mailinator.com', '+12 29 957 9692', 'ICTA', 1, NULL, 'staff', '$2a$08$lhCipK0JcGt3/aNJ08lmtuEmCVt4I80HizLM/qThSZWfYTfSTAGv2', 1, 1, NULL, '2025-01-07 11:48:25', '2025-01-07 11:48:25', NULL),
(16, 'Facilis dolorem ut id laboriosam possimus sit sequi voluptatem voluptas et non qui ipsa', 'Peter Harmon', 'pimy@mailinator.com', '+12 01 607 4105', 'ICTA', 1, NULL, 'staff', '$2a$08$H0sVdp8crmgFwwkVbfKC1evaSh2jhu1vVk0hfERoDmBHkmFQCDbAy', 1, 1, NULL, '2025-01-07 11:48:49', '2025-01-07 11:48:49', NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_735` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`emId`),
  ADD CONSTRAINT `assets_ibfk_736` FOREIGN KEY (`service_company_id`) REFERENCES `service_companies` (`id`);

--
-- Constraints for table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `devices_ibfk_603` FOREIGN KEY (`company_id`) REFERENCES `service_companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `devices_ibfk_604` FOREIGN KEY (`user_id`) REFERENCES `users` (`emId`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1314` FOREIGN KEY (`user_id`) REFERENCES `users` (`emId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_1315` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`emId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_1316` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_1317` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket_comments`
--
ALTER TABLE `ticket_comments`
  ADD CONSTRAINT `ticket_comments_ibfk_641` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `ticket_comments_ibfk_642` FOREIGN KEY (`user_id`) REFERENCES `users` (`emId`);

--
-- Constraints for table `ticket_images`
--
ALTER TABLE `ticket_images`
  ADD CONSTRAINT `ticket_images_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_21` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_22` FOREIGN KEY (`serial_number`) REFERENCES `assets` (`serial_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
