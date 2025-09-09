client/
- npm install
- npm run dev

server/
- npm install
- npm run dev

db: docker compose up

npx prisma generate
npx prisma migrate dev --name init
npm run seed


curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123","role":"STUDENT"}'


## Admin signup (signup, then login to get access token)

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"admin123","role":"ADMIN"}'

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'


## Docker Mysql:

docker exec -it mysql_skhill mysql -u user -p

"password"

USE skhill;

SELECT id, email, password, role FROM User WHERE email = 'admin@example.com';
