# Простой блог с комментариями

Backend: Laravel 11 + MySQL  
Frontend: React (Vite) + Tailwind CSS  
API: REST без авторизации  

Функционал:
- CRUD статей (только create + read)
- Добавление комментариев к статье
- Список статей с кратким содержимым
- Страница статьи с комментариями и формой добавления

## Структура проекта

blog-laravel/
├── blog-backend/
├── blog-frontend/ 
├── docker-compose.yml
├── README.md
└── .gitignore

## Требования

- Docker + docker compose
- Git

## Быстрый запуск

```bash
# 1. Клонируем
git clone <твой-репозиторий>
cd blog

# 2. Запускаем все сервисы
docker compose up -d --build

# 3. Ждём 30–60 секунд пока mysql стартанёт и composer/npm установятся

# 4. Заходим в контейнер бэкенда и делаем миграции + сидер
docker compose exec backend php artisan migrate:fresh --seed

# 5. Открываем в браузере
http://localhost/
```

## Ручной запуск без Docker

## BACKEND

cd blog-backend
cp .env.example .env
отредактировать .env (DB_HOST=127.0.0.1, DB_DATABASE=laravel и т.д.)
docker compose up -d db   # или запусти MySQL вручную
php artisan key:generate
php artisan migrate --seed
php artisan serve

API будет на http://127.0.0.1:8000/api

## FRONTEND

cd blog-frontend
npm install
npm run dev

Прокси на бэкенд настроен в vite.config.js → /api → http://127.0.0.1:8000

API Endpoints

GET /api/articles - Список всех статей
GET /api/articles/{id} - Одна статья + комменты
POST /api/articles - Создать статью
POST /api/articles/{id}/comments - Добавить коммент

## ВОЗМОЖНЫЕ ПРОБЛЕМЫ И БЫСТРЫЙ ФИКС

Белый экран на фронте - чекнуть DevTools, может быть косяк с useState/useEffect
404 на /api/articles - смотри routes/api.php и bootstrap/app.php (withRouting api)
ECONREFUSED 8000 - бэк не запущен
Ошибка кодировки utf8mb4_0900_ai_ci - добавь руками в .env DB_COLLATION=utf8mb4_unicode_ci
