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
    SpotifyURL = "https://api.spotify.com/v1/playlists/"+playlistId+"/tracks"
    Spotifyheaders = {
        'Authorization': 'Bearer ' + accessTokenSpotify
    }

    SpotifyResponse = requests.request(
        "GET", SpotifyURL, headers=Spotifyheaders)
    SpotifyResponse = SpotifyResponse.json()

    if destinationValue == "toDeezer":
        #step 2, get ISCR values of Spotify Tracks 
        SpotifyISCRValue = getSpotifyISCRValue(SpotifyResponse)
        print(SpotifyISCRValue)

        # step 3, get User ID for Deezer 
        DeezerUserId = getDeezerUserID(accessTokenDestination) # DeezerMeResponse.json()['id']
        print(DeezerUserId)

        # step 4, find tracks on Deezer using ISRC values
        DeezerTrackIdsList, ResponseValue, ResponseStatus = getDeezerISCRValues(
            SpotifyISCRValue)
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

        ResponseValue['TotalSongs'] = len(SpotifyISCRValue)
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
    print("request::", request)
    print("destinationValue::", destinationValue)
    print("playlistId::", playlistId)
    print("accessTokendeezer::", accessTokendeezer)
    print("accessTokenDestination::", accessTokenDestination)

    Spotifyheaders = {
        'Authorization': 'Bearer ' + accessTokenDestination
    }

    DeezerHeaders = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept, Accept-Encoding',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Content-Type': 'text/javascript; charset=utf-8'
    }

    DeezerURLPlaylist = "https://api.deezer.com/playlist/"+ playlistId + "/tracks?output=json&access_token="+accessTokendeezer

    DeezerPlaylistResponse = requests.request(
        "GET", DeezerURLPlaylist, headers=DeezerHeaders)
    # print(DeezerPlaylistResponse.text)

    DeezerTrackIDValue = []
    for item in DeezerPlaylistResponse.json()['data']:
        DeezerTrackIDValue.append(item['id'])
    print(DeezerTrackIDValue)
    
    DeezerTrackFetchURL = "https://api.deezer.com/track/"
    DeezerISRCValue = []
    ISCRCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    while ISCRCounter < len(DeezerTrackIDValue):
        if (ISCRCounter % 40 == 0 & ISCRCounter > 0):
            time.sleep(5)
        DeezerTrackValueResponse = requests.request(
            "GET", DeezerTrackFetchURL+str(DeezerTrackIDValue[ISCRCounter]), headers=DeezerHeaders)
        # print(DeezerTrackValueResponse.text)
        # DeezerISRCValue.append(DeezerTrackValueResponse.json()['isrc'])
        if (DeezerTrackValueResponse.status_code == 200 and 'error' not in DeezerTrackValueResponse.json()):
            DeezerISRCValue.append(DeezerTrackValueResponse.json()['isrc'])
            print("no error")
        else:
            print("error::" + str(DeezerTrackValueResponse.json()['error']))
        ISCRCounter += 1
    print(DeezerISRCValue)

    SpotifyTrackURL = "https://api.spotify.com/v1/search?type=track&q=isrc:" #GBAHS2200261&offset=0&limit=1
    SpotifyTrackURIValue = []
    SpotifyTrackCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete', 'ISRC Not Found': ''}
    while SpotifyTrackCounter < len(DeezerISRCValue):
        if (SpotifyTrackCounter % 40 == 0 & SpotifyTrackCounter > 0):
            time.sleep(5)
        SpotifyTrackValueResponse = requests.request(
            "GET", SpotifyTrackURL+str(DeezerISRCValue[SpotifyTrackCounter]), headers=Spotifyheaders)
        if (SpotifyTrackValueResponse.json()['tracks']['total'] != 0):
            SpotifyTrackURIValue.append(
                SpotifyTrackValueResponse.json()['tracks']['items'][0]['uri'])
            print("no error")
        else:
            print("error:: no value found for ISCR: " +
                  str(DeezerISRCValue[SpotifyTrackCounter]))
            ResponseValue['ISRC Not Found'] += str(
                DeezerISRCValue[SpotifyTrackCounter])
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        SpotifyTrackCounter += 1
    
    print(SpotifyTrackURIValue)

    if ResponseStatus == 200 or SpotifyTrackURIValue:
        ResponseValue['TotalSongs'] = len(DeezerISRCValue)
        ResponseValue['CurrentSuccessfulTransfers'] = len(SpotifyTrackURIValue)
        SpotifyUserURL = "https://api.spotify.com/v1/me"
        SpotifyUserResponse = requests.request(
            "GET", SpotifyUserURL, headers=Spotifyheaders)
        SpotifyUserId = SpotifyUserResponse.json()['id']
        print(SpotifyUserId)

        timeNow = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

        SpotifyCreatePlaylistBody = json.dumps({
            "name": "Deezer To Spotify " + timeNow,
            "description": "New playlist description",
            "public": "false"
            })

        SpotifyCreatePlaylistURL = "https://api.spotify.com/v1/users/"+ SpotifyUserId +"/playlists"
        SpotifyCreatePlaylistResponse = requests.request(
            "POST", SpotifyCreatePlaylistURL, headers=Spotifyheaders, data=SpotifyCreatePlaylistBody)
        print(SpotifyCreatePlaylistResponse.json())
        SpotifyNewPlaylistId = SpotifyCreatePlaylistResponse.json()['id']
        print(SpotifyNewPlaylistId)

        SpotifyTrackURIValue = list(set(SpotifyTrackURIValue))
        SpotifyTrackURIString = ','.join(str(valueInList)
                                        for valueInList in SpotifyTrackURIValue)
        # SpotifyTrackURIString = "%27" + SpotifyTrackURIString + "%27"
        print("SpotifyTrackURIString:::"+SpotifyTrackURIString)

        SpotifyAddItemToPlaylistBody = json.dumps({
            "uris": SpotifyTrackURIString,
        })

        SpotifyAddItemToPlaylistURL = "https://api.spotify.com/v1/playlists/" + SpotifyNewPlaylistId + "/tracks?uris="+SpotifyTrackURIString
        SpotifyAddItemToPlaylistResponse = requests.request(
            "POST", SpotifyAddItemToPlaylistURL, headers=Spotifyheaders)#, data=SpotifyAddItemToPlaylistBody)
        
        print(SpotifyAddItemToPlaylistResponse.text)
    else:
        ResponseValue['TotalSongs'] = len(DeezerISRCValue)
        ResponseValue['CurrentSuccessfulTransfers'] = len(
            SpotifyTrackURIValue)

    return Response(data=ResponseValue, status=ResponseStatus)

