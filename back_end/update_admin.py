import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'event_management.settings')
django.setup()

from api.models import User

try:
    user = User.objects.get(username='anshikjain153')
    user.role = 'admin'
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print(f"Successfully updated role for user {user.username} to 'admin'")
except User.DoesNotExist:
    print("User anshikjain153 does not exist. Creating it...")
    user = User.objects.create_superuser('anshikjain153', 'anshikjain153@gmail.com', '123456')
    user.role = 'admin'
    user.save()
    print("Created admin user anshikjain153")
except Exception as e:
    print(f"An error occurred: {e}")
