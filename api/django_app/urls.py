from django.urls import path
from . import views

urlpatterns = [
    # path('google/', GoogleSocialAuthView.as_view()),
    path('TransferFromSpotify/<str:destinationValue>/<str:playlistId>/<str:accessTokenSpotify>/<str:accessTokenDestination>',
         views.getRoutes, name="routes"),
]
