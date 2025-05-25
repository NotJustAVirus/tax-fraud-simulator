docker compose -f development.docker-compose.yaml up -d
php artisan migrate
php artisan serve