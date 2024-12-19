# CartAgents

## Description

Cette application permet de gérer un panier d'achat avec des produits, en effectuant des recherches en ligne via l'API OpenAI. Elle expose un seul endpoint pour interagir avec trois agents :

    Agent de Gestion de Panier : Ajouter, supprimer, et lister les produits.
    Agent Tavily : Recherche de produits en ligne.
    Agent Coordinateur : Orchestration des actions entre les agents.
    
## Installation

Clonez le repository et installez les dépendances :

```
git clone <url_du_repertoire>
cd <dossier>
npm install
```

Créez un fichier .env avec votre clé API OpenAI :

```
OPENAI_API_KEY=your-api-key
```

Démarrez l'application :

```
npm run start
```

## Exemples de requêtes

Requête pour ajouter un produit :

```
curl -G -X GET "http://localhost:3000/invoke" --data-urlencode "query=Je souhaite acheter un sapin pour Noël, chercher chez Ikea si un sapin est disponible et ajoute-le au panier"
```


Requête pour afficher le panier :

```
curl -G -X GET "http://localhost:3000/invoke" --data-urlencode "query=Affiche mon panier"
```