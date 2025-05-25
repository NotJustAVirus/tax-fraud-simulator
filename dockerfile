# Stage 1: Build with Composer
FROM composer:2.2 AS build

WORKDIR /app

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Stage 2: Production image
FROM php:8.2-cli

# Install system dependencies
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

WORKDIR /app

# Copy built application from build stage
COPY --from=build /app .

# Expose port if needed (e.g., for built-in server)
EXPOSE 8000

# Command to run the application (adjust as needed)
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]