# Student System SaaS

A minimal **multi-tenant student management system** built with **Laravel** and **React Starter Kit (Inertia)**.  
This project uses a **shared-database** tenancy model and **does not expose a separate API** — server-side controllers return pages via Inertia.

---

## Features
- Single-repository Laravel + React (Inertia) starter setup  
- Shared-database multi-tenancy (tenant isolation via `tenant_id` / middleware / global scopes)  
- Student CRUD, authentication, basic role handling  
- Seeders for sample tenant + admin (included)  
- Lightweight and easy to extend

---

## Tech stack
- Laravel (backend + routing + controllers)  
- React (via React Starter Kit + Inertia) — single-page experience backed by Laravel  
- MySQL (shared DB)  
- Vite / Laravel Mix (as configured in the starter)  
- Composer & npm

---

## Requirements
- PHP (see `composer.json`)  
- Composer  
- Node.js & npm (see `package.json`)  
- MySQL (or compatible)

> Recommended: use PHP 8.1+ and Node 16+ (check your project's `composer.json` and `package.json` for exact versions).

---

## Quick start (single repo — Inertia integrated)

1. Clone
```bash
git clone https://github.com/your-username/student-system-saas.git
cd student-system-saas
Environment

bash
Copy code
cp .env.example .env
# Edit .env: set DB_*, APP_URL, and tenancy-related variables if present
Install PHP deps and generate app key

bash
Copy code
composer install
php artisan key:generate
Install JS deps and build (run in project root)

bash
Copy code
npm install
npm run dev   # or `npm run build` for production
Database: migrate & seed (creates sample tenant + admin)

bash
Copy code
php artisan migrate --seed
Optional

bash
Copy code
php artisan storage:link      # if file uploads used
php artisan serve            # local dev server (or use your preferred web server)
If your React Starter Kit is placed in a separate frontend folder, run cd frontend before npm install and npm run dev.

```

## How multi-tenancy works (short)
- Shared database: all tenants live in the same DB. Tenant-scoped tables include a tenant_id column.

- A TenantMiddleware sets the current tenant context (from domain, subdomain, path, or header).

- Models use an Eloquent global scope (or manual whereTenant() usage) to restrict queries to the current tenant.

- Customize tenant resolution in app/Http/Middleware/TenantMiddleware.php (or the service you used in the starter kit).

## Common commands
- composer install — install PHP dependencies

- npm install — install JS dependencies

- npm run dev — start Vite/Mix dev build (watch)

- php artisan migrate --seed — migrate DB + seed sample data

- php artisan storage:link — create storage symlink

- php artisan tinker — debug / create tenants or users manually

## Checklist before pushing to GitHub
- Add .env.example (do not push .env)

- Ensure migrations + seeders exist for reproducible setup

- Add README.md (this file), LICENSE, and .gitignore

- Remove any hard-coded secrets or credentials

- Include short contributor notes if others will onboard

## Troubleshooting
- If assets don't load: check npm run dev is running and APP_URL matches your dev host.

- If tenants not resolving: verify TenantMiddleware logic and your local hosts/webserver config (subdomain tenancy requires host entries).

- Check Node & PHP versions if install/build fails.

