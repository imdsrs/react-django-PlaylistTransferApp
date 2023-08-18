from django.urls import path
from . import views

urlpatterns = [
    path('TransferFromSpotify/<str:destinationValue>/<str:playlistId>/<str:accessTokenSpotify>/<str:accessTokenDestination>',
         views.getDataFromSpotify, name="Data from Spotify"),
    path('TransferFromDeezer/<str:destinationValue>/<str:playlistId>/<str:accessTokendeezer>/<str:accessTokenDestination>',
         views.getDataFromDeezer, name="Data from Deezer"),
    path('TransferFromYoutubeMusic/<str:destinationValue>/<str:playlistId>/<str:accessTokenYoutubeMusic>/<str:accessTokenDestination>',
         views.getDataFromYoutubeMusic, name="Data from Deezer"),
]
