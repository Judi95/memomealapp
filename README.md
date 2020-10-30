## MemoMeal

Livre de recette et oenologie en ligne.

### `V 0.1`

- [x] 3 catégories : Salé, sucré, vins
- [x] Pouvoir ajouter des recettes salées, sucrées et des vins
- [x] Pouvoir ajouter des images
- [x] Pouvoir supprimer une recette salée, sucrée ou un vin

### `V 1.0`

- [x] Gérer le Bearer token
- [x] Ajouter une page de connexion
- [x] Gestion déconnexion
- [x] Ajouter une page d'incription
- [x] Gestion de compte individuel
- [x] Relier les recettes et vins a un utilisateur

### `V 1.1`

- [x] Pouvoir indiquer le nombre de personne pour la quantité d'une recette (formulaire + DB)
- [x] Pouvoir calculer automatique les doses d'ingrédient si on augmente le nombre de personne dans le détail d'une recette
- [x] Pouvoir modifier une recette existante d'un utilisateur
- [x] Suppresion recettes et vins d'un utilisateur
- [x] gestion URL API prod
- [x] Page gestion de compte : changer mot de passe, changer email

### `V 1.2`

- [ ] rechercher par type de vin
- [ ] Pouvoir supprimer son compte

### `FIRSY DEPLOYMENT`

### `V 1.3`

- [ ] CORS policy
- [ ] Configuration envoi de mail

### `V 1.4`

- [ ] Gérer "mot de passe oublié"
- [ ] envoi de mail à la création de compte / activation / changement
- [ ] Gestion erreur en front / affichage message

### `V 2.0`

- [ ] Gestion de compte familial
- [ ] Envoie d'un mail avec une invitation
- [ ] Création d'un groupe d'utilisateurs (DB)
- [ ] Relier les recettes et vins a un groupe d'utilisateur

### `DEPLOYMENT`

## Deployment

- Hébergeur : ScaleWay
- Ajouter une instance de 20G sur Ubuntu 20.04
- Ajouter ma clé public dans mon compte Scaleway
- Se connecter en SSH
- Créer une clé SHH sur le serveur
- Récupérer la clé public et la mettre dans github
- Cloner le projet en SSH dans www
- git pull
- apt update
- apt install nginx  et java 11 : apt install nginx openjdk-11-jdk
- installation de nvm : curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
- nvm install
- aller dans var/www/memomealapp
- npm install
- Création du Build de prod : npm run build
- aller dans nginx/sites-available/
- apt install vim
- vim memomeal.conf
server {
  listen 80;
  
  root var/www/memomealapp/build
  index index.html;
}
- Liaison des deux deux dossiers : ln -s /etc/nginx/sites-available/memomeal.conf /etc/nginx/sites-enabled/memomeal.conf
- systemctl restart nginx
- systemctl status nginx
- (systemctl reload nginx)
### `BDD`
### `API`
- git clone API
- apt install maven
- mvn clean install -P prod

