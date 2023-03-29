from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from .serializers import *


def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def users_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def movies_list(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def usermovies_list(request):
    usermovies = UserMovie.objects.all()
    serializer = UserMovieSerializer(usermovies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def userrecs_list(request):
    userrecs = UserRec.objects.all()
    serializer = UserRecSerializer(userrecs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def genres_list(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def moviegenres_list(request):
    moviegenres = MovieGenre.objects.all()
    serializer = MovieGenreSerializer(moviegenres, many=True)
    return Response(serializer.data)

