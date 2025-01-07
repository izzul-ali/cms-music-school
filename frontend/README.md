# Frontend - Music School Management System
This Content Management System (CMS) is a modern, scalable, and user-friendly web application built using cutting-edge technologies. Designed with an **Atomic Design Pattern**, the system ensures a modular and maintainable codebase by breaking the UI into reusable components, enhancing both scalability and consistency across the application.

## Atomic Design Pattern
The Atomic Design Pattern is implemented to promote a structured and reusable component architecture, making it easier to manage and scale the application. The components are organized into three levels:

* Atoms: Basic building blocks (e.g., buttons, inputs, labels).
* Molecules: Groups of atoms working together (e.g., input fields with labels).
* Organisms: Complex components that form sections of the UI (e.g., page, layout).

Having applied the Atomic Design Pattern in my previous projects, both small-scale and large-scale. I’ve experienced firsthand how it significantly improves code maintainability. This pattern has simplified tracing and debugging processes, making it easier to locate and fix issues efficiently. By breaking down the UI into reusable components, I’ve managed to reduce code duplication, ensure consistency, and streamline development workflows.

This experience has enabled me to build scalable applications with clean, modular code structures, ensuring that projects remain easy to update and extend as they grow over time.

## Libraries

| **Library**               | **Description**                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------|
| **Material UI**            | A popular React component library that provides ready-to-use UI components following Google's Material Design guidelines. |
| **Tailwind CSS**           | A utility-first CSS framework that allows for fast, customizable, and responsive styling directly in your HTML. |
| **@tanstack/react-query**  | A powerful data-fetching and state management library for React that simplifies handling server-side data and caching. |
| **@tanstack/react-table**  | A headless table library for React that provides flexible, high-performance data grids and advanced features like sorting, filtering, and pagination. |
| **next-auth**              | An open-source authentication library for Next.js that provides easy integration with multiple providers like Google, GitHub, and custom credentials. |
| **@directus/sdk**          | A JavaScript SDK to interact with the Directus API, simplifying data fetching and CRUD operations for your backend. |
| **axios**                  | A popular HTTP client for making API requests, supporting features like interceptors, request cancellation, and automatic JSON parsing. |
| **react-hook-form**        | A flexible and performant library for handling forms in React with minimal re-renders and validation support. |
| **react-toastify**         | A library for displaying customizable toast notifications in React applications, with features like auto-dismiss and different notification types. |



## Getting Started

Run the development server:

```bash
# please use nodejs version 20

npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

***Note:*** when you encounter a case where the page does not load completely after running `npm run dev`, you can refresh the page. Usually this only happens in development mode
