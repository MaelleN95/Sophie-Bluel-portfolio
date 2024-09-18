# Portfolio de Sophie Bluel

## Sommaire

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Note de synthèse](#note-de-synthèse)
  - [Spécifications fonctionnelles](#spécifications-fonctionnelles)
  - [Spécifications techniques](#spécifications-techniques)
- [Screenshots](#screenshots)
- [Auteur](#auteur)

## Description

Ce projet consiste à développer le site portfolio d'une architecte d'intérieur, Sophie Bluel, pour l'agence ArchiWebos.
Il comprend l'intégration des travaux de l'architecte ainsi que la création de fonctionnalités pour l'administrateur, comme l'ajout et la suppression de projets via une interface dynamique.

Ce projet est réalisé dans le cadre de la formation [Développeur Web](https://openclassrooms.com/fr/paths/899-developpeur-web) chez OpenClassrooms.

## Fonctionnalités
- Affichage dynamique des travaux de l'architecte à partir d'une API back-end
- Filtrage des travaux par catégorie
- Authentification de l'administrateur avec une page de connexion
- Ajout et suppression de projets via une modale

## Installation
1. Clonez le repository :
   ```bash
    git clone https://github.com/MaelleN95/Sophie-Bluel-portfolio.git
2. Installez les dépendances du back-end :
   ```bash
   cd backend
   npm install
3. Démarrez le serveur back-end :
   ```bash
   npm start
4. Ouvrez le fichier `index.html` dans votre navigateur.

## Utilisation

1. Accéder à la page de connexion via votre navigateur.
2. Ouvrir le fichier `identifiants.txt` pour récupérer les identifiants de connexion.
3. Connectez-vous avec les identifiants fournis pour accéder à l'administration.
4. Une fois connecté, vous pourrez :
   - Ajouter de nouveaux projets via la modale d'ajout.
   - Supprimer des projets existants directement depuis la galerie.
   - Voir les projets affichés dynamiquement et les filtrer par catégorie.

## Structure du projet

- `FrontEnd/index.html` : Le fichier HTML principal du site
- `FrontEnd/assets/style.css` : Le fichier CSS principal
- `FrontEnd/js/` : Contient les fichiers JavaScript pour l’interaction avec l’API
- `FrontEnd/assets/images/` : Contient les images utilisées dans le portfolio
- `Backend/` : Code source du serveur back-end

## Technologies utilisées
- HTML5
- CSS3
- JavaScript
- Swagger pour la documentation API

## Note de synthèse

### Spécifications fonctionnelles

| Fonction                | Description                                                                                                      |
|-------------------------|------------------------------------------------------------------------------------------------------------------|
| **Affichage dynamique**  | - Les projets sont affichés dynamiquement en récupérant les données du back-end via `fetch`.                      |
|                         | - Les travaux sont filtrables par catégorie.                                                                     |
| **Page de connexion**    | - Une page de connexion permet à l'administrateur de se connecter pour gérer les projets.                        |
| **Modale d’ajout de projet** | - Une modale permet à l'administrateur d’ajouter de nouveaux projets, en incluant une vue "Galerie photo" et "Ajout photo". |
| **Suppression de projets** | - L’administrateur peut supprimer des projets directement depuis la galerie.                                     |

### Spécifications techniques

| Thème                      | Informations techniques                                                                                      |
|----------------------------|--------------------------------------------------------------------------------------------------------------|
| **Maquettes**               | Les maquettes du site sont disponibles sur Figma ([Lien vers la maquette](https://www.figma.com/design/kfKHknHySoTibZfdolGAX6/Sophie-Bluel---Desktop?node-id=0-1&node-type=canvas)).                                     |
| **API**                     | Utilisation de l’API du back-end pour la gestion des projets via `fetch`. La documentation est accessible via Swagger. |
| **Authentification**        | Utilisation d'un système d’authentification par token pour sécuriser l'accès à l’administration.               |
| **Modale**                  | La modale est créée dynamiquement via JavaScript et permet d’ajouter et supprimer des projets sans rechargement de la page. |
| **Compatibilité navigateurs** | Le site est compatible avec les dernières versions de Chrome et Firefox.                                      |

## Screenshots

### Page d'accueil

Aperçu de la page d'accueil où les projets sont affichés dynamiquement, avec la possibilité de filtrer par catégorie.

|![page-d-accueil](https://github.com/user-attachments/assets/43c0c716-0ffc-45cf-853e-90e92a6812aa)|
|-|

### Page de connexion

Capture d'écran de la page de connexion, permettant à l'administrateur de se connecter pour gérer les projets.

|![page-de-connexion](https://github.com/user-attachments/assets/029a4413-ec80-45f3-85dc-02c46a453c33)|
|-|

### Interface d'administration

Vue de l'interface administrateur après connexion, avec la possibilité d'ajouter et de supprimer des projets.

|![page-admin](https://github.com/user-attachments/assets/e441d872-bda8-466b-a6a6-543bcf0a3179)|
|-|

### Modale d'ajout de projet

Capture d'écran de la modale permettant d'ajouter un nouveau projet dans la galerie, incluant les champs nécessaires et la possibilité de télécharger des images.

|![modal1](https://github.com/user-attachments/assets/e47e5d0f-3de5-4e7f-b55a-1aa0789f640b)|
|-|

|![modal2](https://github.com/user-attachments/assets/b43cb785-0e0f-4a07-8bc4-3afde8f64c9d)|
|-|

### Filtrage par catégories

Aperçu du système de filtrage des projets par catégorie, montrant comment les projets peuvent être triés selon les préférences de l'utilisateur.

|![filtres](https://github.com/user-attachments/assets/9ee7db29-fc01-4e7c-a0a9-71b08410a4ba)|
|-|

## Auteur

- [Maëlle Nioche](https://www.linkedin.com/in/maelle-nioche/)
