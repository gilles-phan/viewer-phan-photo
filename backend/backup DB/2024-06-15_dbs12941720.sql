-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Hôte : db5015874596.hosting-data.io
-- Généré le : ven. 14 juin 2024 à 23:41
-- Version du serveur : 10.6.15-MariaDB-log
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbs12941720`
--

-- --------------------------------------------------------

--
-- Structure de la table `shootings`
--

CREATE TABLE `shootings` (
  `id` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `label` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `image_path` varchar(256) NOT NULL,
  `thumbnail` varchar(60) DEFAULT NULL,
  `date` date NOT NULL,
  `hidden` tinyint(1) NOT NULL DEFAULT 0,
  `type_id` int(11) NOT NULL,
  `nb_photos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `shootings`
--

INSERT INTO `shootings` (`id`, `uuid`, `label`, `description`, `image_path`, `thumbnail`, `date`, `hidden`, `type_id`, `nb_photos`) VALUES
(3, '018f23ff-b65f-79fb-a2e0-cd72eb0245ff', 'Trec de Préjeurin', 'Photos livrées du trec', '2024/2024-04-13', '1800_D85_9784-Avec accentuation-Bruit-Modifier_SD.jpg', '2024-04-13', 0, 1, NULL),
(4, 'cb1317fe-e936-48a3-9aa5-551e0e778f78', 'Trec de Machézal', 'Aperçu des photos à commander', '2024/2024-05-05', 'images.jpg', '2024-05-05', 0, 1, NULL),
(5, '018f2423-d105-79d4-935b-4f2beedb9588', 'Portrait Sylvie et Didou', 'Portrait de Sylvie pour son CV', '2024/2024-04-27', '1914_Z91_2371_SD.jpg', '2024-04-27', 1, 1, NULL),
(6, 'e8d9c8ec-c109-4aaf-8019-bed7852a107a', 'Dimanche Maëlle', 'Dimanche moto', '2024/2024-05-11', '1713_Z91_5091_SD.jpg', '2024-05-11', 1, 1, NULL),
(7, '0c6bb8ef-49bd-4058-9c8b-e0701a0d76e7', 'Sophie et Guillaume', 'Portrait Sophie (photo à choisir)', '2024/2024-05-10', '1216_Z91_4800_SD.jpg', '2024-05-10', 1, 1, NULL),
(8, '82537981-7435-4e15-8509-e494b10f6f2a', 'Thomas', 'Magicien', '2024/2024-03-31', '1755_DSC_3367_SD.jpg', '2024-03-31', 0, 1, NULL),
(9, 'd39cdabe-6ed6-4898-b647-75fb43fdc2b1', '\r\nTrec de Préjeurin', 'POR le matin', '2024/2024-04-14', 'thumbnail.jpg', '2024-04-14', 0, 1, NULL),
(10, '5023e445-e0b9-423a-8e11-9e7de499f4ad', 'Ride and fun', 'Premier jour', '2024/2024-05-18', '1927_Z62_3664_SD.jpg', '2024-05-18', 0, 1, NULL),
(11, '4540595f-97dc-4e63-af97-9bbca2932ae4', 'Ride and fun', 'Second jour', '2024/2024-05-19', '1510_Z91_7868_SD.jpg', '2024-05-19', 0, 1, NULL),
(12, 'eefdc838-2a7b-419c-a4d7-24df1d74cbdb', 'Ride and fun', 'Troisième jour', '2024/2024-05-20', 'thumbnail.jpg', '2024-05-20', 0, 1, NULL),
(13, 'bdd10984-2a7a-4109-a903-5ae76529d1f8', 'Concours Tir à l\'arc', '2nde manche', '2024/2024-05-25', '1609_Z62_4815_SD.jpg', '2024-05-25', 0, 1, NULL),
(14, '57d16383-4f53-4f75-8196-6e3a8d5b5e9e', 'Commande Poun\'s', 'Maëllys Verne', '2024/2024-05-20/commandes/01', '0835_Z91_8121-Modifier_SD.jpg', '2024-05-20', 0, 1, NULL),
(15, '6c892102-71d7-46ff-ab16-1389011d704d', 'Camille et Romain à Noël', 'Shooting à la maison', '2023/2023-12-24', 'thumbnail.jpg', '2023-12-23', 0, 2, NULL),
(16, 'a7090ef8-5d45-4911-95ff-c9b88cb7d5d1', 'Concours Tir à l\'arc', 'Championnat de France et Championnat de la Loire', '2024/2024-06-09', 'thumbnail.jpg', '2024-06-09', 0, 2, NULL),
(17, '4550b544-1722-4152-9f29-ae56f4f16856', 'TREC du Pilat', 'Aperçu des photos à commander', '2024/2024-06-16', 'thumbnail.jpg', '2024-06-16', 0, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `shootings_tags`
--

CREATE TABLE `shootings_tags` (
  `id` int(11) NOT NULL,
  `shooting_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `shootings_tags`
--

INSERT INTO `shootings_tags` (`id`, `shooting_id`, `tag_id`) VALUES
(5, 3, 1),
(6, 3, 3),
(7, 7, 2),
(8, 15, 2),
(9, 5, 2),
(10, 14, 1),
(11, 14, 3),
(12, 10, 1),
(13, 10, 3),
(14, 11, 1),
(15, 11, 3),
(16, 8, 2),
(17, 16, 3),
(18, 13, 3),
(19, 4, 1),
(20, 13, 3),
(21, 9, 1),
(22, 9, 3),
(23, 6, 4),
(24, 12, 1),
(25, 12, 3),
(26, 17, 1),
(27, 17, 3);

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `label` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `label`) VALUES
(1, 'Cheval'),
(2, 'Portrait'),
(3, 'Evenementiel'),
(4, 'Lingerie');

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `label` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `types`
--

INSERT INTO `types` (`id`, `label`) VALUES
(1, 'horse'),
(2, 'event');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(80) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `shootings`
--
ALTER TABLE `shootings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shootings-types` (`type_id`);

--
-- Index pour la table `shootings_tags`
--
ALTER TABLE `shootings_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shootings` (`shooting_id`),
  ADD KEY `tags` (`tag_id`);

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `shootings`
--
ALTER TABLE `shootings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `shootings_tags`
--
ALTER TABLE `shootings_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `shootings`
--
ALTER TABLE `shootings`
  ADD CONSTRAINT `shootings-types` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

--
-- Contraintes pour la table `shootings_tags`
--
ALTER TABLE `shootings_tags`
  ADD CONSTRAINT `shootings` FOREIGN KEY (`shooting_id`) REFERENCES `shootings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tags` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
