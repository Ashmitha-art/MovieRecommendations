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
from knox import views as knox_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name = 'index'),

    path('api/register/', views.RegisterAPI.as_view(), name='register'),
    path('api/login/', views.LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),

    path('api/likeAnddislike/', views.movielikesdislikes_list, name='movielikesdislikes_list'),
    path('api/get_movie_recommendations/', views.get_movie_recommendations, name = 'get_movie_recommendations'),

    path('api/movies/<int:movie_id>/like/', views.like_movie, name='like_movie'),
    path('api/movies/<int:movie_id>/dislike/', views.dislike_movie, name='dislike_movie'),
    path('api/movies/<int:movie_id>/unrate/', views.remove_rating, name='remove_rating'),

    path('api/list_recommendations/', views.displayMovieRec, name='display_movie_recs'),
    path('api/ratinghistory/', views.usermovie_list, name='user'),

    path('<path:path>', views.react, name='catch-all'),
]
