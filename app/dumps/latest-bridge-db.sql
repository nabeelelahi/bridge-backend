/*
SQLyog Ultimate v8.32 
MySQL - 5.5.5-10.4.18-MariaDB : Database - bridge
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bridge` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `bridge`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `aid` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(8) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`aid`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `admin` */

insert  into `admin`(`index`,`aid`,`name`,`email`,`password`,`createdAt`) values (2,'BAD-SERTY45FG56','main-admin','main@admin.com','12345678','2021-07-19 02:06:44');

/*Table structure for table `calling_agent` */

DROP TABLE IF EXISTS `calling_agent`;

CREATE TABLE `calling_agent` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `caid` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `gender` varchar(12) NOT NULL,
  `CNIC` varchar(13) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `shiftTiming` longtext NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`caid`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `calling_agent` */

insert  into `calling_agent`(`index`,`caid`,`name`,`email`,`password`,`phone`,`gender`,`CNIC`,`salary`,`qualification`,`shiftTiming`,`createdAt`,`status`) values (6,'BAD-3BD6B51E39A5','sadas','nabeelelahi2000@gmail.com','@&B.7c^;','3122025939','male','3453453434553','12345','asdadsdas','[\"12:02 AM\",\"3:05 AM\"]','2021-08-02 02:35:29','ACCEPTED');

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `did` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `address` longtext NOT NULL,
  `clinicName` varchar(255) NOT NULL,
  `speciality` varchar(20) NOT NULL,
  `pmdcNumber` varchar(60) NOT NULL,
  `availability` longtext NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`did`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `doctor` */

insert  into `doctor`(`index`,`did`,`name`,`phone`,`email`,`password`,`gender`,`address`,`clinicName`,`speciality`,`pmdcNumber`,`availability`,`createdAt`,`status`) values (3,'BD-EE532126C7074','sadas','3122025939','nabeelelahi2000@gmail.com','i*h^&|6&KR25@421','male','34J/ Jaffer Street','SilverTech Solutions','React Native','12345','[{\"startTime\":\"4:04 AM\",\"endTime\":\"6:02 PM\"},{\"startTime\":\"8:00 AM\",\"endTime\":\"4:00 PM\"},{\"startTime\":\"Invalid date\",\"endTime\":\"Invalid date\"}]','2021-08-03 03:26:50','ACCEPTED');

/*Table structure for table `session_maintainer` */

DROP TABLE IF EXISTS `session_maintainer`;

CREATE TABLE `session_maintainer` (
  `session_id` varchar(255) NOT NULL,
  `session_token` longtext NOT NULL,
  `session_ip` varchar(255) NOT NULL,
  `session_start` longtext NOT NULL,
  `session_expire` longtext NOT NULL,
  `session_creds_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `session_maintainer` */

insert  into `session_maintainer`(`session_id`,`session_token`,`session_ip`,`session_start`,`session_expire`,`session_creds_email`) values ('BSESS-028401E6AB','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWFpbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IjEyMzQ1Njc4In0sImlhdCI6MTYyNzY1MDgxNCwiZXhwIjoxNjI3NzM3MjE0fQ.OwPu8hEzCgPWBNn84HwQpGwt-4Fmv7R82_rIJ_hrQO0','127.0.0.1','Fri Jul 30 2021 06:13:34 GMT-0700 (Pacific Daylight Time)','Sat Jul 31 2021 06:13:34 GMT-0700 (Pacific Daylight Time)','');

/*Table structure for table `sponsor` */

DROP TABLE IF EXISTS `sponsor`;

CREATE TABLE `sponsor` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `sid` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `CNIC` int(13) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `sponsor` */

insert  into `sponsor`(`index`,`sid`,`name`,`email`,`password`,`phone`,`CNIC`,`createdAt`,`status`) values (22,'BS-CEF8B5AFE8C5B','Nabeel','nabeel2kkun@gmail.com','e&J1@28^bd54~D$&','03122025939',2147483647,'2021-08-03 03:11:02','ACCEPTED');

/*Table structure for table `sponsor_profile_requests` */

DROP TABLE IF EXISTS `sponsor_profile_requests`;

CREATE TABLE `sponsor_profile_requests` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `CNIC` varchar(13) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'PENDING',
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `sponsor_profile_requests` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
