# Dr. Blunt - Medical Symptom Prediction and Guidance Platform

Dr. Blunt is an AI-powered web application designed to help users quickly understand potential health issues based on their symptoms. By entering a description of symptoms, users receive a list of possible diagnoses along with confidence levels. Dr. Blunt aims to provide immediate health insights, encourage early awareness, and guide users toward informed health decisions.

## Features

- **Symptom Analysis**: Users can input symptoms in natural language, and Dr. Blunt will analyze the text to predict possible health conditions.
- **Confidence Scoring**: Each possible diagnosis is presented with a confidence score, allowing users to gauge the likelihood of each potential condition.
- **Interactive User Interface**: A clean and responsive design with interactive elements, including a disease result carousel and smooth animations, makes for a user-friendly experience.
- **Profile Management**: Users can log in to view and manage their profile information, including username and email. A quick logout option is available to ensure secure access.

## Project Structure

- **Frontend**: Developed in React using Vite, the frontend leverages `framer-motion` for animations, `lucide-react` for icons, UI components from shadcnUI for a polished look and feel.
- **Backend**: The application communicates with an ML model server API, which processes the symptom data to return possible conditions and confidence scores.
- **Routing & Navigation**: Managed with React Router, allowing for smooth page transitions, and a straightforward route structure.

## Technology Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, React Router, Vite
- **Backend**: DjangoRestFramework serving the machine learning prediction model API, JWT
- **Machine Learning Model**: Trained model for text-based disease prediction, PyTorch
- **UI Components frin Shadcn**: Customizable components for inputs, buttons, and cards, tailored to the medical theme

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/DrBlunt.git
   ```
2. **Follow these commands to configure the frontend**
   ```
   cd frontend
   npm install
   npm run dev
   ```
4. **Follow these commands to configure the backend**
```
   cd ..
   cd backend
   pip install -r requirements.txt
   cd symtodis
   python3 manage.py runserver
   ``
