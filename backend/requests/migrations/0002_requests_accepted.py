# Generated by Django 4.2.5 on 2023-09-24 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='requests',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
    ]
