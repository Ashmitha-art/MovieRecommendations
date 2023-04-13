from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from .serializers import *
import openai
from .settings import OPENAI_API_KEY
    


@ensure_csrf_cookie
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

@api_view(['POST'])
@csrf_exempt
#@permission_classes([IsAuthenticated])
def get_movie_recommendations(request):
    if request.method == 'POST':
        data = request.data
        genres = data['genres']
        years = data['years']
        runtime = data['runtime']
        rating = data['rating']
        #user_id = request.user.id
        #likes = UserMovie.objects.filter(user_id=user_id, rating=1).select_related('movie').values_list('movie__title', flat=True).distinct()
        #dislikes = UserMovie.objects.filter(user_id=user_id, rating=0).select_related('movie').values_list('movie__title', flat=True).distinct()
        likes = "The Matrix"
        dislikes = "Beautiful Mind"

        gpt_response = query_gpt(genres, years, runtime, rating, likes, dislikes)
        parsed_results = parse_gpt_output(gpt_response)

        return JsonResponse(parsed_results, safe=False)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)

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
              f"| Movie Title | Age Rating |\n"
              f"| ----------- | ---------- |")

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

def parse_gpt_output(gpt_output):
    # Split the response into lines
    lines = gpt_output.strip().split('\n')

    # Extract the table rows by filtering lines starting with '|'
    table_rows = [line.strip() for line in lines if line.startswith('|')]

    # Parse the table rows and store the movie information in a list
    movies = []
            
    for row in table_rows[1:]:  # Skip the header row
        # Split the row into columns and remove the '|' separator
        columns = [col.strip() for col in row.split('|') if col.strip()]

        # Extract movie title and age rating from the columns
        movie_title = columns[0]
        age_rating = columns[1]

        # Query the database for the movie information
        """ try:
            movie = Movie.objects.get(title=movie_title)
            year = movie.year
            runtime = movie.runtime
            genres = [mg.genre.genre for mg in MovieGenre.objects.filter(movie=movie)]

            # Add the movie to the list
            movies.append({
                'movie_title': movie_title,
                'year': year,
                'runtime': runtime,
                'age_rating': age_rating,
                'genres': genres
            })
        except Movie.DoesNotExist:
            print(f"Movie '{movie_title}' not found in the database.") """
        movies.append({
            'movie_title': movie_title,
            'age_rating': age_rating
            })

    return movies


