# MFPaint Frontend

## Description
This repository contains the backend implementation for the Project Name project. It consists of various controllers for handling different entities such as artists, artworks, blog posts, and users. The backend is built using Node.js, Express.js, and MongoDB, with Firebase used for storage and authentication.

## Table of Contents
- [Setup](#setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Future Development](#future-development)

## Setup
To set up and run the backend locally, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone <repository_url>
    ```

2. **Install Dependencies:**
    ```bash
    cd project-name-backend
    npm install
    ```

3. **Set Environment Variables:**
    - Create a `.env` file in the root directory and add the following environment variables:
        ```plaintext
        PORT=3000
        MONGO_URI=<your_mongodb_connection_string>
        FIREBASE_API_KEY=<your_firebase_api_key>
        FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
        FIREBASE_PROJECT_ID=<your_firebase_project_id>
        FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
        FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
        FIREBASE_APP_ID=<your_firebase_app_id>
        ```

4. **Start the Server:**
    ```bash
    npm run dev
    ```
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## Future Development
I plan to continue developing this project and implementing the following features soon:

- **Better Styling:** Enhance the visual appeal and user experience of the website through improved styling using CSS frameworks like Bootstrap or Materialize CSS.
- **Cross-Referencing Artists with Their Artworks:** Create a relational database to associate each artwork with its respective artist, enabling seamless navigation and exploration of artists' portfolios.
- **User Comments on Blog Posts:** Introduce a commenting system where users can engage with blog posts by leaving comments, fostering community interaction and feedback.
- **Sorting Artworks and Artists:** Implement sorting functionality for artworks and artists based on various criteria such as size, price, year, alphabetical order, or recent uploads, providing users with customizable browsing options.
- **Video Attachment for Digital Artworks:** Allow artists to upload video attachments along with their digital artworks, enriching the presentation and showcasing dynamic aspects of their creations.
- **Different View Modes:** Offer users the flexibility to switch between different view modes (e.g., horizontal, cards, large) for browsing artworks and blog posts, catering to diverse preferences and viewing experiences.

Stay tuned for updates as I work on integrating these features into the project!