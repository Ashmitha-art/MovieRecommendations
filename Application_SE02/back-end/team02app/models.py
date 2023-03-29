# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Genre(models.Model):
    genre = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'genre'


class Movie(models.Model):
    title = models.CharField(max_length=255)
    alt_title = models.CharField(max_length=255, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movie'


class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, models.DO_NOTHING)
    genre = models.ForeignKey(Genre, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_genre'


class User(models.Model):
    username = models.CharField(unique=True, max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'user'


class UserMovie(models.Model):
    movie = models.ForeignKey(Movie, models.DO_NOTHING)
    user = models.ForeignKey(User, models.DO_NOTHING)
    rating = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'user_movie'


class UserRec(models.Model):
    movie = models.ForeignKey(Movie, models.DO_NOTHING)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'user_rec'