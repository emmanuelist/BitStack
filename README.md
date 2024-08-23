# BitStack

BitStack is a decentralized social media platform built on the Stacks blockchain, leveraging Clarity smart contracts, IPFS for media storage, and a Node.js/Express backend with MongoDB for additional data management. This project aims to provide a secure, decentralized, and censorship-resistant platform for social interactions.

## Table of Contents

- [BitStack](#bitstack)
	- [Table of Contents](#table-of-contents)
	- [Features](#features)
	- [Project Structure](#project-structure)
	- [Prerequisites](#prerequisites)
	- [Getting Started](#getting-started)
		- [1. Clone the Repository](#1-clone-the-repository)
		- [2. Set Up Clarity Smart Contracts](#2-set-up-clarity-smart-contracts)
		- [3. Set Up the Backend](#3-set-up-the-backend)
		- [4. Configure Environment Variables](#4-configure-environment-variables)
		- [5. Start the Application](#5-start-the-application)
	- [Smart Contracts Overview](#smart-contracts-overview)
	- [Backend Overview](#backend-overview)
		- [Models](#models)
		- [Controllers](#controllers)
		- [Services](#services)
	- [Testing](#testing)
	- [Deployment](#deployment)
	- [Contributing](#contributing)
	- [License](#license)
	- [Contact](#contact)

## Features

- **Decentralized User Profiles**: Create and manage user profiles securely on the Stacks blockchain.
- **Social Interactions**: Post content, follow other users, like, and comment on posts.
- **IPFS Integration**: Decentralized storage of media files.
- **Secure & Censorship-Resistant**: Built on blockchain technology, ensuring data integrity and resistance to censorship.
- **Scalable Architecture**: Modular and extensible design with microservices.

## Project Structure

```
bitstack/
├── smart-contracts/
│   ├── contracts/
│   │   ├── user-profile.clar
│   │   ├── post.clar
│   │   ├── follow.clar
│   │   ├── like.clar
│   │   └── comment.clar
│   ├── tests/
│   │   ├── user-profile_test.ts
│   │   ├── post_test.ts
│   │   ├── follow_test.ts
│   │   ├── like_test.ts
│   │   └── comment_test.ts
│   └── Clarinet.toml
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── stacks.ts
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   ├── postController.ts
│   │   │   ├── followController.ts
│   │   │   ├── likeController.ts
│   │   │   └── commentController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Post.ts
│   │   │   ├── Follow.ts
│   │   │   ├── Like.ts
│   │   │   └── Comment.ts
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   │   ├── postRoutes.ts
│   │   │   ├── followRoutes.ts
│   │   │   ├── likeRoutes.ts
│   │   │   └── commentRoutes.ts
│   │   ├── services/
│   │   │   ├── stacksService.ts
│   │   │   └── ipfsService.ts
│   │   ├── utils/
│   │   │   ├── errorHandler.ts
│   │   │   └── validator.ts
│   │   └── app.ts
│   ├── tests/
│   │   ├── integration/
│   │   └── unit/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher
- **MongoDB**: Running locally or accessible remotely
- **Clarinet**: Installed for developing and testing Clarity smart contracts
- **Stacks Wallet**: For interacting with the Stacks blockchain

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/emmanuelist/bitstack.git
cd bitstack
```

### 2. Set Up Clarity Smart Contracts

```bash
cd smart-contracts
clarinet new
```

- Write your Clarity contracts inside the `contracts` directory.
- Run `clarinet test` to execute tests.

### 3. Set Up the Backend

Navigate to the backend directory and install dependencies:

```bash
cd ../backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory and populate it with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bitstack
STACKS_API_URL=https://stacks-node-api.testnet.stacks.co
NETWORK_TYPE=testnet
CONTRACT_ADDRESS=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTRACT_NAME=bitstack-core
STACKS_PRIVATE_KEY=your_private_key_here
```

### 5. Start the Application

```bash
npm run dev
```

The backend will start on `http://localhost:3000`.

## Smart Contracts Overview

The smart contracts are written in Clarity, a Lisp-like language designed specifically for the Stacks blockchain. Key contracts include:

- **user-profile.clar**: Manages user profiles on the blockchain.
- **post.clar**: Handles the creation and management of posts.
- **follow.clar**: Manages the following/followers relationship between users.
- **like.clar**: Allows users to like posts.
- **comment.clar**: Manages comments on posts.

Contracts are located in the `smart-contracts/contracts` directory. Tests for each contract are placed in the `smart-contracts/tests` directory.

## Backend Overview

The backend is a Node.js application using TypeScript and Express, connecting to MongoDB for additional data storage. Key components include:

### Models

- **User.ts**: Represents users in the MongoDB database.
- **Post.ts**: Represents posts in the MongoDB database.
- **Follow.ts**: Represents follow relationships.
- **Like.ts**: Represents likes on posts.
- **Comment.ts**: Represents comments on posts.

### Controllers

- **userController.ts**: Handles user registration, profile management, etc.
- **postController.ts**: Manages post creation, updates, and retrieval.
- **followController.ts**: Manages follow/unfollow actions.
- **likeController.ts**: Handles likes on posts.
- **commentController.ts**: Manages comments on posts.

### Services

- **stacksService.ts**: Contains functions to interact with the Stacks blockchain.
- **ipfsService.ts**: (Planned) For integrating with IPFS for decentralized media storage.

## Testing

To run tests for the backend, you can use the following commands:

```bash
npm run test
```

Tests are located in the `backend/tests` directory, divided into `unit` and `integration` tests.

To run smart contract tests:

```bash
cd smart-contracts
clarinet test
```

## Deployment

To deploy the backend:

1. Build the backend:

   ```bash
   npm run build
   ```

2. Deploy using a cloud service like AWS, DigitalOcean, or Heroku.

For deploying smart contracts, follow Stacks blockchain documentation to deploy on mainnet/testnet.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

Please ensure your code follows best practices and is well-documented.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or support, feel free to contact the project maintainers:

- **GitHub Issues**: Submit an issue
- **Email**: emmanuel.paul75@yahoo.com

---

This README provides all the necessary details for setting up, developing, and contributing to the BitStack project. It ensures that new developers can quickly get up to speed and begin contributing effectively. If you need further customization or additional sections, feel free to ask!
