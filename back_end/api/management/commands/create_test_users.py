from django.core.management.base import BaseCommand
from api.models import User

class Command(BaseCommand):
    help = 'Create test users for development'

    def handle(self, *args, **kwargs):
        # Create admin user
        if not User.objects.filter(username='admin').exists():
            User.objects.create_user(
                username='admin',
                email='admin@example.com',
                password='admin123',
                role='admin',
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(self.style.SUCCESS('Created admin user: admin/admin123'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists'))

        # Create vendor user
        if not User.objects.filter(username='vendor1').exists():
            User.objects.create_user(
                username='vendor1',
                email='vendor1@example.com',
                password='vendor123',
                role='vendor',
                first_name='Vendor',
                last_name='One',
                contact_info='123 Vendor Street, City'
            )
            self.stdout.write(self.style.SUCCESS('Created vendor user: vendor1/vendor123'))
        else:
            self.stdout.write(self.style.WARNING('Vendor user already exists'))

        # Create regular user
        if not User.objects.filter(username='user1').exists():
            User.objects.create_user(
                username='user1',
                email='user1@example.com',
                password='user123',
                role='user',
                first_name='Regular',
                last_name='User',
                contact_info='456 User Avenue, City'
            )
            self.stdout.write(self.style.SUCCESS('Created regular user: user1/user123'))
        else:
            self.stdout.write(self.style.WARNING('Regular user already exists'))

        self.stdout.write(self.style.SUCCESS('\nTest users created successfully!'))
        self.stdout.write(self.style.SUCCESS('You can now login with:'))
        self.stdout.write('  Admin: admin/admin123')
        self.stdout.write('  Vendor: vendor1/vendor123')
        self.stdout.write('  User: user1/user123')
