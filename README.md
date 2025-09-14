# Regex Match & Replacement Web Application

A full-stack web application that allows users to upload CSV or Excel files, describe a pattern in natural language, automatically convert it to a regular expression (regex) using an LLM (OpenAI), and apply the described pattern replacements.

The processed data is then displayed in a clean, interactive UI.

---

## **Features**
- **CSV/Excel File Upload**: Supports both CSV and Excel files.
- **Natural Language to Regex Conversion**:
  - Users describe what to find in natural language.
  - The LLM generates a regex pattern and replacement string automatically.
- **Regex Replacement Engine**:
  - Replace data in the specified column using the generated regex.
- **Interactive UI**:
  - Drag-and-drop upload.
  - Data table preview with pagination.
  - Inline success/error alerts.
- **Tech Stack**:
  - **Backend:** Django, Django REST Framework, Pandas
  - **Frontend:** React + Vite + Ant Design
  - **LLM:** OpenAI GPT model for regex generation

---

## Setup Instructions

### **Prerequisites**
The following must be installed:
- [Node.js]
- [Python]
- [pip]
- [virtualenv]

An **OpenAI API key**is also needed for LLM functionality:
- Sign up at OpenAI and generate an API key under **API Keys**.

---

### **Backend Setup (Django)**

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```
2. **Create and activate virtual environment:**
    ```bash 
    python -m venv venv
    source venv/bin/activate
    ```
3. **Install dependencies:**
    ```bash 
    pip install -r requirements.txt
    ```
4. **Set up environment variables in .env:**
    ```bash 
    DEBUG = True
    OPENAI_API_KEY=openai_api_key_here
    ```
5. **Run database migrations::**
    ```bash 
    python manage.py migrate
    ```
6. **Start the Django server:**
    ```bash 
    python manage.py runserver
    ```


### **Frontend Setup (React + Vite)**

1. **Navigate to the backend folder:**
   ```bash
   cd frontend
   ```
2. **Install frontend dependencies:**
    ```bash 
    npm install
    ```
3. **Set up environment variable in .env:**
    ```bash 
    VITE_BASE_URL=http://127.0.0.1:8000/
4. **Start the Vite server:**
    ```bash 
    npm run dev
    ```

---


### **Running the Application**
Once both servers are running:

Step 1: Open the frontend in your browser at http://localhost:5173.

Step 2: Upload a CSV or Excel file.

Step 3: Enter a natural language prompt, e.g.:
```
Find email addresses in the Email column and replace them with REDACTED
```

Step 4: View the processed data in the table preview.

### **Video Demo **
https://youtu.be/aCkT4IREEpQ