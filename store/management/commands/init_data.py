from django.core.management.base import BaseCommand
from store.models import Category, Product
from django.core.files import File
from pathlib import Path
import os

class Command(BaseCommand):
    help = 'Initialize product data'

    def handle(self, *args, **kwargs):
        # Create POS Systems category
        pos_category, created = Category.objects.get_or_create(
            name='POS Systems',
            slug='pos-systems',
            description='Advanced Point of Sale Systems for modern businesses'
        )
        
        # Create Mobile POS product
        mobile_pos, created = Product.objects.get_or_create(
            category=pos_category,
            name='Mobile POS Terminal',
            slug='mobile-pos-terminal',
            defaults={
                'description': '''Advanced Mobile POS Terminal with dual screens and secure payment processing.
                Features:
                - Dual screen display
                - Secure payment processing
                - Android-based system
                - Long-lasting battery
                - Compact and portable design
                - Built-in camera for scanning
                - Wireless connectivity
                - EMV chip card reader
                ''',
                'price': 599.99,
                'stock': 50,
                'available': True,
                'featured': True,
                'specifications': {
                    'OS': 'Android 11',
                    'Screen': '5.5" HD Display',
                    'Processor': 'Quad-core 2.0 GHz',
                    'Memory': '4GB RAM',
                    'Storage': '64GB',
                    'Battery': '5000mAh',
                    'Connectivity': 'WiFi, 4G LTE, Bluetooth 5.0',
                    'Card Reader': 'EMV, NFC, MSR',
                    'Camera': '8MP with autofocus',
                    'Dimensions': '7.5" x 3.2" x 0.8"'
                }
            }
        )
        
        self.stdout.write(self.style.SUCCESS('Successfully initialized product data')) 