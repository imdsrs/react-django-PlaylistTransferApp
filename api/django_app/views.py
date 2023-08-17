from rest_framework.generics import GenericAPIView
from .serializers import *
from .helper import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

import requests
import json
import time
import datetime
#use this library to match all things involving Youtube Music 
from difflib import SequenceMatcher
from fuzzywuzzy import fuzz

@api_view(["GET"])
def getDataFromSpotify(request, destinationValue, playlistId, accessTokenSpotify, accessTokenDestination):    
    # step 1, get Track from Spotify's Playlist 
    SpotifyURL = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks"
    Spotifyheaders = {
        'Authorization': 'Bearer ' + accessTokenSpotify
    }

    SpotifyResponse = requests.request(
        "GET", SpotifyURL, headers=Spotifyheaders)
    SpotifyResponse = SpotifyResponse.json()

    if destinationValue == "toDeezer":
        # step 2, get ISRC values of Spotify Tracks
        SpotifyISRCValue = getSpotifyISRCValue(SpotifyResponse)
        print(SpotifyISRCValue)

        # step 3, get User ID for Deezer 
        DeezerUserId = getDeezerUserID(accessTokenDestination) # DeezerMeResponse.json()['id']
        print(DeezerUserId)

        # step 4, find tracks on Deezer using ISRC values
        DeezerTrackIdsList, ResponseValue, ResponseStatus = getDeezerISRCValues(
            SpotifyISRCValue)
        print(DeezerTrackIdsList)

        # to remove duplicate values from the list
        DeezerTrackIdsList = list(set(DeezerTrackIdsList))

        # *** to be implemented ***#
        # step 5, create NEW on Deezer and get that playlist's ID
        # *** to be implemented ***#

        # Currently being transferred to default playlist on Deezer "test playlist 1"
        DeezerPlaylistId = "11623416004"

        # step 6, add Tracks to Deezer Playlist 
        if ResponseStatus == 200 or DeezerTrackIdsList:
            addTracksToDeezer(DeezerTrackIdsList, DeezerPlaylistId, accessTokenDestination)

        ResponseValue['TotalSongs'] = len(SpotifyISRCValue)
        ResponseValue['CurrentSuccessfulTransfers'] = len(DeezerTrackIdsList)

        return Response(data=ResponseValue, status=ResponseStatus)
    
    if destinationValue == "toYoutubeMusic":
        YoutubeMusicHeaders = {
            'Authorization': 'Bearer ' + accessTokenDestination,
            'Accept': 'application/json',
        }

        # step 2, get Title and values of Spotify Tracks
        SpotifyTrackArtistValues = getSpotifyTrackArtistValues(SpotifyResponse)
        while (not(SpotifyResponse['next'] is None)):
            SpotifyResponse = requests.request(
                "GET", SpotifyResponse['next'], headers=Spotifyheaders)
            SpotifyResponse = SpotifyResponse.json()
            SpotifyTrackArtistValues = SpotifyTrackArtistValues + getSpotifyTrackArtistValues(SpotifyResponse)
        print(len(SpotifyTrackArtistValues))
        # print(SpotifyTrackArtistValues)

        # step 3, find videoId on Youtube using Spotify's Title+Artist values
        YoutubeMusicVideoIDsList, ResponseValue, ResponseStatus = getYoutubeMusicVideoIDs(
            SpotifyTrackArtistValues, YoutubeMusicHeaders)
        print(YoutubeMusicVideoIDsList)

        # step 4, create new playlist on youtube
        YoutubeMusicPlaylistID = createYoutubePlaylist(YoutubeMusicHeaders)

        # step 5, add videoId's LIST in new playlist
        # to remove duplicate values from the list
        YoutubeMusicVideoIDsList = list(set(YoutubeMusicVideoIDsList))
        
        YoutubeMusicPlaylistAddItemSuccessCounter = YoutubeMusicAddItemsToPlaylist(
            YoutubeMusicPlaylistID, YoutubeMusicVideoIDsList, YoutubeMusicHeaders)
        
        ResponseValue['TotalSongs'] = len(SpotifyTrackArtistValues)
        ResponseValue['CurrentSuccessfulTransfers'] = YoutubeMusicPlaylistAddItemSuccessCounter
        return Response(data=ResponseValue, status=ResponseStatus)

