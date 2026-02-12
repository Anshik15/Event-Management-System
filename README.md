# Event Management System

A full-stack Event Management System built with Django (Backend) and React (Frontend).

## Features

### Role-Based Access Control
- **Admin**: User/Vendor management, Membership management, Reports, Transactions
- **Vendor**: Item management, Product status, Transactions
- **User**: Browse vendors, Shopping cart, Checkout, Order tracking

### Tech Stack
- **Backend**: Django, Django REST Framework, SQLite
- **Frontend**: React, React Router, Axios
- **Authentication**: Session-based authentication

## Quick Start

### Backend Setup

```bash
cd back_end
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Important**: After creating superuser, set role to 'admin':
```bash
python manage.py shell
```
```python
from api.models import User
user = User.objects.get(username='your_username')
user.role = 'admin'
user.save()
exit()
```

### Frontend Setup

```bash
cd front_end
npm install
npm start
```

## Default Flow
START → INDEX → LOGIN → DASHBOARD (based on role)

## Documentation
See `walkthrough.md` for detailed setup and testing instructions.
