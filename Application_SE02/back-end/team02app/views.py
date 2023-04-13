from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import views
from rest_framework import permissions
from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from .serializers import *
import openai
from .settings import OPENAI_API_KEY
    


@ensure_csrf_cookie
def index(request):
    return render(request, 'index.html')
"""
@api_view(['GET'])
def users_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
"""

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
"""
class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
            context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
"""
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
        likes = "Wife Number Two"
        dislikes = "King of the Circus"

        gpt_response = query_gpt(genres, years, runtime, rating, likes, dislikes)
        parsed_results = parse_gpt_output(gpt_response)

        return JsonResponse(parsed_results, safe=False)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)

#Internal functions for creating/parsing GPT output
def query_gpt(genres, years, runtime, rating, likes, dislikes):

    prompt = (f"A table listing 10 movie recommendations based on the following preferences:\n\n"
              f"Genres: {genres}\n"
              f"Years: {years}\n"
              f"Runtimes: {runtime}\n"
              f"Age Ratings: {rating}\n"
              f"Liked movies: {likes}\n"
              f"Disliked movies: {dislikes}\n\n"
              f"Ensure that the movies fall within the specified preferences and that the movies are not in the list of liked or disliked movies.\n"
              f"| Movie Title | Year | Age Rating |\n"
              f"| ----------- | ---- | ---------- |")

    api_key = OPENAI_API_KEY

    openai.api_key = api_key
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
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
        movie_year = int(columns[1])
        age_rating = columns[2]

        # Query the database for the movie information
        try:
            movie = Movie.objects.get(title=movie_title, year=movie_year)
            year = movie.year
            runtime = movie.runtime
            #genres = [mg.genre.genre for mg in MovieGenre.objects.filter(movie=movie)]

            # Add the movie to the list
            movies.append({
                'movie_title': movie_title,
                'year': year,
                'runtime': runtime,
                'age_rating': age_rating,
                #'genres': genres
            })
        except Movie.DoesNotExist:
            print(f"Movie '{movie_title} {movie_year}' not found in the database.")


    return movies


