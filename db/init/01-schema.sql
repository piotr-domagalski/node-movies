CREATE TABLE movies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NULL,
    releaseDate DATE NOT NULL,
    genre VARCHAR(60) NULL,
    price DECIMAL(5, 2) NOT NULL,
    rating VARCHAR(32) NULL
);
