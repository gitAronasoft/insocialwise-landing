-- Migration: Create initial tables for Insoicalvise backend
-- Run: mysql -u root -h localhost node_insocialvise < 001_create_tables.sql

CREATE DATABASE IF NOT EXISTS `node_insocialvise` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `node_insocialvise`;

-- Users table (timestamps enabled via Sequelize)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Superadmin','Admin','User') NOT NULL DEFAULT 'User',
  `status` ENUM('0','1','2') NOT NULL DEFAULT '0',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Subscriptions table (timestamps enabled)
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(255) NOT NULL,
  `stripe_customer_id` VARCHAR(255) NOT NULL,
  `stripe_subscription_id` VARCHAR(255) NOT NULL,
  `price_id` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `trial_end` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Transactions table (no timestamps in model)
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subscription_id` INT NOT NULL,
  `stripe_invoice_id` VARCHAR(255) DEFAULT NULL,
  `stripe_payment_intent_id` VARCHAR(255) DEFAULT NULL,
  `amount` INT NOT NULL,
  `currency` VARCHAR(10) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_subscription_id` (`subscription_id`),
  CONSTRAINT `fk_transactions_subscription` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
