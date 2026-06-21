CREATE TABLE movies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(191) NULL,
    releaseDate DATE NOT NULL,
    genre VARCHAR(191) NULL,
    price DECIMAL(5, 2)
);
