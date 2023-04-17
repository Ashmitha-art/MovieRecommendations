from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import views
from rest_framework import permissions
from django.shortcuts import render
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from knox.models import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView



def index(request):
    return render(request, 'index.html')

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

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)