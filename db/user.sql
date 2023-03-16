CREATE DATABASE IF NOT EXISTS rentYourExpert;
USE rentYourExpert;

CREATE TABLE IF NOT EXISTS customer (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL, 
    `name` varchar(50) NOT NULL, 
    `surname` varchar(50) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(50) NOT NULL,
    `isAdmin` tinyint unsigned NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS worker (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL, 
    `surname` varchar(50) NOT NULL,
    `profession` varchar(50) NOT NULL, 
    `location` varchar(50) NOT NULL, 
    `description` varchar(250) NOT NULL, 
    `email` varchar(100) NOT NULL, 
    `phone` BIGINT unsigned NOT NULL, 
    `address` varchar(250) NOT NULL, 
    `available` tinyint unsigned NOT NULL,  
    `password` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS request (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `customer_id` int unsigned NOT NULL,
    `worker_id` int unsigned NOT NULL, 
    `accepted` tinyint unsigned NOT NULL, 
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`customer_id`) REFERENCES customer(`id`) ON DELETE CASCADE,
    FOREIGN KEY(`worker_id`) REFERENCES worker(`id`) ON DELETE CASCADE
);

INSERT INTO worker (name, surname, profession, location, description, email, phone, address, available, password)
VALUES
('John', 'Doe', 'Web Developer', 'New York', 'Experienced web developer with expertise in HTML, CSS, and JavaScript.', 'johndoe@example.com', 1234567890, '123 Main St, New York, NY 10001', 1, '0000'),
('Jane', 'Smith', 'Graphic Designer', 'Los Angeles', 'Creative graphic designer with a passion for typography and color theory.', 'janesmith@example.com', 2345678901, '456 Oak St, Los Angeles, CA 90001', 1,'0000'),
('Bob', 'Johnson', 'Plumber', 'Chicago', 'Licensed plumber with over 10 years of experience in residential and commercial plumbing.', 'bobjohnson@example.com', 3456789012, '789 Maple St, Chicago, IL 60001', 1,'0000'),
('Alice', 'Brown', 'Lawyer', 'Houston', 'Experienced lawyer specializing in corporate law and contract negotiations.', 'alicebrown@example.com', 4567890123, '012 Pine St, Houston, TX 70001', 1, '0000'),
('Tom', 'Lee', 'Electrician', 'San Francisco', 'Skilled electrician with expertise in wiring, circuitry, and electrical systems.', 'tomlee@example.com', 5678901234, '345 Cedar St, San Francisco, CA 20001', 1,'0000');


INSERT INTO customer (username, name, surname, email, password, isAdmin) 
VALUES 
('michaelScott', 'Michael', 'Scott', 'michaelscott@example.com', 'password123', 0),
('janeDoe', 'Jane', 'Doe', 'janedoe@example.com', 'password456', 0),
('adminUser', 'Admin', 'User', 'admin@example.com', 'admin123', 1),
('bobSmith', 'Bob', 'Smith', 'bobsmith@example.com', 'password789', 0),
('saraJohnson', 'Sara', 'Johnson', 'sarajohnson@example.com', 'password111', 0);


INSERT INTO request (customer_id, worker_id, accepted)
VALUES 
(1, 1, 0),
(2, 2, 0),
(3, 4, 0),
(4, 3, 0),
(5, 5, 0);