This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App Architecture

This project follows **Clean Architecture** principles, organizing the code into well-defined layers:

- **Presentation Layer (MVVM)**: The frontend follows the **Model-View-ViewModel (MVVM)** pattern. The **View** consists of Next.js pages and components, while the **ViewModel** handles UI logic and state management.
- **Domain Layer**: Defines business logic and use cases. Interfaces for repositories are defined here, ensuring a separation between business logic and data sources.
- **Data Layer**: Contains repository implementations that interact with external services (e.g., AWS S3).
- **Infrastructure Layer**: Handles API calls (Server actions for this particular case).

### Data Persistence
Since this is a simple app, **AWS S3** is used to store two types of data as JSON files in an S3 bucket:
1. **Form Structure** – Stores the form fields and their configurations.
2. **Submitted Data** – Stores users' form submissions.

In a real-world scenario, a **relational or NoSQL database** would be used instead of S3 for structured and scalable data storage.

## Demo URL

You can check out a demo of the app at the following URL:

- [Demo URL](https://multiform-app-b7v6.vercel.app/)

There are 3 different pages:

- [Home Page](https://multiform-app-b7v6.vercel.app/) - Allows users to fill and submit the form.
- [Admin Page](https://multiform-app-b7v6.vercel.app/admin) - Users can modify the form's structure and fields.
- [Data Page](https://multiform-app-b7v6.vercel.app/data) - Displays submitted form data in a tabular format.
