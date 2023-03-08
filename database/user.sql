CREATE DATABASE rentYourExpert;
use rentYourExpert;

CREATE TABLE 'user' (
    'id' int unsigned NOT NULL AUTO_INCREMENT,
    'name' varchar(50) NOT NULL, 
    'surname' varchar(50) NOT NULL,
    'profession' varchar(50) NOT NULL, 
    'location' varchar(50) NOT NULL, 
    'description' varchar(250) NOT NULL, 
    'email' varchar(100) NOT NULL, 
    'phone' int unsigned NOT NULL, 
    'address' varchar(250) NOT NULL, 
    'available' tinyint unsigned NOT NULL,  
    'isWorker' tinyint unsigned NOT NULL, 
    'isAdmin' tinyint unsigned NOT NULL, 
    PRIMARY KEY ('id')
)