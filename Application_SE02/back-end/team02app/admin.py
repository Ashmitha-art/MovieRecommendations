from django.contrib import admin
from .models import *

admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(MovieGenre)
admin.site.register(UserMovie)
admin.site.register(UserRec)