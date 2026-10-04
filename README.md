<div align="center">
  
# 📚 BookStore REST API

**פרויקט מסכם - שרת Backend לחנות ספרים וירטואלית**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

</div>

<br>

> שרת Backend מלא המספק ממשק RESTful לניהול קטלוג ספרים (מודפסים ודיגיטליים), ניהול משתמשים, ומערכת עגלת קניות והזמנות מקיפה. הפרויקט נבנה במטרה להדגים ארכיטקטורת MVC נקייה, קשרי נתונים מורכבים ויישומי אבטחה מתקדמים.

## 📑 תוכן עניינים
- [תכונות מרכזיות](#-תכונות-מרכזיות)
- [התקנה והרצה](#-התקנה-והרצה-מקומית)
- [תיעוד ה-API](#-תיעוד-נתיבי-ה-api-endpoints)
- [ארכיטקטורה ומבנה](#-ארכיטקטורת-הפרויקט-mvc)

---

## ✨ תכונות מרכזיות

- [x] **מערכת הרשאות (RBAC):** הפרדה ברורה בין פעולות לקוח (חיפוש, יצירת הזמנה) לפעולות מנהל (עדכון מלאי, ניהול הזמנות).
- [x] **קשרי גומלין מורכבים (Associations):** יישום `One-to-Many` (משתמשים-הזמנות) ו-`Many-to-Many` (הזמנות-ספרים דרך טבלת גישור).
- [x] **מנוע סינון וחיפוש:** שליפת נתונים דינמית באמצעות Query Parameters (למשל `?author=name&maxPrice=100`).
- [x] **אבטחה והגנה:**
  - אימות Stateless מבוסס **JWT**.
  - הצפנת סיסמאות לפני שמירה באמצעות **bcrypt**.
  - ולידציית קלט קפדנית באמצעות **express-validator**.
  - הגנה מפני התקפות עומס (DDoS / Brute Force) באמצעות **express-rate-limit**.

---

## 🛠️ התקנה והרצה מקומית

**1. שיבוט (Clone) והתקנת תלויות**
```bash
git clone [https://github.com/your-username/bookstore-rest-api.git](https://github.com/your-username/bookstore-rest-api.git)
cd bookstore-rest-api
npm install
```

**2. הגדרת משתני סביבה**
יש ליצור קובץ `.env` בתיקיית השורש (נעזרים בתבנית `.env.example`):
```env
PORT=
JWT_SECRET=
```

**3. הפעלת השרת**
מצב פיתוח (כולל האזנה לשינויים - Nodemon):
```bash
npm run dev
```
מצב ייצור (Production):
```bash
npm start
```
> 💡 מסד הנתונים (`db.sqlite`) ייווצר ויסתנכרן אוטומטית בעת ההפעלה הראשונה.

---

## 🔌 תיעוד נתיבי ה-API (Endpoints)

### 🔐 אימות ומשתמשים (Auth)
| מתודה | נתיב | הרשאות | תיאור הפעולה |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | ציבורי | הרשמת משתמש חדש במערכת |
| `POST` | `/api/v1/auth/login` | ציבורי | התחברות וקבלת Access Token |

### 📖 קטלוג ספרים (Books)
| מתודה | נתיב | הרשאות | תיאור הפעולה |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/books` | ציבורי | שליפת ספרים (תומך בפילטרים: `genre`, `author`, `maxPrice`) |
| `POST` | `/api/v1/books` | **Admin** בלבד | הוספת ספר חדש למלאי |

### 🛒 הזמנות (Orders)
| מתודה | נתיב | הרשאות | תיאור הפעולה |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/orders` | משתמש מחובר | יצירת הזמנה חדשה (סל קניות מרובה פריטים) |
| `GET` | `/api/v1/orders/:id` | יוצר ההזמנה / Admin | צפייה בפרטי הזמנה ספציפית כולל רשימת הספרים |
| `PUT` | `/api/v1/orders/:id/status` | **Admin** בלבד | עדכון סטטוס הטיפול בהזמנה |

---

## 📁 ארכיטקטורת הפרויקט (MVC)

```text
bookstore-rest-api/
├── src/
│   ├── DB/
│   │   ├── config.js         # קישור וקונפיגורציית ה-Database
│   │   ├── models/           # הגדרת סכמות וטבלאות (Sequelize)
│   │   └── db.sqlite         # קובץ מסד הנתונים (נוצר אוטומטית)
│   ├── controllers/          # לוגיקה עסקית ועיבוד נתונים
│   ├── middlewares/          # שכבות הגנה (Auth, Rate Limiter, Validation)
│   ├── routes/               # ניתוב בקשות ה-HTTP לקונטרולרים
│   └── app.js                # שרת ה-Express (Entry Point)
├── .env.example              # תבנית למשתני הסביבה
└── package.json              # תלויות וסקריפטים
```
