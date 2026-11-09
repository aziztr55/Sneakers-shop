# Sneakers Shop

This is a sneakers e-commerce web application where users can browse sneakers by brand or category, view product details, manage their shopping cart, and place orders. The frontend is built with React and the backend is developed using Flask.

## Features
- **User Authentication**: Users can register and log in to their accounts.
- **Sneakers Catalog**: Users can browse sneakers, filter by brand (Adidas, Jordan, New Balance, Puma, Nike) or category (Lifestyle, Calcio), and search by name.
- **Shopping Cart Management**: Users can select their shoe size, add sneakers to their cart, and remove items.
- **Order Checkout**: Users can checkout their shopping cart and view their orders.

## Technologies Used
- **Frontend**: React, JavaScript, CSS
- **Backend**: Flask, Python, SQLite
- **Authentication**: Simple username/email authentication with password hashing

## Prerequisites
Before running the project, you need to have the following software installed:
- Node.js and npm (for managing frontend dependencies)
- Python 3.x (for running the backend)
- pip (for installing Python dependencies)
- Flask (for the backend API)
- SQLite (for the database)

## Getting Started

### Backend Setup
1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   I recommend using a virtual environment to manage your Python packages.

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Set environment variables (e.g., `JWT_SECRET_KEY` in the `.env` file) for the Flask app.

4. Run the Flask server:
   ```bash
   python run.py
   ```
   The backend will be available at `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the necessary frontend dependencies:
   ```bash
   npm install
   ```

3. Run the React app in development mode:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

## Build for Production
To build the frontend for production, run the following command in the `frontend` directory:
```bash
npm run build
```
This will create an optimized production build in the `build/` directory. You can then serve the static files using a web server or integrate it with the Flask backend.
If you do this, you can just use the `python run.py` command to run the backend and the frontend will be served by Flask.

## Folder Structure
- `backend/`: Contains the Flask backend code and database configurations.
- `frontend/`: Contains the React frontend code.
- `Images/`: Contains the product images for the sneakers.
- `requirements.txt`: Lists the dependencies for the backend.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

