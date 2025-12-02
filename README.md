# ShasthoShetu

**Intelligent Medical Supply Forecasting & Emergency Support Platform**

ShasthoShetu ("Health Bridge") is an integrated digital platform designed to bridge gaps in the healthcare supply chain in Bangladesh. It provides predictive medical supply management, real-time stock visibility, emergency assistance, and an inter-hospital communication ecosystem.

## Features

- **Shortage Prediction Engine**: AI-driven forecasting to predict stockouts of essential medicines.
- **Real-Time Stock Visibility**: Track inventory levels across hospitals and pharmacies.
- **Emergency Assistance Module**: Broadcast urgent requirements (e.g., blood, oxygen) to nearby facilities.
- **Redistribution Marketplace**: Share or sell surplus inventory to reduce wastage.
- **Analytics Dashboard**: Role-based dashboard for hospitals, suppliers, and government authorities.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, BCrypt

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/shasthoshetu.git
    cd shasthoshetu
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    # Create a .env file with PORT, MONGO_URI, and JWT_SECRET
    npm run dev
    ```

3.  **Frontend Setup:**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Access the App:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/client`: Next.js frontend application.
- `/server`: Node.js/Express backend API.

## System Architecture

```mermaid
graph TD
    subgraph Client [Next.js Frontend]
        UI[User Interface]
        AuthPage[Login/Signup]
        Dash[Dashboard]
        InvPage[Inventory Page]
        EmerPage[Emergency Page]
        MarketPage[Marketplace Page]
        
        UI --> AuthPage
        UI --> Dash
        Dash --> InvPage
        Dash --> EmerPage
        Dash --> MarketPage
    end

    subgraph Server [Node.js/Express Backend]
        API[REST API]
        AuthCtrl[Auth Controller]
        InvCtrl[Inventory Controller]
        EmerCtrl[Emergency Controller]
        MarketCtrl[Marketplace Controller]
        PredCtrl[Prediction Controller]
        
        API --> AuthCtrl
        API --> InvCtrl
        API --> EmerCtrl
        API --> MarketCtrl
        API --> PredCtrl
    end

    subgraph Database [MongoDB]
        UsersColl[(Users)]
        InvColl[(Inventory)]
        EmerColl[(Emergencies)]
        MarketColl[(Marketplace)]
    end

    Client -- HTTP Requests --> Server
    AuthCtrl --> UsersColl
    InvCtrl --> InvColl
    EmerCtrl --> EmerColl
    MarketCtrl --> MarketColl
    PredCtrl --> InvColl
```

## Database Schema

```mermaid
erDiagram
    USER ||--o{ INVENTORY : manages
    USER ||--o{ EMERGENCY : raises
    USER ||--o{ MARKETPLACE_ITEM : sells
    
    USER {
        ObjectId _id
        String name
        String email
        String password
        String role
        String organizationName
        Object location
        String contactNumber
    }

    INVENTORY {
        ObjectId _id
        ObjectId user
        String name
        String genericName
        String category
        Number quantity
        String unit
        Date expiryDate
        String batchNumber
        String supplier
        Number threshold
    }

    EMERGENCY {
        ObjectId _id
        ObjectId user
        String type
        String description
        String status
        Object location
        String contactNumber
    }

    MARKETPLACE_ITEM {
        ObjectId _id
        ObjectId seller
        String name
        Number quantity
        String unit
        Number price
        Date expiryDate
        String description
        String status
    }
```

## License

This project is licensed under the MIT License.
