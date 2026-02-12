from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Create specific admin user'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        email = 'anshikjain153@gmail.com'
        password = '123456'
        username = 'anshikjain153'  # Using part of email as username since it is required

        if not User.objects.filter(email=email).exists():
            User.objects.create_superuser(username=username, email=email, password=password, role='admin')
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin "{email}"'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin "{email}" already exists'))
