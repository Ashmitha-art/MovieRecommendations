from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Movie, UserMovie, UserRec, Genre, MovieGenre, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'alt_title', 'year', 'runtime')

class UserMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMovie
        fields = ('id', 'movie_id', 'user_id', 'rating')

class UserRecSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRec
        fields = ('id', 'movie_id', 'user_id')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'genre')

class MovieGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieGenre
        fields = ('id', 'movie_id', 'genre_id')