/*----------------------------------------Create the Database----------------------------------------*/
CREATE DATABASE Selu 
GO

-- Utiliser la base de donne
USE [5D1G01E05]
GO

/*----------------------------------------Table Utilisateurs----------------------------------------*/
CREATE TABLE Utilisateurs(
    Id int IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Prenom VARCHAR(255) NOT NULL,
    NomDeFamille VARCHAR(255) NOT NULL,
    Courriel VARCHAR(255) UNIQUE NOT NULL,
    MotDePasse VARCHAR(255) NOT NULL,
    DateDeCreation DATETIME NOT NULL,
    DerniereConnexion DATETIME NOT NULL,
    PhotoDeProfil VARCHAR(255),
    PhotoDeCouverture VARCHAR(255),
)
GO

--Insertion de donnes dans la table Utilisateur
INSERT INTO Utilisateurs VALUES
    ('Yao', 'Kounakou', 'kounakouy@gmail.com', 'MDP', '2022-09-07', '2022-09-07', '/', '/')
GO

-- Slection de la table Utilisateur
SELECT * FROM Utilisateurs
GO

/*----------------------------------------Table Livres----------------------------------------*/
CREATE TABLE Livres (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Titre VARCHAR(255) NOT NULL,
    DescriptionLivre TEXT NOT NULL,
    NbPages INT NOT NULL,
    Prix FLOAT NOT NULL,
    CoursId INT,
    CollectionId VARCHAR(255) DEFAULT 'Aucune',
    MaisonEdition VARCHAR(255) NOT NULL DEFAULT 'Aucune',
    DatePublication DATE NOT NULL,
    PhotoId VARCHAR(255),
)
GO

-- Insertion des donnes
INSERT INTO Livres (Titre, DescriptionLivre, NbPages, Prix, DatePublication)
VALUES
    ('To Kill a Mockingbird', 'To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.', 360, 12.5, '1960-07-11'),
    ('Watashi', 'To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.', 360, 12.5, '1960-07-11')
GO

-- Slection de la table Livres
SELECT * FROM Livres
GO

/*----------------------------------------Table Favoris----------------------------------------*/
CREATE TABLE Favoris (
    LivreId INT,
    UtilisateurId INT,
    FOREIGN KEY (LivreId) REFERENCES Livres(Id),
    FOREIGN KEY (UtilisateurId) REFERENCES Utilisateurs(Id),
)
GO

-- Insertion des donnes
INSERT INTO Favoris
VALUES
    (1,1),
    (2,1)
GO

-- Slection de la table Livres
SELECT Titre as 'Livres Favoris', DescriptionLivre, Prix FROM Utilisateurs
JOIN Favoris ON Utilisateurs.Id = Favoris.UtilisateurId
JOIN Livres ON Favoris.LivreId = Livres.Id
WHERE NomDeFamille = 'Kounakou'
GO

/*----------------------------------------Table Cours----------------------------------------*/
CREATE TABLE Cours (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nom VARCHAR(255) NOT NULL,
    ProgrammeId INT,
    FOREIGN KEY (ProgrammeId) REFERENCES Programmes(Id),
)
GO

-- Insertion des donnes
INSERT INTO Cours
VALUES
    ('Franais 101', 1),
    ('Franais 102', 1)
GO

-- Slection de la table Livres
SELECT * FROM Cours
GO

/*----------------------------------------Table Programmes----------------------------------------*/
CREATE TABLE Programmes (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Nom VARCHAR(255) NOT NULL,
)
GO

-- Insertion des donnes
INSERT INTO Programmes
VALUES
    ('Programme général'),
    ('DEC - Sciences humaines  Justice et socit'),
    ('DEC - Sciences humaines  Individu et interactions')
GO

-- Slection de la table Livres
SELECT * FROM Programmes
GO

/*----------------------------------------Sélection de toutes les tables----------------------------------------*/
SELECT * FROM Cours
SELECT * FROM Favoris
SELECT * FROM Livres
SELECT * FROM Programmes
SELECT * FROM Utilisateurs
GO