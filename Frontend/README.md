# Project Description: Auth Application (Client)

## Overview

The Auth Application project is a client-side application designed to handle user authentication and management. It includes features for user registration, email activation, login, logout, password reset, and profile management. The application is built using React and integrates various libraries for enhanced functionality and user experience.

## Technologies Used

The Auth Application utilizes modern web technologies to provide a seamless and efficient authentication system. Key technologies and libraries incorporated into the project include:

- **React:** Used for building the user interface with components managing different aspects of authentication.
- **React Router DOM:** Enables navigation within the application for a seamless user experience.
- **Axios:** Used for making HTTP requests to the server.
- **Formik:** Manages form state and validation.
- **Bulma:** A CSS framework used for styling to create visually appealing interfaces.
- **classnames:** Simplifies the process of conditionally applying CSS classes.
- **@fortawesome/fontawesome-free:** Provides a collection of icons for use throughout the application.
- **web-vitals:** Collects and reports essential metrics for web performance.

## Features

1. **User Registration:**
   - Users can register with name, email, and password.
   - Password rules are enforced, and an activation email is sent.
2. **Email Activation:**
   - Users can activate their account via an email link.
   - Upon successful activation, users are redirected to their profile page.
3. **Login:**
   - Users can log in with valid credentials.
   - If the user is not active, they are prompted to activate their email.
4. **Logout:**
   - Authenticated users can log out.
   - Users are redirected to the login page upon logging out.
5. **Password Reset:**
   - Users can request a password reset by providing their email.
   - They receive an email with instructions to reset their password via a confirmation page.
6. **Profile Management:**
   - Authenticated users can change their name, password, and email.
   - Email changes require notification to the old email.

## Error Handling

A 404 page is displayed for all other routes.
