-- phpMyAdmin SQL Dump
-- version 4.4.15.8
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 26, 2017 at 09:10 AM
-- Server version: 5.6.31
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CMT`
--

-- --------------------------------------------------------

--
-- Table structure for table `approvals`
--

CREATE TABLE IF NOT EXISTS `approvals` (
  `approvalID` int(250) NOT NULL,
  `PaperID` int(250) NOT NULL,
  `approverID` int(250) NOT NULL,
  `Status` varchar(250) DEFAULT NULL,
  `timestamp` varchar(250) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(6)'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `interests`
--

CREATE TABLE IF NOT EXISTS `interests` (
  `PUID` int(250) NOT NULL,
  `interest` int(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Papers`
--

CREATE TABLE IF NOT EXISTS `Papers` (
  `PaperID` int(250) NOT NULL,
  `PUID` int(250) NOT NULL,
  `trackID` int(250) NOT NULL,
  `Title` varchar(250) NOT NULL,
  `Description` text NOT NULL,
  `Co_presenters` varchar(250) DEFAULT NULL,
  `FileLocation` text NOT NULL,
  `TimeOfSubmit` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Papers`
--

INSERT INTO `Papers` (`PaperID`, `PUID`, `trackID`, `Title`, `Description`, `Co_presenters`, `FileLocation`, `TimeOfSubmit`) VALUES
(10, 23, 5, 'test paper 1', 'hello world , this is test text', 'sumanth', 'uploadedFiles/ptest1@gmail.com/Papers/test paper 1.pdf', 'Sun Jun 25 2017 16:13:31 GMT+0530 (India Standard Time)'),
(11, 23, 13, 'Hydro Chloric', 'this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. this is just a dummy content. ', 'Sumanth', 'uploadedFiles/ptest1@gmail.com/Papers/Hydro Chloric.jpg', 'Mon Jun 26 2017 11:02:55 GMT+0530 (India Standard Time)'),
(12, 25, 13, 'Video Analysis', 'This is dummy content , hello world', 'Adhitya', 'uploadedFiles/sumanth@gmail.com/Papers/Video Analysis.png', 'Mon Jun 26 2017 11:04:47 GMT+0530 (India Standard Time)'),
(13, 23, 7, 'test paper @ 1', 'dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ', 'navya', 'uploadedFiles/ptest1@gmail.com/Papers/test paper @ 1.pdf', 'Mon Jun 26 2017 13:27:09 GMT+0530 (India Standard Time)');

-- --------------------------------------------------------

--
-- Table structure for table `Tracks`
--

CREATE TABLE IF NOT EXISTS `Tracks` (
  `trackID` int(250) NOT NULL,
  `TrackName` varchar(250) NOT NULL,
  `TrackDesc` text,
  `TrackAdderID` varchar(250) NOT NULL,
  `TimeStamp` varchar(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tracks`
--

INSERT INTO `Tracks` (`trackID`, `TrackName`, `TrackDesc`, `TrackAdderID`, `TimeStamp`) VALUES
(3, 'Metallurgy', 'This deals with metallurgy', 'admin@gmail.com', 'Thu May 11 2017 12:30:02 GMT+0530 (India Standard Time)'),
(4, 'Computer Science', 'All computer related stuff should be in this track', 'admin@gmail.com', 'Thu May 11 2017 12:30:02 GMT+0530 (India Standard Time)'),
(5, 'Mechanical', 'All mechanical stream papers should be here\n', 'admin@gmail.com', 'Thu May 11 2017 12:30:02 GMT+0530 (India Standard Time)'),
(6, 'Electrical', 'All electrical papers should be here', 'admin@gmail.com', 'Thu May 11 2017 12:30:02 GMT+0530 (India Standard Time)'),
(7, 'Media and Animation', 'Hello Cartoons !', 'admin@gmail.com', 'Thu May 11 2017 12:30:02 GMT+0530 (India Standard Time)'),
(8, 'Chemistry', 'hello', 'admin@gmail.com', 'Thu May 11 2017 15:45:42 GMT+0530 (India Standard Time)'),
(13, 'Digital science', 'Digital science', 'admin@gmail.com', 'Thu May 11 2017 16:09:44 GMT+0530 (India Standard Time)'),
(14, 'Mental Science', 'Breaking bad', 'admin@gmail.com', 'Sun Jun 25 2017 11:08:31 GMT+0530 (India Standard Time)'),
(15, 'Chemical Engineering', 'Narcos', 'admin@gmail.com', 'Sun Jun 25 2017 11:08:31 GMT+0530 (India Standard Time)'),
(16, 'Test Track1', 'hello', 'admin@gmail.com', 'Mon Jun 26 2017 12:12:13 GMT+0530 (India Standard Time)'),
(17, 'sumanth', 'test', 'admin@gmail.com', 'Mon Jun 26 2017 13:18:43 GMT+0530 (India Standard Time)');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `PUID` int(250) NOT NULL,
  `FirstName` varchar(100) DEFAULT NULL,
  `SecondName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(100) DEFAULT NULL,
  `Institution` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  `PassKey` varchar(100) DEFAULT NULL,
  `GoogleKey` varchar(225) DEFAULT NULL,
  `FacebookKey` varchar(225) DEFAULT NULL,
  `Privilege` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`PUID`, `FirstName`, `SecondName`, `Email`, `PhoneNumber`, `Institution`, `City`, `State`, `Country`, `PassKey`, `GoogleKey`, `FacebookKey`, `Privilege`) VALUES
(22, 'admin', 'summy', 'admin@gmail.com', '9060000493', 'JNNCE', 'Shimoga', 'Karnataka', '', '123', '0', '0', 'Admin'),
(23, 'ptest1', 'ptest1', 'ptest1@gmail.com', '9060000493', 'jnnce', 'shimoga', 'karnataka', '', '123', '0', '0', 'Participant'),
(24, 'evaluator', 'e', 'evaluator1@gmail.com', '1234512312', 'JNNCE', 'shimoga', 'karnataka', 'india', '123', '0', '0', 'Evaluator'),
(25, 'Sumanth', 'Summy', 'sumanth@gmail.com', '1231231231', 'JNNCE', 'Shimoga', 'Karnataka', 'India', '123', '0', '0', 'Participant');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approvals`
--
ALTER TABLE `approvals`
  ADD PRIMARY KEY (`approvalID`),
  ADD UNIQUE KEY `approvalID` (`approvalID`),
  ADD KEY `approvals_fk0` (`PaperID`);

--
-- Indexes for table `Papers`
--
ALTER TABLE `Papers`
  ADD PRIMARY KEY (`PaperID`),
  ADD UNIQUE KEY `PaperName` (`Title`),
  ADD KEY `Papers_fk0` (`PUID`),
  ADD KEY `Papers_fk1` (`trackID`);

--
-- Indexes for table `Tracks`
--
ALTER TABLE `Tracks`
  ADD PRIMARY KEY (`trackID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`PUID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Papers`
--
ALTER TABLE `Papers`
  MODIFY `PaperID` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `Tracks`
--
ALTER TABLE `Tracks`
  MODIFY `trackID` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `PUID` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `approvals`
--
ALTER TABLE `approvals`
  ADD CONSTRAINT `approvals_fk0` FOREIGN KEY (`PaperID`) REFERENCES `Papers` (`PaperID`);

--
-- Constraints for table `Papers`
--
ALTER TABLE `Papers`
  ADD CONSTRAINT `Papers_fk0` FOREIGN KEY (`PUID`) REFERENCES `Users` (`PUID`),
  ADD CONSTRAINT `Papers_fk1` FOREIGN KEY (`trackID`) REFERENCES `Tracks` (`trackID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
