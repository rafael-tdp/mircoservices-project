# Micro-services

## Le sujet du projet
Le projet consiste à développer un site web destiné à deux types d'utilisateurs : les enseignants et les étudiants. Les enseignants auront la possibilité de publier et de créer des cours, ainsi que de mettre en ligne des notes. Les étudiants pourront consulter leurs notes et recevront des notifications lorsqu'une nouvelle note leur est attribuée. Pour mettre en place ces fonctionnalités, plusieurs micro-services seront utilisés.

## Liens utiles
Découpage du projet:
https://excalidraw.com/#room=94a083eb85eccc12288d,s_JNb7sq83JVLAnsgQbElQ


Exemple de microservices:
https://github.com/GraphQLHero/microservices-workshop/tree/main

Le cours:
https://slides-esgi-microservices.graphqlhero.com/

# Technos
Front-end : Angular
Back-end : NodeJS
BDD : MongoDB

# Event-Driven :
produceur :  service notes
consommateur : service notifcation et autres
message : "Envoi de notif pour prévénir qu'une note a été publiée"