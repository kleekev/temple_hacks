# Generated by Django 4.2.5 on 2023-09-24 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0003_alter_requests_accepted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requests',
            name='accepted',
            field=models.BooleanField(null=True),
        ),
    ]