@api_view(["GET"])
def getDataFromDeezer(request, destinationValue, playlistId, accessTokendeezer, accessTokenDestination):

    Spotifyheaders = {
        'Authorization': 'Bearer ' + accessTokenDestination
    }

    DeezerHeaders = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept, Accept-Encoding',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Content-Type': 'text/javascript; charset=utf-8'
    }

    # step 1, get data from Deezer 

    DeezerURLPlaylist = "https://api.deezer.com/playlist/"+ playlistId + "/tracks?output=json&access_token="+accessTokendeezer

    DeezerPlaylistResponse = requests.request(
        "GET", DeezerURLPlaylist, headers=DeezerHeaders)
    
    # step 2, get song IDs from Deezer data 

    DeezerTrackIDValue = []
    for item in DeezerPlaylistResponse.json()['data']:
        DeezerTrackIDValue.append(item['id'])
    print(DeezerTrackIDValue)
    
    # step 3, get song ISRC values from Deezer data 

    DeezerTrackFetchURL = "https://api.deezer.com/track/"
    DeezerISRCValue = []
    ISRCCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    while ISRCCounter < len(DeezerTrackIDValue):
        if (ISRCCounter % 40 == 0 & ISRCCounter > 0):
            time.sleep(5)
        DeezerTrackValueResponse = requests.request(
            "GET", DeezerTrackFetchURL+str(DeezerTrackIDValue[ISRCCounter]), headers=DeezerHeaders)
        if (DeezerTrackValueResponse.status_code == 200 and 'error' not in DeezerTrackValueResponse.json()):
            DeezerISRCValue.append(DeezerTrackValueResponse.json()['isrc'])
            print("no error")
        else:
            print("error::" + str(DeezerTrackValueResponse.json()['error']))
        ISRCCounter += 1
    print(DeezerISRCValue)
    
    # step 4, search and grab Spotify URIs for each track

    SpotifyTrackURIValue, ResponseValue, ResponseStatus = getURIsFromSpotify(
        DeezerISRCValue, Spotifyheaders, "fromDeezer")
    print(SpotifyTrackURIValue)

    # to remove duplicate values from the list
    SpotifyTrackURIValue = list(set(SpotifyTrackURIValue))
    
    SpotifyTrackURIString = ','.join(str(valueInList)
                                     for valueInList in SpotifyTrackURIValue)

    if ResponseStatus == 200 or SpotifyTrackURIValue:
        # step 5, grab current User's ID from Spotify 
        SpotifyUserId = getSpotifyUserID(Spotifyheaders)
        print(SpotifyUserId)

        # step 6, create playlist on Spotify 

        SpotifyNewPlaylistId = createSpotifyPlaylist(
            SpotifyUserId, Spotifyheaders)
        print(SpotifyNewPlaylistId)

        # step 7, add items to spotify's Playlist 

        addItemsToSpotifyPlaylist(
            SpotifyNewPlaylistId, SpotifyTrackURIString, Spotifyheaders)
        ResponseValue['TotalSongs'] = len(DeezerISRCValue)
        ResponseValue['CurrentSuccessfulTransfers'] = len(SpotifyTrackURIValue)

    return Response(data=ResponseValue, status=ResponseStatus)

@api_view(["GET"])
def getDataFromYoutubeMusic(request, destinationValue, playlistId, accessTokenYoutubeMusic, accessTokenDestination):
    YoutubeMusicHeaders = {
        'Authorization': 'Bearer ' + accessTokenYoutubeMusic,
        'Accept': 'application/json',
    }
    
    Spotifyheaders = {
        'Authorization': 'Bearer ' + accessTokenDestination
    }

    #step 1, get playlist items from youtube
    YoutubeMusicURLPlaylist = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cid&maxResults=50&playlistId=" + playlistId + "&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"
    YoutubePlaylistResponse = requests.request(
        "GET", YoutubeMusicURLPlaylist, headers=YoutubeMusicHeaders)

    #step 2, get query parameters to from Youtube to use for search 
    YoutubeMusicQueryParams = []
    for item in YoutubePlaylistResponse.json()['items']:
        YoutubeMusicQueryParams.append(
            item['snippet']['title'] + " by " + item['snippet']['videoOwnerChannelTitle'])
    print(YoutubeMusicQueryParams)

    #step 3, get user's spotify ID
    SpotifyUserId = getSpotifyUserID(Spotifyheaders)
    print(SpotifyUserId)

    #step 4, search and grab Spotify URIs for each track 
    SpotifyTrackURIValue, ResponseValue, ResponseStatus = getURIsFromSpotify(
        YoutubeMusicQueryParams, Spotifyheaders, "fromYoutubeMusic")
    print(SpotifyTrackURIValue)

    # to remove duplicate values from the list
    SpotifyTrackURIValue = list(set(SpotifyTrackURIValue))

    SpotifyTrackURIString = ','.join(str(valueInList)
                                     for valueInList in SpotifyTrackURIValue)

    if ResponseStatus == 200 or SpotifyTrackURIValue:
        # step 5, create playlist on Spotify
        SpotifyNewPlaylistId = createSpotifyPlaylist(
            SpotifyUserId, Spotifyheaders)
        print(SpotifyNewPlaylistId)
        
        #step 6, add items to spotify 
        addItemsToSpotifyPlaylist(
            SpotifyNewPlaylistId, SpotifyTrackURIString, Spotifyheaders)

        ResponseValue['TotalSongs'] = len(YoutubeMusicQueryParams)
        ResponseValue['CurrentSuccessfulTransfers'] = len(SpotifyTrackURIValue)

    return Response(data=ResponseValue, status=ResponseStatus)
