"""back-end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name = 'index'),
    path('api/movies/', views.movies_list, name = 'movies_list'),
    path('api/usermovies/', views.usermovies_list, name = 'usermovies_list'),
    path('api/userrecs/', views.userrecs_list, name = 'userrecs_list'),
    path('api/genres/', views.genres_list, name = 'genres_list'),
    path('api/moviegenres/', views.moviegenres_list, name = 'moviegenres_list'),
    path('api/get_movie_recommendations/', views.get_movie_recommendations, name = 'get_movie_recommendations')
]
