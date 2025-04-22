# Confessions App

A real-time, anonymous confession platform where users can share their thoughts, react with emojis, and comment supportively. Built with a modern full-stack architecture, featuring a responsive frontend, a robust backend, and real-time updates powered by Socket.io.

## Features

- **Anonymous Confessions**: Post confessions in categories like General, Mental Health, or Love.
- **Real-Time Updates**: New confessions, reactions (❤️, 🤗, 🙏), and comments appear instantly for all users without refreshing.
- **Responsive UI**: Grid-based layout with a pastel aesthetic, hover animations, and a fixed-size modal for details.
- **Interactive Elements**: Add supportive comments, navigate confessions with Previous/Next buttons, and react with emojis.
- **Sentiment Analysis**: Automatically analyzes confession sentiment using AWS Comprehend (backend).

## Tech Stack

### Frontend
- **React**: Component-based UI with hooks for state management.
- **Axios**: HTTP requests for API communication.
- **Socket.io-client**: Real-time updates for confessions, reactions, and comments.
- **CSS**: Custom styles with pastel colors, animations, and responsive design.

### Backend
- **Node.js + Express**: RESTful API for handling confessions, reactions, and comments.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for storing confessions and comments.
- **Mongoose**: ODM for MongoDB schema management.
- **Socket.io**: Real-time bidirectional communication.
- **AWS SDK**: Sentiment analysis via AWS Comprehend.

### Tools
- **Git**: Version control.
- **NPM**: Package management.
- **dotenv**: Environment variable configuration.

