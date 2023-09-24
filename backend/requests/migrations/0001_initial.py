# Generated by Django 4.2.5 on 2023-09-24 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Requests',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=250, unique=True)),
                ('start_address', models.CharField(max_length=1000)),
                ('end_address', models.CharField(max_length=1000)),
            ],
        ),
    ]
