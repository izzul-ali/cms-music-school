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
