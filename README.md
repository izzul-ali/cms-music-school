# Music School Management System
The Music School Management System is a web application built with Next.js and powered by Directus as the backend. This system streamlines the administrative processes of a music school by offering essential features to manage users, instruments, lessons, and payments efficiently.

Designed for administrators, the platform provides tools for managing both students and teachers, organizing lessons, and tracking payment while ensuring data integrity through robust backend configurations.

*<b>You can see the details of tech stack used in the frontend folder.</b>*

## Main Features

#### 1. Authentication
* Login & Logout <br/>
*<b>Note:</b> for now I only handle the administrator role*

#### 2. User Management
* CRUD (Create, Read, Update, Delete) user

#### 3. Instrument
* CRUD (Create, Read, Update, Delete) instrument <br/>
*<b>Note:</b> deleting old data will result in the error `SQLITE_CONSTRAINT: FOREIGN KEY` because the data is already used in another table. Make sure you create new data so you can delete it.*

#### 4. Lesson
* View Lessons list with filter query

#### 5. Payment
* View Payments list with filter query

## How to run
```
1. run directus from the /directus folder
2. run the web frontend by following the steps in the /frontend folder
```

## Preview
<img width="1440" alt="Screenshot 2025-01-07 at 09 50 43" src="https://github.com/user-attachments/assets/bb126875-2480-4066-8970-ea377a3dfbfd" />

<img width="1437" alt="Screenshot 2025-01-07 at 09 50 00" src="https://github.com/user-attachments/assets/be8769cd-bd30-4aca-8b0a-f46b1a52f8e6" />

<img width="1438" alt="Screenshot 2025-01-07 at 09 50 12" src="https://github.com/user-attachments/assets/33abf9e8-7cac-4f4b-949d-3daf50ea1397" />
