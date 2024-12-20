-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 09, 2024 at 09:04 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Colombo', '2024-12-02 07:50:27', '2024-12-02 07:50:27', NULL),
(2, 'Jaffna', '2024-12-02 07:50:36', '2024-12-02 07:50:36', NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status_id` tinyint NOT NULL DEFAULT '0',
  `priority` tinyint NOT NULL DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `assigned_to` (`assigned_to`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `status_id`, `priority`, `user_id`, `assigned_to`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(2, 'new ticket', '1st ticket', 0, 0, 3, NULL, '2024-12-06 11:45:16', '2024-12-06 11:45:16', NULL),
(3, 'new ticket', '2nd ticket', 0, 0, 4, NULL, '2024-12-06 12:10:25', '2024-12-06 12:10:25', NULL),
(4, 'new ticket', '3rd ticket', 1, 1, 3, NULL, '2024-12-06 12:10:51', '2024-12-06 12:10:51', NULL),
(5, 'new ticket', '3rd ticket', 1, 2, 4, NULL, '2024-12-06 12:11:19', '2024-12-06 12:11:19', NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `region_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'HR', 1, '2024-12-02 07:50:48', '2024-12-02 07:50:48', NULL),
(2, 'IT', 2, '2024-12-02 07:51:00', '2024-12-02 07:51:00', NULL),
(3, 'Account', 2, '2024-12-02 07:51:13', '2024-12-02 07:51:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `emId` int NOT NULL AUTO_INCREMENT,
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
  `employeeId` varchar(255) NOT NULL,
  PRIMARY KEY (`emId`),
  UNIQUE KEY `users_email` (`email`),
  KEY `users_status` (`status`),
  KEY `unit_id` (`unit_id`),
  KEY `serial_number` (`serial_number`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`emId`, `name`, `email`, `contact`, `designation`, `firstLogin`, `setExpiryDate`, `role`, `password`, `status`, `unit_id`, `serial_number`, `createdAt`, `updatedAt`, `deletedAt`, `employeeId`) VALUES
(2, 'admin', 'admin@email.com', '+94763787940', 'Account', 0, '2024-11-30', 'admin', '$2a$08$IQ6i4EQEQM1j6t65mgiWlOXw1HyvWVz5wsEq2RWHHNGEj1I7BVdMe', 0, 1, NULL, '2024-12-02 13:21:23', '2024-12-02 13:21:23', NULL, ''),
(3, 'Reyanson Sosai', 'reyanson@email.com', '+94763787940', 'Account', 0, '2024-12-05', 'staff', '$2a$10$Tz2o3PJsMnpF8GYhQGw9Lu9XjVSgYJ4V65ABDTUQh.Iv9.y2EicGG', 1, 1, NULL, '2024-12-02 13:21:39', '2024-12-04 22:45:50', NULL, 'reyan123'),
(4, 'staff2', 'staff2@email.com', '+94763787940', 'Account', 0, '2025-01-31', 'staff', '$2a$08$F6mNjfvBdM.IQhvFIKDcy.QT3lwts.83Sf5HMETL7fKmHfRVHqzk6', 0, 1, NULL, '2024-12-02 13:21:47', '2024-12-04 22:47:22', NULL, ''),
(5, 'staff3', 'staff3@email.com', '+94763787940', 'Account', 0, '2024-11-30', 'staff', '$2a$08$KkSXE0yumWclBOoPD01YDONRSa75Rhan.f6CfYyXOh0dwZ1Dn4CZa', 0, 1, NULL, '2024-12-02 13:21:54', '2024-12-02 13:21:54', '2024-12-02 13:42:27', ''),
(6, 'Orlando Hensley', 'zosigarevy@mailinator.com', '+19 03 765 6355', 'HR', 1, '0000-00-00', 'it_officer', '$2a$08$GZFtoOh6hShORfbszBl4QObyIl2ha5Qv3pEyu.LSegWdK4SryGUny', 1, 1, NULL, '2024-12-02 13:23:01', '2024-12-04 12:39:37', NULL, ''),
(7, 'Reuben Foreman', 'zesovyju@mailinator.com', '+12 04 892 4735', 'IT staff', 1, NULL, 'admin', '$2a$08$wo9Hqt5ImHleM6qd6kzXs.hDpHerGg8xUdR5n/.LHiWtSLXOotVu6', 1, 1, NULL, '2024-12-04 14:02:58', '2024-12-04 14:02:58', '2024-12-04 20:37:35', ''),
(8, 'Nicholas Daniel', 'qecuq@mailinator.com', '+18 36 359 2946', 'IT staff', 0, '2024-12-31', 'staff', '$2a$08$Q0Jb6rEKtzu.9TsJSa5o..OI/zdEqV1ZsS0Lk8DN6faInEl76BY6a', 1, 1, NULL, '2024-12-04 22:10:16', '2024-12-04 22:46:18', NULL, 'Nic123'),
(9, 'Risa Robertson', 'gapinal@mailinator.com', '+15 43 556 2127', 'HR', 1, NULL, 'it_officer', '$2a$08$qRtkB1203OZ9TBVZ0XQ/lereGCp2dsKm/e3ZAqHS8JBhNNN5AIzGy', 1, 1, NULL, '2024-12-09 14:21:48', '2024-12-09 14:21:48', NULL, 'Consectetur sed ullam adipisci nulla eos ex vel cum sed');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_85` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`emId`),
  ADD CONSTRAINT `assets_ibfk_86` FOREIGN KEY (`service_company_id`) REFERENCES `service_companies` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`emId`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`emId`);

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_171` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_172` FOREIGN KEY (`serial_number`) REFERENCES `assets` (`serial_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
