# 🩺 HealthMate

**Elixir Ai Health App Demo** is a full-stack AI-powered health assistant app that empowers users to manage their well-being through smart symptom analysis, medication reminders, and nutrition tracking.

Built using:
- 📱 React Native (Frontend)
- 🔧 Ruby on Rails API (Backend)
- 🧠 OpenAI Integration (Symptom diagnosis)
- 🔐 Devise + JWT (Authentication)
- 🧬 Face ID (Biometric auth)

---

## 🚀 Features

- ✅ **AI Symptom Checker**  
  Integrated with OpenAI to provide real-time symptom analysis and health recommendations based on user inputs.

- 🔔 **Medication Reminders**  
  Users can create, edit, and delete reminders for their medications. Backed by a Rails API with dynamic endpoint routing.

- 🥦 **Nutrition Tracker**  
  Search foods and nutrients using an intelligent search component that communicates with the backend for fast, relevant results.

- 🔒 **Biometric & Secure Login**  
  Face ID support using React Native's local authentication library and token-based sessions with Devise + JWT.


---

## 🛠 Tech Stack

| Layer        | Tech                                                                 |
|--------------|----------------------------------------------------------------------|
| Frontend     | React Native (Expo), NativeWind (Tailwind CSS for React Native)     |
| Backend      | Ruby on Rails API, PostgreSQL, Devise, JWT                           |
| AI Services  | OpenAI API                                                           |
| Auth         | Face ID (Expo Local Authentication), Secure Tokens                   |
| State Mgmt   | React Context API (or Redux Toolkit if scaled)                       |
| API Comm     | Fetch                                                                |

---

## 🧪 Installation (Development)

### 🧩 Prerequisites

- Node.js ≥ 18.x  
- Ruby ≥ 3.2  
- Rails ≥ 7.x  
- PostgreSQL  
- Expo CLI  
- OpenAI API Key

---

### 🔧 Backend Setup (Rails)

```bash
# Clone the repo
git clone https://github.com/issahben/elixirapi.git
cd elixirapi

# Install dependencies
bundle install

# Setup DB
rails db:create db:migrate

# Set credentials (OpenAI, JWT secrets)
EDITOR="code --wait" bin/rails credentials:edit

# Start the server
rails s
