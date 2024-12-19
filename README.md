# CartAgents

## Description de l'approche

On organise le projet autour des 3 agents que l'on doit créer. On regroupe les agents dans le même module et on crée ensuite un service pour chaque agent.

    Agent de Gestion de Panier : Ajouter, supprimer, et lister les produits.
    Agent Tavily : Recherche de produits en ligne.
    Agent Coordinateur/Langgraph : Le service Coordinateur va créer le graphe du service Langgraph qui lui va coordonner les actions à faire en fonction de la requête utilisateur
    
## Installation

Clonez le repository et installez les dépendances :

```
git clone <url_du_repertoire>
cd <dossier>/backend
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

Requête pour supprimer un produit :

```
curl -G -X GET "http://localhost:3000/invoke?" --data-urlencode "query=Je souhaite supprimer l'article sapin"
```

Requête pour afficher le panier :

```
curl -G -X GET "http://localhost:3000/invoke" --data-urlencode "query=Affiche mon panier"
```
