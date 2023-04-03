from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from .serializers import *
import openai
from settings import OPENAI_API_KEY


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

#Internal functions for creating/parsing GPT output
def query_gpt(genres, years, runtime, rating, likes, dislikes):
    genres_str = ', '.join(genres)
    years_str = ', '.join(years)
    runtimes_str = ', '.join(runtime)
    ratings_str = ', '.join(rating)
    likes_str = ', '.join(likes)
    dislikes_str = ', '.join(dislikes)

    prompt = (f"A table listing 10 movie recommendations based on the following preferences:\n\n"
              f"Genres: {genres_str}\n"
              f"Years: {years_str}\n"
              f"Runtimes: {runtimes_str}\n"
              f"Age Ratings: {ratings_str}\n"
              f"Liked movies: {likes_str}\n"
              f"Disliked movies: {dislikes_str}\n\n"
              f"| Movie Title | Year | Age Rating |\n"
              f"| ----------- | ---- | ---------- |")

    api_key = OPENAI_API_KEY

    openai.api_key = api_key
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.8,
        max_tokens=1500,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0)

    return response.choices[0].text

