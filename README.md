## MemoMeal

Livre de recette et oenologie en ligne.

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
- aller dans etc/nginx/sites-available/
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
- Mettre à jour le certificat : certbot --nginx

### `BDD`


### `API`
- git clone API
- apt install maven
- mvn spring-boot:run -P prod &
- mvn spring-boot:stop
- Lister les process : ps aux

### Script DUMP
./db_backup.sh puis copier les scp

