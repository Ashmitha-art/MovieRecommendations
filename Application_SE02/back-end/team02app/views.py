from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import views
from django.db.models import F
from rest_framework import permissions
from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.db.models import Q
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from knox.models import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
import openai
from .settings import OPENAI_API_KEY
    


#@ensure_csrf_cookie
def index(request):
    return render(request, 'index.html')

#@ensure_csrf_cookie
def react(request, path):
    return render(request, 'index.html')

@api_view(['GET'])
def movies_list(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def usermovies_list_deprecated(request):
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

class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

@api_view(['POST'])
@csrf_exempt
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_movie_recommendations(request):
    if request.method == 'POST':
        data = request.data
        genres = data['genre']
        years = data['year']
        runtime = data['runtime']
        rating = data['age']
        user = request.user
        likes = UserMovie.objects.filter(user_id=user.id, rating=1).select_related('movie').values_list('movie__title', flat=True).distinct()
        dislikes = UserMovie.objects.filter(user_id=user.id, rating=0).select_related('movie').values_list('movie__title', flat=True).distinct()
        #likes = "Wife Number Two"
        #dislikes = "King of the Circus"

        gpt_response = query_gpt(genres, years, runtime, rating, likes, dislikes)
        parsed_results = parse_gpt_output(gpt_response, user)
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

def parse_gpt_output(gpt_output, user):
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
            movie = Movie.objects.get(Q(title=movie_title) | Q(alt_title=movie_title), year=movie_year)
            year = movie.year
            runtime = movie.runtime
            genres = [mg.genre.genre for mg in MovieGenre.objects.filter(movie=movie)]
            movie_id = movie.id

            # Add the movie to the list
            movies.append({
                'movie_title': movie_title,
                'year': year,
                'runtime': runtime,
                'age_rating': age_rating,
                'genres': genres,
                'movie_id': movie_id
            })

            #Create user rec entry and save to database
            user_rec = UserRec(user=user, movie=movie)
            user_rec.save()
        except Movie.DoesNotExist:
            print(f"Movie '{movie_title} {movie_year}' not found in the database.")


    return movies

#Helper function for updating user movie ratings with like or dislike
def update_user_movie_rating(user, movie_id, rating):
    # Create or update the UserMovie entry
    user_movie, created = UserMovie.objects.update_or_create(
        user=user, movie_id=movie_id, defaults={'rating': rating}
    )

    # Remove the corresponding entry in the UserRec table
    UserRec.objects.filter(user=user, movie_id=movie_id).delete()

    return JsonResponse({"status": "success"}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_movie(request, movie_id):
    return update_user_movie_rating(request.user, movie_id, 1)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dislike_movie(request, movie_id):
    return update_user_movie_rating(request.user, movie_id, 0)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def movielikesdislikes_list(request):
    movieliked = UserMovie.objects.filter(user_id=request.user.id, rating=1).select_related('movie').values_list('movie__title', flat=True).distinct()
    moviedisliked = UserMovie.objects.filter(user_id=request.user.id, rating=0).select_related('movie').values_list('movie__title', flat=True).distinct()

    response = {'likedMovies': movieliked, 'dislikedMovies': moviedisliked}

    return Response(response)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def displayMovieRec(request):
    try:
        movie_ids = UserRec.objects.filter(user_id=request.user.id).select_related('movie').values_list('movie__id', flat=True).distinct()
        movie_links = UserRec.objects.filter(movie_id__in=movie_ids).values('movie_link', 'movie_id')

        movie_details = MovieGenre.objects.filter(movie_id__in=movie_ids).select_related('genre').select_related('movie').\
            values('movie_id', genres=F('genre__genre'),
                    title=F('movie__title'), year=F('movie__year'),
                   runtime=F('movie__runtime'))

        movie_recs = []

        for each_movie in movie_details:
            d = next(filter(lambda d: d.get('movie_id') == each_movie['movie_id'], movie_recs), None)
            movie_link = next(filter(lambda d: d.get('movie_id') == each_movie['movie_id'], movie_links), None)
            if not d:
                each_movie['genres'] = [each_movie['genres']]
                each_movie['movie_link'] = movie_link['movie_link']
                movie_recs.append(each_movie)
            else:
                d['genres'].append(each_movie['genres'])

        response = {'movieRecommendations': movie_recs}

    except Exception as e:
        print(e)

    return Response(response)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def usermovie_list(request):
    usermovies = UserMovie.objects.filter(user_id=request.user.id).select_related('movie').values_list('movie__title', 'movie__year', 'movie__runtime').distinct()
    rating = UserMovie.objects.filter(user_id=request.user.id).values_list('rating', flat=True)
    
    return Response({
        "movie"     :   usermovies,
        "rating"    :   rating
    })

