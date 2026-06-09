# 🚀 Login App — CI/CD Demo

> โปรเจกต์ Node.js Login API สาธิตการทำงานของ CI/CD Pipeline ด้วย GitHub Actions, Docker และ Docker Hub  
> เมื่อ Push โค้ดขึ้น GitHub — ระบบจะ Test, Build และ Push Docker Image ให้อัตโนมัติ

---

## ✨ Features

- Login API Endpoint
- Automated Testing ด้วย Jest + Supertest
- Docker Containerization
- GitHub Actions CI/CD Pipeline
- Auto Build & Push Docker Image ไป Docker Hub

---

## 🧰 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-6DB33F?style=flat&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Docker Hub](https://img.shields.io/badge/Docker_Hub-2496ED?style=flat&logo=docker&logoColor=white)

---

## 📁 โครงสร้างโปรเจกต์

```
demo-cicd/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml        ← GitHub Actions Pipeline
│
├── app.js
├── server.js
├── server.test.js            ← Jest + Supertest
├── Dockerfile
├── package.json
├── package-lock.json
├── index.html
└── README.md
```

---

## 📡 API Endpoint

### `POST /login`

**Request Body:**

```json
{
  "username": "admin",
  "password": "1234"
}
```

**Response — สำเร็จ:**

```json
{ "success": true }
```

**Response — ไม่สำเร็จ:**

```json
{ "success": false }
```

---

## 🛠️ การติดตั้งและรันโปรเจกต์

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. Start Server

```bash
npm start
```

เปิดใช้งานผ่าน Browser → [http://localhost:3000](http://localhost:3000)

---

## 🧪 การทดสอบ

```bash
npm test
```

**Test Cases ที่ครอบคลุม:**
- ✅ Login ด้วย credentials ที่ถูกต้อง
- ❌ Login ด้วย credentials ที่ไม่ถูกต้อง

---

## 🐳 การใช้งาน Docker

### Build Image

```bash
docker build -t login-app .
```

### Run Container

```bash
docker run -d -p 3000:3000 login-app
```

### ตรวจสอบ Container

```bash
docker ps
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

เมื่อ Push โค้ดขึ้น `main` branch — Pipeline จะทำงานอัตโนมัติ 2 Job:

```
Developer
   ↓  git push → main
GitHub Repository
   ↓
GitHub Actions
   │
   ├── Job 1: test
   │     ├── Checkout source code
   │     ├── Install dependencies  (npm install)
   │     └── Run Jest tests        (npm test)
   │
   └── Job 2: build-and-push  (รันหลัง test ผ่านเท่านั้น)
         ├── Checkout source code
         ├── Login to Docker Hub
         ├── Build Docker Image
         └── Push Image → Docker Hub
               ↓
         dockerhub-username/login-app:latest
```

---

## ⚙️ GitHub Actions Workflow

**ไฟล์:** `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

  build-and-push:
    runs-on: ubuntu-latest
    needs: test                   # รอให้ test ผ่านก่อน
    steps:
      - uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_TOKEN }}

      - name: Build and Push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/login-app:latest
```

> 💡 **หมายเหตุ:** ต้องตั้งค่า `DOCKER_USERNAME` และ `DOCKER_TOKEN` ใน GitHub Repository Secrets ก่อนใช้งาน

---

## 🐋 Docker Hub Image

Docker Image จะถูก Publish อัตโนมัติหลัง Test ผ่าน

### Pull Image

```bash
docker pull dockerhub-username/login-app:latest
```

### Run Image จาก Docker Hub

```bash
docker run -p 3000:3000 dockerhub-username/login-app:latest
```

---

## 📚 สิ่งที่ได้เรียนรู้

| หัวข้อ | รายละเอียด |
|---|---|
| Git & GitHub | การจัดการ Source Code และ Branch |
| Automated Testing | เขียนและรัน Test ด้วย Jest |
| Continuous Integration | ตรวจสอบโค้ดอัตโนมัติทุกครั้งที่ Push |
| Docker | Containerize Application |
| Image Publishing | Push Image ขึ้น Docker Hub |
| Continuous Delivery | Deploy อัตโนมัติหลัง Build สำเร็จ |
| GitHub Actions | เขียน Workflow Automation |

---

## 👤 ผู้จัดทำ

**Apiruk Punbunchu** — CI/CD Demonstration Project using GitHub Actions
