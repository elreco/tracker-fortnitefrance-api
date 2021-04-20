# (tracker) API

Microservices dédiés à l'application [Tracker FortniteFrance](https://github.com/elreco/tracker-fortnitefrance-api), de réservation collective de prestations de restauration

**Appartient au projet [Tracker FortniteFrance](https://github.com/elreco/tracker-fortnitefrance-api)**

## Table des matières

* [Synopsis](#synopsis)
* [Utilisation](#usage)
* [Stack applicative](#app-stack)
* [Installation](#installation)
* [Build](#build)
* [Tests](#tests)
* [Compatibilité](#compatibility)
* [Issues](#issues)
* [Comment contribuer ?](#contributing)
* [Interlocuteur(s)](#credits)
* [Historique](#history)
* [Licence](#license)

## <a name="synopsis"> Synopsis

Microservices dédiés à l'application Tracker FortniteFrance, de réservation collective de prestations de restauration.

Cette application inclut à date :

* l'interface d'administration,
* la vue applicative pour le donneur d'ordres,
* la vue applicative pour le restaurateur/traiteur,
* la vue applicative pour le DO.

## <a name="usage"> Utilisation

Pour utiliser l'api REST de Tracker FortniteFrance, il faut utiliser cette url :

    process.env.SERVER_URL/process.env.PARSE_MOUNT

Pour utiliser le dashboard Parse, il faut utiliser cette url :

    process.env.SERVER_URL/dashboard

**Le nom d'utilisateur et le mot de passe sont définis par la variable d'environnement : `DASHBOARD_AUTH`**

## <a name="app-stack"> Stack applicative

* Serveur d'applications [Parse](https://www.parseplatform.org) - voir [Data driven programming](https://en.wikipedia.org/wiki/Data-driven_programming)
* Base de données NoSQL : [Mongo](https://www.mongodb.com)

## <a name="installation"> Installation

Créer un fichier .env en copiant le fichier .env.example et le remplir en fonction de l'environnement

    cp .env.example .env

Installation avec yarn

    yarn

Installer mongo en local

* OS X :
    http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Windows :
    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Lancer mongo pour vous connecter à la base de données, histoire d'être sûr que ça fonctionne.

    mongo

Lancer le serveur API

    yarn serve

### Initialisation de l'application

Lancez cette commande pour initialiser l'application (créer les schémas, les roles...) :

    yarn tracker --init-tracker

⚠️ Le serveur API doit être lancé pour que cette commande fonctionne

### Autres commandes

Créer un utilisateur admin :

    yarn tracker --create-admin --username="elreco" --password="password" --email="email@email.com" --firstname="admin" --lastname="user"

⚠️ Le serveur API doit être lancé pour que cette commande fonctionne
⚠️ `yarn tracker --init-tracker` doit avoir été lancé

Si vous voulez mettre à jour les schemas :

    yarn tracker --update-schemas

⚠️ Le serveur API doit être lancé pour que cette commande fonctionne
⚠️ `yarn tracker --init-tracker` doit avoir été lancé

Si vous voulez mettre à jour les rôles après avoir fait des modifications sur les Abilities :

    yarn tracker --save-roles

⚠️ Le serveur API doit être lancé pour que cette commande fonctionne
⚠️ `yarn tracker --init-tracker` doit avoir été lancé

## <a name="tests"> Tests

`#todo`

## <a name="compatibility"> Compatibilité

* [Node](https://www.nodejs.org) >= `14.15.4`
* [MongoDB](https://www.mongodb.com/fr) >= `4.4.3`

## <a name="issues"> Issues

Libre à vous de [soumettre des 'issues'](https://github.com/elreco/tracker-fortnitefrance-api) et propositions d'améliorations.

## <a name="contributing"> Comment contribuer ?

Quiconque ayant accès au présent dépôt a la possibilité de contribuer au projet en procédant de la manière suivante :

 1. Effectuer un **fork** du dépôt ;
 2. **Cloner** le fork du projet sur le poste de travail ;
 3. Valider (**commit**) les changements ;
 4. Publier (**push**) les travaux vers le dépôt distant du *fork* ;
 5. Soumettre une **merge request** pour relecture et, éventuellement, fusion des modifications.

## <a name="credits"> Crédits

* [Alexandre "elreco" Le Corre](https://github.com/elreco)

## <a name="history"> Historique

Référez-vous au fichiers de [suivi des changements](CHANGELOG.md).

## <a name="license"> Licence

>
> DEEPNOX CONFIDENTIAL
>
> (c) 2021, Deepnox SAS.
> All Rights Reserved.
>
> All information contained herein is, and remains the property
> of Deepnox SAS and its suppliers, if any.
>
> The intellectual and technical concepts contained herein are
> proprietary to Deepnox SAS and its suppliers and may be covered
> by European Union, U.S. and Foreign Patents, patents in process,
> and are protected by trade secret or copyright law.
>
> Dissemination of this information or reproduction of this material
> is strictly forbidden unless prior written permission is obtained
> from Deepnox SAS.
>

