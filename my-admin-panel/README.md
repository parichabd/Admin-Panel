# Admin Panel App

A React frontend application for managing products, including user registration, login, product CRUD operations, search functionality, and pagination.

---

## Features

- Secure user registration and login using JWT authentication
- Token and user data stored in localStorage
- Add, edit, and delete products
- Search products by name with partial matching support
- Pagination: 6 products on the first page, 10 products on subsequent pages
- Display numbers and prices in Persian digits with formatted output
- Responsive and Persian language user interface
- Success and error notifications using toast messages

---

## Project Structure

```
src
├── Components/
│ ├── Products/
│ │ ├── Products.jsx # Main Products page with search and pagination
│ │ ├── ProductsTable.jsx # Product listing table with edit/delete buttons
│ │ ├── ManagmentProducts.jsx # Form to add new products
│ │ ├── ConfirmDialog.jsx # Modal confirmation dialog for delete actions
│ │ ├── SearchBar/
│ │ │ └── SearchBar.jsx # Search input and user info display
│ │ └── UseInfo/
│ │ └── CompleteProfile.jsx # Profile completion form
│ ├── LoginPage.jsx # Welcome and login page with initial UI
│ ├── SignIn.jsx # SignIn form component
│ ├── RegisterPage.jsx # Register form component with validation
│ ├── Welcome.jsx # Welcome landing page
│ └── 404.jsx # PageNotFound component
├── context/
│ └── UserProvider.jsx # Context API for user state management
├── Hooks/
│ ├── usePersianNumber.js # Persian number formatting utilities
│ ├── useTitle.js # Hook for setting document title
│ └── authMessages.js # Persian translations of backend auth messages
├── assets/
│ └── icons/ # Icons for UI like trash, edit, avatar
├── App.jsx # Main application routing
└── index.jsx # React DOM rendering entry point
```

---

## Installation & Running the Project

1. Clone the repository:

```bash
git clone [your-repo-url]
cd [project-folder]


npm run dev


Make sure the backend server is running at http://localhost:3000 with the API endpoints /auth and /products.

Important Notes

JWT tokens are saved in localStorage and sent with each request.

Search filters products dynamically based on partial name matches.

Pagination is dynamic: first page shows 6 products, subsequent pages show 10 products each.

Context API is used to manage user state globally.

Numbers and prices are converted and displayed in Persian digits with formatting.

Toast notifications display messages in Persian.

Suggestions for Improvement

Add filtering options by category or price

Implement sorting capabilities for products

Add infinite scrolling or load more button

Improve mobile responsiveness and UI/UX

Add unit and integration tests

Contact

Feel free to reach out if you have any questions or suggestions!


```

# More Info

![App Screenshot](<./public/Shots/Screenshot%20(167).png>)
![App Screenshot](<./public/Shots/Screenshot%20(168).png>)
![App Screenshot](<./public/Shots/Screenshot%20(169).png>)
![App Screenshot](<./public/Shots/Screenshot%20(170).png>)
![App Screenshot](<./public/Shots/Screenshot%20(171).png>)
![App Screenshot](<./public/Shots/Screenshot%20(172).png>)
![App Screenshot](<./public/Shots/Screenshot%20(173).png>)
![App Screenshot](<./public/Shots/Screenshot%20(174).png>)
![App Screenshot](<./public/Shots/Screenshot%20(175).png>)
![App Screenshot](<./public/Shots/Screenshot%20(176).png>)
![App Screenshot](<./public/Shots/Screenshot%20(177).png>)

---

## Contact

If you have any questions, feel free to reach out:
Email: parichehrabedzadeh@gmail.com

GitHub: github.com/parichabd
