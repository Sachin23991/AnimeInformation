from django.db import migrations

class Migration(migrations.Migration):
    # Merge migration to resolve divergent heads 0003 and 0007
    dependencies = [
        ('anime', '0003_anime_video_url'),
        ('anime', '0007_anime_age_rating_anime_alternative_titles_and_more'),
    ]

    operations = [
        # No-op: this migration just records that the two branches are merged.
    ]
