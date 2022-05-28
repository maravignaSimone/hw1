-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 28, 2022 alle 19:24
-- Versione del server: 10.4.21-MariaDB
-- Versione PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hw1db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(16) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `user` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `type`, `picture`, `user`) VALUES
(1, 'Pasta alla carbonara', 'Primi', 'Carbonara.jpg', 'Verde Salvia'),
(2, "Pasta all'amatriciana", 'Primi', 'Amatriciana.jpg', 'Verde Salvia'),
(3, 'Gnocchi alla sorrentina', 'Primi', 'Gnocchi_sorrentina.jpg', 'Verde Salvia'),
(4, 'Insalata di riso', 'Primi', 'Insalata_di_riso.jpg', 'Verde Salvia'),
(5, 'Lasagne alla bolognese', 'Primi', 'Lasagne_bolognese.jpg', 'Verde Salvia'),
(6, 'Linguine al nero di seppia', 'Primi', 'Nero_di_seppia.jpg', 'Verde Salvia'),
(7, 'Risotto tricolore', 'Primi', 'Risotto_tricolore.jpg', 'Verde Salvia'),
(8, 'Risotto allo zafferano', 'Primi', 'Risotto_zafferano.jpg', 'Verde Salvia'),
(9, 'Tortellini al sugo', 'Primi', 'Tortellini_sugo.jpg', 'Verde Salvia'),
(10, 'Calamari ripieni', 'Secondi', 'Calamari_ripieni.jpg', 'Verde Salvia'),
(11, 'Pollo al curry', 'Secondi', 'Pollo_curry.jpg', 'Verde Salvia'),
(12, 'Scaloppine ai funghi', 'Secondi', 'Scaloppine_funghi.jpg', 'Verde Salvia'),
(13, 'Vitello tonnato', 'Secondi', 'Vitello_tonnato.jpg', 'Verde Salvia'),
(14, 'Brownies', 'Dolci', 'Brownies.jpg', 'Verde Salvia'),
(15, 'Cheesecake alla stracciatella', 'Dolci', 'Cheesecake_stracciatella.jpg', 'Verde Salvia'),
(16, 'Pancake', 'Dolci', 'Pancake.jpg', 'Verde Salvia'),
(17, 'Tiramisu', 'Dolci', 'Tiramisu.jpg', 'Verde Salvia');

-- --------------------------------------------------------

--
-- Struttura della tabella `stars`
--

CREATE TABLE `stars` (
  `user` int(11) NOT NULL,
  `recipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `stars`
--

INSERT INTO `stars` (`user`, `recipe`) VALUES
(2, 1),
(2, 2),
(2, 7),
(6, 2),
(6, 7),
(6, 8);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `name`, `surname`, `phone`) VALUES
(2, 'simonemar', '$2y$10$cMOVLgHdcVz1z3OTJeg4z.cV7Sre4bzgHxWS2nT53x7X/NficHu8m', 'simonemaravigna@gmail.com', 'Simone', 'Maravigna', ''),
(4, 'test123', '$2y$10$m.KppQAcBZrE1e7my0Mi7.zzHYMW9hUE1WU7NL.TMdYdlmO64EIj2', 'test@gmail.com', 'Prova', 'Test', ''),
(5, 'ciao', '$2y$10$BLDdbQGeDK5Gr/tEBOPlK.NQamQ..iaeD8cm6SXbaqqh05fcYiICK', 'ciao@gmail.com', 'prova', 'test', ''),
(6, 'test_prova', '$2y$10$aV0eUXyqOvoxWlK1nzxRr.6ZeJtIrUPBun2GT9bdUynDfSC.xll8a', 'prova@gmail.com', 'test', 'prova', '');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `stars`
--
ALTER TABLE `stars`
  ADD PRIMARY KEY (`user`,`recipe`),
  ADD KEY `idx_user` (`user`),
  ADD KEY `idx_recipe` (`recipe`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `stars`
--
ALTER TABLE `stars`
  ADD CONSTRAINT `stars_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `stars_ibfk_2` FOREIGN KEY (`recipe`) REFERENCES `recipes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
