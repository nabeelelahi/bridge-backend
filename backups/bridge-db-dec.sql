/*
SQLyog Ultimate v8.32 
MySQL - 5.5.5-10.4.21-MariaDB : Database - bridge
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
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(8) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'ADMIN',
  `createdAt` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `admin` */

insert  into `admin`(`id`,`name`,`email`,`password`,`type`,`createdAt`) values ('BAD-SERTY45FG56','main-admin','main@admin.com','12345678','ADMIN','02:06:44');

/*Table structure for table `appointment` */

DROP TABLE IF EXISTS `appointment`;

CREATE TABLE `appointment` (
  `id` varchar(255) NOT NULL,
  `patient_id` varchar(255) NOT NULL,
  `doctor_id` varchar(255) NOT NULL,
  `desired_date` text NOT NULL,
  `desired_time` text NOT NULL,
  `details` text NOT NULL,
  `perscription` longtext NOT NULL DEFAULT '\'{"image":null,"document":null,"form":null,"form_content":{"medicine_name":"","start_date":"","endDate":"","timings":[],"details":""}}\'',
  `status` varchar(80) NOT NULL,
  `created_at` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `appointment` */

/*Table structure for table `benef` */

DROP TABLE IF EXISTS `benef`;

CREATE TABLE `benef` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `primary_address` varchar(100) NOT NULL,
  `secondary_address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `cnic` int(13) NOT NULL,
  `age` int(3) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `relation_with_sponsor` varchar(50) NOT NULL,
  `case_study` longtext NOT NULL DEFAULT '\'\\\'{"vaccination_history":[],"any_medicine_authorization":false,"blood_group":"","no_of_calls_by_doc":0,"best_time_to_call":"","assigned_doctor":"","care_giver_id":"","marital_status":"","occupation":"","smoking":false,"date_of_birth":"","hospitalization":{"has_been_hospitalized":false,"hospitalization_description":[]},"special_diet":{"takes_special_diet":false,"special_diet_description":[]},"exercise_regularly":{"does_regularly":false,"exercise_description":[]},"allergy":{"has_allergy":false,"allergy_description":[]}}\\\'\'',
  `sponsor_id` varchar(255) NOT NULL,
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sid` (`sponsor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `benef` */

/*Table structure for table `beneficiary` */

DROP TABLE IF EXISTS `beneficiary`;

CREATE TABLE `beneficiary` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `cnic` int(13) NOT NULL,
  `marital_status` varchar(20) NOT NULL,
  `frequent_call_allowed` varchar(20) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `relation_with_sponsor` varchar(20) NOT NULL,
  `preferred_way_of_contact` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `primary_address` longtext NOT NULL,
  `secondary_address` longtext NOT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(20) NOT NULL,
  `sponsor_id` varchar(255) NOT NULL,
  `postal_code` int(8) NOT NULL,
  `case_study` longtext NOT NULL DEFAULT '`"{allergy: {has_allergy: false, allergy_description: \'\'},\\nany_medicine_authorization: false,\\nassigned_doctor: \\"\\",\\ncare_giver_id: \\"\\",\\nexercise_regularly: {does_regularly: false, exercise_description: \'\'},\\noccupation: \\"\\",\\nsmoking: false,\\nspecial_diet: {takes_special_diet: false, special_diet_description: \'\'},\\nvaccination_history: []}"`',
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'PENDING_APPROVAL',
  `easypaisa_number` text NOT NULL,
  `jazzcash_number` text NOT NULL,
  `bank` text NOT NULL,
  `card` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `beneficiary` */

insert  into `beneficiary`(`id`,`name`,`age`,`email`,`password`,`phone`,`cnic`,`marital_status`,`frequent_call_allowed`,`blood_group`,`relation_with_sponsor`,`preferred_way_of_contact`,`gender`,`primary_address`,`secondary_address`,`city`,`state`,`sponsor_id`,`postal_code`,`case_study`,`created_at`,`status`,`easypaisa_number`,`jazzcash_number`,`bank`,`card`) values ('-7128E6E9B0923-5','Wea','121','nabeelelahi2000@gmail.com','','12112121',2147483647,'asdasasdas','asdasd','asdas','Brother','asdas','asdasdasd','asdasd','asdasd','asdas','asdasd','',12345,'`\"{allergy: {has_allergy: false, allergy_description: \'\'},\\nany_medicine_authorization: false,\\nassigned_doctor: \\\"\\\",\\ncare_giver_id: \\\"\\\",\\nexercise_regularly: {does_regularly: false, exercise_description: \'\'},\\noccupation: \\\"\\\",\\nsmoking: false,\\nspecial_diet: {takes_special_diet: false, special_diet_description: \'\'},\\nvaccination_history: []}\"`','','PENDING_ADMIN_APPROVAL','','','','');

/*Table structure for table `calling_agent` */

DROP TABLE IF EXISTS `calling_agent`;

CREATE TABLE `calling_agent` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `gender` varchar(12) NOT NULL,
  `CNIC` varchar(13) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `shift_timing` longtext NOT NULL,
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'PENDING_APPROVAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `calling_agent` */

insert  into `calling_agent`(`id`,`name`,`email`,`password`,`phone`,`gender`,`CNIC`,`salary`,`qualification`,`shift_timing`,`created_at`,`status`) values ('BAD-AD8F03788095','Hassan','hassanaly366@gmail.com','4@*TThee#_2&%129','3122025939','male','3453453434553','20000','Graduate','[\"12:01 AM\",\"1:02 AM\"]','2021-09-27 03:59:17','TERMINATED'),('BAD-BB8640B5D500','Hassan','hassanaly633@gmail.com','CTc243)1%%3&2#Jj','3122025939','male','3453453434553','20000','Graduate','[\"12:00 AM\",\"5:00 AM\"]','2021-09-27 03:58:35','ACTIVE');

/*Table structure for table `care_giver` */

DROP TABLE IF EXISTS `care_giver`;

CREATE TABLE `care_giver` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` int(12) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `city` varchar(50) NOT NULL,
  `area` varchar(50) NOT NULL,
  `doctor_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `care_giver` */

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `age` int(11) NOT NULL,
  `address` longtext NOT NULL,
  `cnic` varchar(255) NOT NULL,
  `speciality` varchar(20) NOT NULL,
  `pmdc_number` varchar(60) NOT NULL,
  `working_hours` longtext NOT NULL,
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'PENDING_APPROVAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `doctor` */

insert  into `doctor`(`id`,`name`,`phone`,`email`,`password`,`gender`,`age`,`address`,`cnic`,`speciality`,`pmdc_number`,`working_hours`,`created_at`,`status`) values ('BD-EE532126C7074','sadas','3122025939','nabeelelahi2000@gmail.com','i*h^&|6&KR25@421','male',0,'34J/ Jaffer Street','SilverTech Solutions','React Native','12345','[{\"startTime\":\"4:04 AM\",\"endTime\":\"6:02 PM\"},{\"startTime\":\"8:00 AM\",\"endTime\":\"4:00 PM\"},{\"startTime\":\"Invalid date\",\"endTime\":\"Invalid date\"}]','2021-09-27 03:59:30','ACTIVE');

/*Table structure for table `guest` */

DROP TABLE IF EXISTS `guest`;

CREATE TABLE `guest` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `photo` text NOT NULL,
  `phone` varchar(15) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `previous_docs` longtext DEFAULT NULL,
  `previous_info` longtext DEFAULT NULL,
  `jazzcash_number` text DEFAULT NULL,
  `easypaisa_number` text DEFAULT NULL,
  `bank` text DEFAULT NULL,
  `card` text DEFAULT NULL,
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'PENDING_APPROVAL',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `guest` */

insert  into `guest`(`id`,`name`,`email`,`photo`,`phone`,`age`,`gender`,`previous_docs`,`previous_info`,`jazzcash_number`,`easypaisa_number`,`bank`,`card`,`created_at`,`status`) values ('-1B25D696A239D-1','Nabeel Elahi','nabeelelahi2000@gmail.com','https://lh3.googleusercontent.com/a-/AOh14Gg4uoApxLfDyxEsV_F-yA8skudGM56-2EvI6APxqg','',0,'',NULL,NULL,NULL,NULL,NULL,NULL,'','PENDING_APPROVAL');

/*Table structure for table `medicine_reminder` */

DROP TABLE IF EXISTS `medicine_reminder`;

CREATE TABLE `medicine_reminder` (
  `id` varchar(255) NOT NULL,
  `appointment_id` varchar(255) NOT NULL,
  `status` varchar(80) NOT NULL,
  `start_date` varchar(150) NOT NULL,
  `end_date` varchar(150) NOT NULL,
  `shift_type` varchar(80) NOT NULL,
  `created_at` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `medicine_reminder` */

/*Table structure for table `my_patient` */

DROP TABLE IF EXISTS `my_patient`;

CREATE TABLE `my_patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` varchar(255) NOT NULL,
  `doctor_id` varchar(255) NOT NULL,
  `patient_from` varchar(255) NOT NULL,
  `patient_till` varchar(255) NOT NULL,
  `patient_type` varchar(80) NOT NULL,
  `status` varchar(80) NOT NULL,
  `created_at` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `my_patient` */

/*Table structure for table `name` */

DROP TABLE IF EXISTS `name`;

CREATE TABLE `name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `age` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `name` */

insert  into `name`(`id`,`name`,`age`) values (1,'arham siddique',12),(2,'bilal qamar',25),(3,'saqib',15),(4,'saqib',20);

/*Table structure for table `notification` */

DROP TABLE IF EXISTS `notification`;

CREATE TABLE `notification` (
  `id` varchar(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subject` varchar(150) NOT NULL,
  `body` longtext NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'DELIVERED',
  `sender` varchar(255) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL,
  `created_at` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `notification` */

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `charges` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'ORDER_CREATED',
  `service_id` varchar(255) NOT NULL,
  `approved_by` varchar(255) NOT NULL,
  `valid_till` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `order` */

/*Table structure for table `service` */

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` varchar(255) NOT NULL,
  `title` longtext NOT NULL,
  `description` longtext NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `category_type` varchar(80) NOT NULL,
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `service` */

insert  into `service`(`id`,`title`,`description`,`discount`,`price`,`type`,`category_type`,`created_at`,`status`) values ('1','BRIDGE Dr. Home Visit for Entire Family (Non-Covid patients)\r\n(15% off FOR monthly subscribers)','Our qualified Family Physicians and Consultants perform a comprehensive evaluation of patients and also provide a treatment plan to meet their health care needs at your doorstep.',15,7000,'ON_DEMAND','Appointment','',''),('10','Attendant / Nursing Services','Different services charges of Attendant/Nursing\r\n(12 TO 24 hours shifts Initially only IN Karachi) ON per MONTH basis',NULL,42,'SUBSCRIPTION','','',''),('11','Monthly  Subscription','A monthly plan subscription that\'s  right for you and your family\r\nHome healthcare especially for Elderlies provides a high-quality affordable healthcare management \r\neffect within the comfort of your home.\r\nBRIDGE aims to provide convenience to such members of your family who find it difficult to travel \r\nor visit healthcare centers. Our highly skilled and experienced team will provide care with \r\ncompassion at your doorstep.\r\n\r\nBRIDGE Services  includes.\r\n\r\nOur skilled and experienced Care Coordinators will visit to perform on-spot procedures.\r\nWe ensure to maintain continuity of medical care for your elderlies who have special healthcare \r\nneeds.\r\n\r\nThe procedure includes.\r\n\r\na) Examination of body vitals like\r\n  \r\n  1. Blood Pressure\r\n  2. Blood Sugar\r\n  3. Oxygen Saturation\r\n  4. Heart Rate\r\n  5. Weight (Body Mass Index)\r\n  6. Height\r\n  7. Skin, Nails, Eye examination\r\n\r\nb) Creation of Electronic medical records & medicine taking history\r\nc) On spot Tele consultation with BRIDGE Licensed Doctors\r\nd) Provide 24/7 availability of a licensed female physician to assist you\r\ne) Every week, our BRIDGE licensed Doctor will call the family for an update\r\nf) Daily Medicine intake reminder (optional)\r\ng) Free home laboratory sample collection (Laboratory charges not included)\r\nh) Free medicine delivery at your home from our partner pharmacy for a minimum order of PKR 1000/= Doctor\'s appointment - Arrange doctor\'s appointment as per your family request\r\n\r\nThis package also includes the following lab tests for any two members of your family, at the time \r\nof registration\r\n1. Complete blood count (CBC)\r\n2. Liver function Test (LFT)\r\n3. Thyroid-stimulating hormone\r\n4. Lipid Profile\r\n5. Blood Glucose (fasting)\r\n6. Urine DR.\r\n\r\nFree Screening also includes:\r\n\r\nHepatitis B&C, Typhoid, Malaria, H-pylori, Cholestrol, Blood Hb, UricAcid, Dengue, (igG/igM & Antigen-NS1) \r\n\r\n\r\nIntroductory  offer\r\nFor your entire Family*\r\n\r\nEvery Month:         PKR  5000/-\r\nRegistration Fee: PKR 5000/- (non-refundable)\r\n\r\n* Maximum 5 members at the same location.\r\n* Subscription charges to be paid on 3 months basis.',NULL,15000,'SUBSCRIPTION','','',''),('2','Care Giver Home Visit (15% off for monthly subscribers)','Care Coordinators TO look after your loved ones WHEN you are away! Service for your family   \r\nincludes :\r\n\r\n 1. Home visit by our Care coordinator for assessments & examination of body vitals\r\n  a) Blood Sugar\r\n  b) Blood Pressure\r\n  c) Oxygen Saturation\r\n  d) Heart rate\r\n  e) Weight (Body Mass index)\r\n  f) Height\r\n  g) Skin, Nails, AND Eye examination\r\n 2. Creation of medical record & medical history\r\n 3. Tele consultation WITH BRIDGE Licensed Doctor\r\n',15,3500,'ON_DEMAND','Appointment','',''),('3','\"Outdoor Help Services\" through our Care Manager \r\n*(15% off FOR monthly subscribers)\r\n*(charges FOR transport TO be billed AS per actual)','when your loved ones suffer from a medical condition, watching them struggle to perform their daily \r\nactivities can be overwhelming. while you wish TO support them IN every step of their life, your \r\nschedule gives you NO time, which leaves you feeling helpless.\r\n\r\nOur team of trained professionals cares coordinators will take care of your elderly AND loved ones \r\nFOR their needs\r\n\r\nin providing personal assistance during visit TO places LIKE*\r\n a) Clinic\r\n b) Hospital\r\n c) Laboratory\r\n d) NADRA, passport office, pension, AND bank, etc.\r\n e) Grocery OR shopping OR ANY other outdoor personal works\r\n\r\n*(During the entire visit our care coordinator will be WITH the elderly helping them WITH ALL the \r\npaperwork OR moving around)',15,2500,'ON_DEMAND','Appointment','',''),('4','Managing  Coordination & Security During 3rd Party Health Services','BRIDGE charges for arranging the following services at home\r\n\r\n a) Physiotherapist\r\n b) Nursing\r\n c) Pathology\r\n d) Radiology\r\n\r\n*(The cost of the above services shall be depending upon choice by the sponsor or beneficiary on different options at the time of booking)\r\n\r\nCharges against services by BRIDGE will ensure the timely arrival of the service provider.\r\n \r\n 1. Manage appointment and coordination for arrival.\r\n 2. Be physically present to receive the service provider\r\n 3. Be present during the entire activity for security and safety.\r\n 4. Update Sponsor on the event, with photos and voice messages',15,5000,'ON_DEMAND','Appointment','',''),('5','Managing  Coordination & Security During 3rd Party Health Services','Services charges of ultrasound AT home (Initially only IN Karachi)',NULL,2200,'ON_DEMAND','','',''),('6','Managing  Coordination & Security During 3rd Party Health Services','Services charges of ECG at home (Initially only in Karachi)',NULL,1500,'ON_DEMAND','','',''),('7','Managing  Coordination & Security During 3rd Party Health Services','Services charges of Chest X-ray AT home (Initially only IN Karachi)',NULL,8000,'ON_DEMAND','','',''),('8','Managing  Coordination & Security During 3rd Party Health Services','Services charges of physiotherapy at home (Initially only in Karachi) per session',NULL,1300,'ON_DEMAND','','',''),('9','Blood Test',' \r\n 1. Complete Blood COUNT (CBC)\r\n 2. Liver FUNCTION Test (LFT) \r\n 3. Thyroid FUNCTION Test\r\n 4. Lipid Profile\r\n 5. Blood Glucose Fasting\r\n 6. Urine DR.',NULL,4500,'ON_DEMAND','','','');

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
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `cnic` int(13) NOT NULL,
  `marital_status` varchar(20) NOT NULL,
  `frequent_call_allowed` varchar(20) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `preferred_way_of_contact` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `primary_address` longtext NOT NULL,
  `secondary_address` longtext NOT NULL,
  `city` varchar(80) NOT NULL,
  `state` varchar(20) NOT NULL,
  `postal_code` int(8) NOT NULL,
  `case_study` longtext NOT NULL DEFAULT '`"{allergy: {has_allergy: false, allergy_description: \'\'},\\nany_medicine_authorization: false,\\nassigned_doctor: \\"\\",\\ncare_giver_id: \\"\\",\\nexercise_regularly: {does_regularly: false, exercise_description: \'\'},\\noccupation: \\"\\",\\nsmoking: false,\\nspecial_diet: {takes_special_diet: false, special_diet_description: \'\'},\\nvaccination_history: []}"`',
  `created_at` varchar(150) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'PENDING_ADMIN_APPROVAL',
  `easypaisa_number` text NOT NULL,
  `jazzcash_number` text NOT NULL,
  `bank` text NOT NULL,
  `card` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `sponsor` */

insert  into `sponsor`(`id`,`name`,`email`,`age`,`password`,`phone`,`cnic`,`marital_status`,`frequent_call_allowed`,`blood_group`,`preferred_way_of_contact`,`gender`,`primary_address`,`secondary_address`,`city`,`state`,`postal_code`,`case_study`,`created_at`,`status`,`easypaisa_number`,`jazzcash_number`,`bank`,`card`) values ('-CA9BEC7BF4144-D','Wea','nabeelelahi2000@gmail.com','121','@~`[51J317c%F)Bn','12112121',2147483647,'asdasasdas','asdasd','asdas','asdas','asdasdasd','asdasd','asdasd','asdas','asdasd',0,'`\"{allergy: {has_allergy: false, allergy_description: \'\'},\\nany_medicine_authorization: false,\\nassigned_doctor: \\\"\\\",\\ncare_giver_id: \\\"\\\",\\nexercise_regularly: {does_regularly: false, exercise_description: \'\'},\\noccupation: \\\"\\\",\\nsmoking: false,\\nspecial_diet: {takes_special_diet: false, special_diet_description: \'\'},\\nvaccination_history: []}\"`','','APPROVED','','','','');

/*Table structure for table `sponsor_profile_requests` */

DROP TABLE IF EXISTS `sponsor_profile_requests`;

CREATE TABLE `sponsor_profile_requests` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `cnic` varchar(13) NOT NULL,
  `status` varchar(80) NOT NULL DEFAULT 'PENDING_APPROVAL',
  `created_at` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `sponsor_profile_requests` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