@api_view(["GET"])
def getDataFromYoutubeMusic(request, destinationValue, playlistId, accessTokenYoutubeMusic, accessTokenDestination):
    print("request::", request)
    print("destinationValue::", destinationValue)
    print("playlistId::", playlistId)
    print("accessTokendeezer::", accessTokenYoutubeMusic)
    print("accessTokenDestination::", accessTokenDestination)

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
    
    # print(YoutubePlaylistResponse.json())

    #step 2, get query parameters to search on Spotify
    YoutubeMusicQueryParams = []
    for item in YoutubePlaylistResponse.json()['items']:
        YoutubeMusicQueryParams.append(
            item['snippet']['title'] + " by " + item['snippet']['videoOwnerChannelTitle'])
    print(YoutubeMusicQueryParams)

    #step 3, get user's spotify ID
    SpotifyUserURL = "https://api.spotify.com/v1/me"
    SpotifyUserResponse = requests.request(
        "GET", SpotifyUserURL, headers=Spotifyheaders)
    # print(SpotifyUserResponse.text)
    ## important, check of errros after each Get or Post call 
    SpotifyUserId = SpotifyUserResponse.json()['id']
    print(SpotifyUserId)

    #step 4, search and grab Spotify URIs for each track 
    SpotifyTrackURL = "https://api.spotify.com/v1/search?type=track&limit=1&q="
    SpotifyTrackURIValue = []
    SpotifyTrackCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete', 'Songs Not Found': ''}
    while SpotifyTrackCounter < len(YoutubeMusicQueryParams):
        if (SpotifyTrackCounter % 40 == 0 & SpotifyTrackCounter > 0):
            time.sleep(5)
        SpotifyTrackValueResponse = requests.request(
            "GET", SpotifyTrackURL+str(YoutubeMusicQueryParams[SpotifyTrackCounter]), headers=Spotifyheaders)
        if (SpotifyTrackValueResponse.json()['tracks']['total'] != 0):
            SpotifyTrackURIValue.append(
                SpotifyTrackValueResponse.json()['tracks']['items'][0]['uri'])
            print("no error")
        else:
            print("error:: no value found for Query: " +
                  str(YoutubeMusicQueryParams[SpotifyTrackCounter]))
            ResponseValue['Songs Not Found'] += str(
                YoutubeMusicQueryParams[SpotifyTrackCounter])
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        SpotifyTrackCounter += 1

    print(SpotifyTrackURIValue)

    if ResponseStatus == 200 or SpotifyTrackURIValue:
        ResponseValue['TotalSongs'] = len(YoutubeMusicQueryParams)
        ResponseValue['CurrentSuccessfulTransfers'] = len(SpotifyTrackURIValue)
        
        SpotifyTrackURIValue = list(set(SpotifyTrackURIValue))
        SpotifyTrackURIString = ','.join(str(valueInList)
                                        for valueInList in SpotifyTrackURIValue)
        
        # step 5, create playlist on Spotify
        timeNow = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

        SpotifyCreatePlaylistBody = json.dumps({
            "name": "Youtube Music To Spotify " + timeNow,
            "description": "Youtube Music To Spotify playlist description" + timeNow,
            "public": "false"
        })

        SpotifyCreatePlaylistURL = "https://api.spotify.com/v1/users/" + \
            SpotifyUserId + "/playlists"
        SpotifyCreatePlaylistResponse = requests.request(
            "POST", SpotifyCreatePlaylistURL, headers=Spotifyheaders, data=SpotifyCreatePlaylistBody)
        # print(SpotifyCreatePlaylistResponse.json())
        SpotifyNewPlaylistId = SpotifyCreatePlaylistResponse.json()['id']
        print(SpotifyNewPlaylistId)
        
        #step 6, add items to spotify 

        SpotifyAddItemToPlaylistURL = "https://api.spotify.com/v1/playlists/" + \
            SpotifyNewPlaylistId + "/tracks?uris="+SpotifyTrackURIString
        SpotifyAddItemToPlaylistResponse = requests.request(
            "POST", SpotifyAddItemToPlaylistURL, headers=Spotifyheaders)  # , data=SpotifyAddItemToPlaylistBody)

        print(SpotifyAddItemToPlaylistResponse.text)
    else:
        ResponseValue['TotalSongs'] = len(YoutubeMusicQueryParams)
        ResponseValue['CurrentSuccessfulTransfers'] = len(
            SpotifyTrackURIValue)

    return Response(data=ResponseValue, status=ResponseStatus)
