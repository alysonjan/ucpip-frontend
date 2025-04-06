-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ucpip
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clinic_visit`
--

DROP TABLE IF EXISTS `clinic_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clinic_visit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinic_visit`
--

LOCK TABLES `clinic_visit` WRITE;
/*!40000 ALTER TABLE `clinic_visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `clinic_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'College of Information Technology and Engineering'),(2,'College of Business'),(3,'College of Health Sciences'),(4,'College of Social Sciences'),(5,'College of Architecture and Design'),(6,'College of Arts and Humanities'),(7,'College of Education'),(8,'College of Law'),(9,'College of Fine Arts'),(10,'College of Natural Sciences');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health_record`
--

DROP TABLE IF EXISTS `health_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `existing_conditions` varchar(255) DEFAULT NULL,
  `maintenance_medication` varchar(255) DEFAULT NULL,
  `allergies` varchar(255) DEFAULT NULL,
  `vaccination_card_url` varchar(255) DEFAULT NULL,
  `vaccination_history` text,
  `family_history` varchar(255) DEFAULT NULL,
  `smoking_status` varchar(255) DEFAULT NULL,
  `alcoholism_status` varchar(255) DEFAULT NULL,
  `health_insurance_id` varchar(255) DEFAULT NULL,
  `patient_category` varchar(255) NOT NULL,
  `blood_type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `health_insurance_id_UNIQUE` (`health_insurance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health_record`
--

LOCK TABLES `health_record` WRITE;
/*!40000 ALTER TABLE `health_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `health_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date_of_birth` varchar(255) NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `department` varchar(50) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `height` varchar(45) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `bmi` varchar(45) DEFAULT NULL,
  `bmi_category` varchar(45) DEFAULT NULL,
  `existing_medical_condition` varchar(45) DEFAULT NULL,
  `maintenance_medication` varchar(45) DEFAULT NULL,
  `allergies` varchar(45) DEFAULT NULL,
  `vaccination_link` text,
  `family_hx_of_illness` varchar(45) DEFAULT NULL,
  `smoking` varchar(45) DEFAULT NULL,
  `drinking` varchar(45) DEFAULT NULL,
  `health_insurance` varchar(45) DEFAULT NULL,
  `patient_category` varchar(45) DEFAULT NULL,
  `blood_type` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `date_added` varchar(45) DEFAULT 'CURRENT_TIMESTAMP',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Jabol','Doe','male','2342343243','johnhje.doe@example.com','123 Main St, Anytown, AN 12345','2000-01-01','S123456005','7','default-profile.png','170 cm','65 kg','22.5','Normal','None','None','None','https://example.com/vaccination-record','Hypertension','No','Occasionally','Yes','Undergraduate','O+',0,'2024-01-01 12:00:00'),(2,'Jane','Smith','female','5675678901','jane.smith@example.com','456 Elm St, Springfield, SP 54321','1995-07-15','S987654329','3','default-profile.png','165 cm','50 kg','18.5','Underweight','Asthma','Albuterol inhaler','Penicillin','https://example.com/jane-smith-vaccination','Diabetes','Never','Never','Yes','Graduate','A-',0,'2024-02-01 09:30:00'),(3,'Alice','Smith','female','1234567890','alice.smith@example.com','456 Elm St, Anytown, AN 12345','1998-05-15','S987654321','4','default-profile.png','165 cm','55 kg','20.2','Normal','None','None','Peanuts','https://example.com/vaccination-record-alice','Diabetes','No','No','Yes','Graduate','A+',0,'2024-03-15 15:45:00'),(4,'Bob','Johnson','male','0987654321','bob.johnson@example.com','789 Oak St, Anytown, AN 12345','1995-10-25','S123123123','2','default-profile.png','180 cm','75 kg','23.1','Normal','Asthma','Inhaler','None','https://example.com/vaccination-record-bob','Heart Disease','Yes','Frequently','No','Postgraduate','B+',0,'2024-04-10 08:20:00'),(5,'Eve','Davis','female','2345678901','eve.davis@example.com','321 Pine St, Anytown, AN 12345','1997-07-20','S456456456','1','default-profile.png','170 cm','60 kg','20.8','Normal','None','None','Dust','https://example.com/vaccination-record-eve','None','No','Occasionally','Yes','Undergraduate','O-',0,'2024-05-05 11:00:00'),(20,'New','User1','female','09561234567','newuser1@example.com','100 New St, Newtown, NT 12345','2002-02-20','S123456100','6','default-profile.png','160 cm','55 kg','21.5','Normal','None','None','None','https://example.com/vaccination-record-user1','None','No','Occasionally','Yes','Undergraduate','B+',0,'2024-01-01 10:00:00'),(21,'New','User2','male','09561234568','newuser2@example.com','200 New St, Newtown, NT 12345','2001-03-15','S123456101','6','default-profile.png','175 cm','70 kg','22.9','Normal','None','None','None','https://example.com/vaccination-record-user2','None','Yes','Never','Yes','Undergraduate','O-',0,'2024-01-02 11:30:00'),(22,'New','User3','female','09561234569','newuser3@example.com','300 New St, Newtown, NT 12345','2003-04-25','S123456102','7','default-profile.png','165 cm','60 kg','22.0','Normal','None','None','None','https://example.com/vaccination-record-user3','None','No','Never','Yes','Undergraduate','A+',0,'2024-01-03 12:45:00'),(23,'New','User4','male','09561234570','newuser4@example.com','400 New St, Newtown, NT 12345','1999-05-10','S123456103','5','default-profile.png','180 cm','80 kg','24.7','Overweight','None','None','None','https://example.com/vaccination-record-user4','None','Yes','Frequently','Yes','Graduate','A-',0,'2024-01-04 14:00:00'),(24,'New','User5','female','09561234571','newuser5@example.com','500 New St, Newtown, NT 12345','1998-06-30','S123456104','4','default-profile.png','153 cm','50 kg','20.0','Normal','None','None','None','https://example.com/vaccination-record-user5','None','No','Occasionally','No','Undergraduate','B-',0,'2024-01-05 15:15:00'),(25,'Kathryn','Bernardo','female','0967857546546','kath@gmail.com','Tisa Rivaridge','2022-06-01','S123456099','4','default-profile.png','','','','','','','','','','','','','','',0,'2024-01-05 15:15:00'),(26,'Boss','Gaw','male','0967857546546','test4@gmail.com','Jones Avenue','2022-12-01','4535345444','6','default-profile.png','','','','','','','','','','','','','','',0,'2024-01-05 15:15:00'),(27,'Naruto','Koko','male','0967857546546','newuser3@example.com','Jones Avenue','2023-03-01','4535345000','4','default-profile.png','','','','','','','','','','','','','','',0,'2024-10-20 13:26:40.438'),(28,'test','test','male','0967857546546','test@gmail.com','Jones Avenue','2024-06-05','S1234560323','8',NULL,'170','54','18.69','Normal','None','None','None','https://googlecax.como','None','None','None','None','Normal','A+',0,'2024-10-25 12:21:17.360'),(29,'Post','Malone','male','097678655643','postmalone@gmail.com','Urgello Aznar Cebu City','2021-12-01','S123456678','1','default-profile.png','189','78','21.84','Normal','None','None','None','https://googlecax.com','None','None','None','None','Normal','A+',0,'2024-10-25 12:26:19.551'),(30,'Sabrina','Expresso','female','097678655643','sabrina@gmail.com','Uytengsu St Shell Urgello','1998-03-04','S123456115','3','default-profile.png','140','36','18.37','Normal','None','None','None','https://googlecax.com','None','None','None','None','Normal','A+',0,'2024-10-25 12:32:56.918');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_admission`
--

DROP TABLE IF EXISTS `patient_admission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_admission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) NOT NULL,
  `cases` varchar(255) NOT NULL,
  `vital_signs` varchar(255) DEFAULT NULL,
  `actions` text NOT NULL,
  `common_reasons` varchar(45) DEFAULT NULL,
  `reasons` text,
  `prescription` text,
  `nurse_notes` varchar(255) DEFAULT NULL,
  `emas_on_duty` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_admission`
--

LOCK TABLES `patient_admission` WRITE;
/*!40000 ALTER TABLE `patient_admission` DISABLE KEYS */;
INSERT INTO `patient_admission` VALUES (1,'S123456005','Fractured arm','BP: 120/80, HR: 80, Temp: 98.6F','Applied cast and provided pain medication.','Injury','Accidental fall during sports activity.','Ibuprofen 400mg every 6 hours as needed for pain.','Patient appears to be in good spirits despite the injury.','ajax alyson','2024-09-07T15:00:00Z'),(2,'S123456005','Sprained ankle','BP: 118/76, HR: 72, Temp: 98.4F','Applied ice pack, provided crutches, and advised rest.','Injury','Slipped while walking down the stairs.','Paracetamol 500mg every 8 hours as needed for pain.','Patient is advised to avoid putting weight on the ankle for a few days.','ajax alyson','2024-09-07 10:30'),(3,'S456456456','Sprained ankle','BP: 118/76, HR: 72, Temp: 98.4F','Applied ice pack, provided crutches, and advised rest.','Cough','Hutoy','Paracetamol 500mg every 8 hours as needed for pain.','Patient is advised to avoid putting weight on the ankle for a few days.','ajax alyson','2024-09-07 10:30'),(12,'S123456005','Napiang','testy','testy','Headache','testy','testy','testy','ajax alyson','2024-10-10 11:12:39'),(16,'S123456102','test','test','test','Other','kabuhi','test','test','ajax alyson','2024-10-19 15:19:42'),(17,'S123456102','test','test','test','Stomach Pain','tet','test','test','ajax alyson','2024-10-19 15:53:06'),(18,'S123456103','TEST','TEST','TEST','Diarrhea','','TEST','TEST','ajax alyson','2024-10-20 13:20:27'),(19,'4535345000','test','test','test','Sore Throat',NULL,'test','test','ajax alyson','2024-10-20 13:30:39'),(20,'S123456099','test','test','test','Sore Throat',NULL,'test','test','ajax alyson','2024-10-20 13:32:04'),(21,'4535345444','test','test','test','Muscle Pain',NULL,'test','test','ajax alyson','2024-10-23 12:29:06'),(22,'S123456115','tesst','test','test','Allergy',NULL,'test','test','ajax alyson','2024-10-25 12:35:42');
/*!40000 ALTER TABLE `patient_admission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `temp_password` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `created_at` varchar(45) DEFAULT NULL,
  `password_activation` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ajax','alyson','ajaxdev@gmail.com',NULL,'$2a$10$JZSMKVNes1XsS.Y8Y3fN/e0frr1BNB78xjgYZ.sawq/UKXULAak/a','super_admin',1,'2024-10-24 10:35:44.016',1),(2,'cyberbob','piesta','cyberbob@gmail.com',NULL,'$2a$10$JZSMKVNes1XsS.Y8Y3fN/e0frr1BNB78xjgYZ.sawq/UKXULAak/a','admin',0,'2024-10-24 10:35:44.016',1),(3,'boss','kyle','bosskyle@gmail.com',NULL,'$2a$10$0QHBPdAPbWbTLID4k0BILukixLnfrkDsl1Gi.Pfl0ramLViExUNZ2','admin',1,'2024-10-24 10:35:44.016',1),(4,'Ivana','Alawi','staff@gmail.com',NULL,'$2a$10$3otauFSkDGtAWQrQQ1AS.OebpeTfA8O.nGpAUVIVHNLZT/2spqGjy','user',1,'2024-10-24 10:35:44.016',1),(5,'Iron','Side','iron@gmail.com',NULL,'$2a$10$D43lETG9DIx.KGr6cyg0qe8gbGq9zfg4cbx89XRiOVisYvfEKfYp.','user',0,'2024-10-24 10:35:44.016',1),(6,'Boss','Tagoytoy','boss@gmail.com','','$2a$10$J.Jyo9TuiVwWVl/bqqrHCOp24JbiuhrA0uib3Oxh1i9.VJbXlIFPG','staff',1,'2024-10-24 10:35:44.016',1),(7,'Sofia','Andres','sofia@gmail.com','','$2a$10$tlvBxOxxqHOTy9YL7QXfvuvWf.iM5uSg1mn6G/YjDMooT37KCNJYq','staff',1,'2024-10-24 11:34:23.113',1),(8,'Logitech','Andres','logic@gmail.com','','$2a$10$EPb4ysvw8oZlZDWAfIUfAu4bV7Umnq7rVUXozcUeLzs53.IcvPi.C','staff',1,'2024-10-24 11:56:44.724',1),(9,'Golden','Peak','golden@gmail.com','newuser12345',NULL,'staff',0,'2024-10-24 12:18:08.760',0),(10,'John','Wick','wick@gmail.com','newuser12345',NULL,'admin',0,'2024-10-24 12:20:21.725',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01  8:01:33
