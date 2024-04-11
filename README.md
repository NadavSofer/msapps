# Node Server and React Client Project

## Overview
This project consists of a Node.js server and a React client. The Node server retrieves data from an external API and sends it to the React client. The client excepts the data and saves it into a redux toolkit store. The client allows users to paginate through the data, select a subject, and view detailed information about each item in a modal.

## Features
- **Pagination**: Users can navigate through multiple pages of data.
- **Subject Selection**: Users can select a specific subject to filter the data.
- **Grid of Images**: The client displays the data in a 3x3 grid of images.
- **Modal with Data**: Clicking on an image opens a modal displaying detailed information about the selected item.

## Technologies Used
- **Node.js**: Backend server environment.
- **Express.js**: Web application framework for Node.js, used to handle HTTP requests and responses.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React**: Frontend library for building user interfaces.
- **API (External)**: The Node server retrieves data from an external API.
- **React Modal**: Library for displaying modal dialogs in React applications.
- **Redux**: State management library for JavaScript applications.
- **Tailwind CSS**: Utility-first CSS framework for styling web applications.

## Setup Instructions
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for both the server and the client:
   ```
   npm install
   cd ../client
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Start the client:
   ```
   cd ../client
   npm run start
   ```
6. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Usage
- Upon opening the application in the browser, users will see a grid of images fetched from the API.
- Users can navigate through different image sets using pagination buttons.
- Users can select a subject from a Modal to set the category of the displayed data.
- Clicking on an image opens a modal displaying detailed information about the selected item.

## Acknowledgements
- [React Modal](https://github.com/reactjs/react-modal)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [API Documentation (if applicable)](link_to_api_docs)
- [Redux](https://redux-toolkit.js.org)
- [Tailwind](https://tailwindcss.com/)