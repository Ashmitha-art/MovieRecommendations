from rest_framework import serializers
from django.contrib.auth import authenticate
# from django.contrib.auth.models import User
from .models import Movie, UserMovie, UserRec, Genre, MovieGenre
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

"""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
"""
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    #password = serializers.CharField(
    #    write_only=True,
    #    required=True,
    #    validators=[validate_password]
    #)

    #password2 = serializers.CharField(
    #    write_only=True, required=True
    #)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user = User.objects.create_user(username, email, password)
        return user
    
"""
class LoginSerializer(serializers.Serializer):
    
    This serializer defines two fields for authentication:
        * username
        * password
    It will try to authenticate the user with when validated
    

    username = serializers.CharField(label="Username", write_only=True)
    password = serializers.CharField(label="Password", write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)

            if not user:
                msg = 'Username or password is incorrect'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both username and password are required'
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs
"""