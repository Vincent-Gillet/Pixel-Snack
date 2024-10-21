# Pixel-Snack

## L'Introduction

L'application Pixel Snack est une application de recettes de cuisine basée sur la recherche de recettes qui apparaissent dans vos oeuvres favorites (films, séries, animés,...). Elle permet de consulter des recettes. Lors l'utilisateur s'incrit et se connecte, il peut égalements ajouter ses propres recettes qui sont consultables par l'ensemble des visiteurs et utilisateur.

## Les Prérequis

Pour utiliser l'application, il vous faudra au préalable avoir les éléments suivants installés sur votre machine :

- **PHP** >= 8.0
- **Composer** pour la gestion des dépendances PHP
- **Laravel** >= 9.x
- **React** >= 18
- **MySQL** ou autre base de données compatible
- **Swagger** pour la documentation et les tests de l'API

## L'Installation

Clonez le dépôt GitHub avec la commande suivante :

```bash
git clone https://github.com/Vincent-Gillet/Pixel-Snack.git
cd Pixel-Snack
```

### La base de données

Lancez la création de la base de donnée et ajouter les données déjà créées :
```bash
php artisan migrate:fresh --seed
```

### Le Backend

Installez les dépendances PHP avec Composer :

```bash
composer install
```

Lancez l'API Laravel :

```bash
php artisan serve
```

### Le Frontend

Lancez l'application React :

```bash
npm run dev
```

## Documentation Swagger

### Configuration de Swagger
Swagger est utilisé pour documenter et tester l'API. Voici comment configurer et utiliser Swagger avec Laravel.

#### Installer Swagger
Nous utilisons le package darkaonline/l5-swagger pour intégrer Swagger à Laravel. Installez-le via Composer :

```bash
composer require darkaonline/l5-swagger
```

#### Publier les configurations
Publiez les fichiers de configuration Swagger avec la commande suivante :

```bash
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
```

#### Configurer Swagger
Modifiez le fichier de configuration config/l5-swagger.php pour ajuster les paramètres selon vos besoins. Assurez-vous que les chemins d'accès et les options de sécurité sont correctement configurés.

#### Générer la documentation Swagger
Générez la documentation Swagger en exécutant la commande suivante :

```bash
php artisan l5-swagger:generate
```

### Accès à la documentation 

La documentation complète de l'API est disponible à l'adresse suivante en ligne :

[Accéder à la documentation Swagger](http://www.api-pixel-snack.vincentgillet.fr/api/documentation)

La documentation complète de l'API est disponible à l'adresse suivante en local :

[Accéder à la documentation Swagger](https://127.0.0.1:8000/api/documentation)
