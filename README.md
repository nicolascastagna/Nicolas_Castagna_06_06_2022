# Projet 6 - Construisez une API sécurisée pour une application d'avis gastronomiques "PIIQUANTE"

## PIIQUANTE

Il s'agit du côté back-end de l'application qui a été réalisé et doit être éxécuté avec le front-end pour fonctionner. Chacun des éléments est construit avec la base de données MongoDB, Express, Node.js et mongoose. Le front-end a été créé au préalable avec Angular. 

L'utilisateur doit s'enregistré pour se connecter ensuite, arrivé à la page d'accueil s'affiche toutes les sauces créé par tous les utilisateurs. L'utilisateur peut créé une sauce à partir de différents champs de valeur comme le nom, le fabricant, la description, ajouté une image et l'ingrédient. Seul le propriétaire de la sauce peut modifier ou supprimer son contenu. L'image modifié est supprimé du dossier images back-end et est remplacé par la nouvelle image. Les boutons modifier et supprimer ne sont pas visibles pour les utilisateurs qui ne sont pas propriétaire de la sauce. Chacun des utilisateurs peut aimer ou non une sauce.

## Technologies

Node.js, Express, Mongoose, MongoDb

## Installation

Clonez le repository
Installer Node.js et Angular CLI
Ajouter un dossier "images" dans le backend

## Lancement back-end

Depuis le dossier "back" du projet, exécutez npm install. Vous pouvez alors éxécuter le serveur avec nodemon server. Le serveur doit fonctionner sur localhost avec le port par défaut 3000.

## Lancement front-end

Depuis le dossier "front" du projet, éxécutez npm run start. Le port se lance sur 4200. Accedez ensuite à localhost:4200.

## Précédents projets

Lien GitHub du projet 2 Booki : :

https://nicolascastagna.github.io/Nicolascastagna_2_012022/

Lien GitHub du projet 3 Ohmyfood! :

https://nicolascastagna.github.io/Nicolascastagna_3_07032022/

Lien GitHub du projet 4 Agence Web La Panthère :

https://nicolascastagna.github.io/Nicolascastagna_4_042022/

Lien GitHub du projet 5 Kanap :

https://nicolascastagna.github.io/Nicolas_Castagna_05_05_2022/

## Preview

### Page connexion

![Capture d’écran 2022-07-08 à 15 56 36](https://user-images.githubusercontent.com/100592012/178007287-a9e95477-142f-4b8a-b33b-13b32c103013.png)

### Page affichantes toutes les sauces

![Capture d’écran 2022-07-08 à 16 00 17](https://user-images.githubusercontent.com/100592012/178007466-aaa13300-72c1-4a4a-88df-7cf64bc7ffe4.png)

### Page de création/modification de sauce

![Capture d’écran 2022-07-08 à 16 05 05](https://user-images.githubusercontent.com/100592012/178007827-f63d28eb-145d-4cc1-8b0d-37abae7b5f77.png)

### Page correspondante à la sauce et utilisateur propriétaire de la sauce

![Capture d’écran 2022-07-08 à 15 59 57](https://user-images.githubusercontent.com/100592012/178007936-d4072376-c1f1-4d15-91f5-9ee28f2e5910.png)

### Page correspondante à la sauce et utilisateur non propriétaire de la sauce

![Capture d’écran 2022-07-08 à 16 00 09](https://user-images.githubusercontent.com/100592012/178008091-fed821f0-36b6-4763-9be4-657fa45beaa1.png)
