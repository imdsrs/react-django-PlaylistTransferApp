from datetime import datetime

import requests
import time
import json

from rest_framework import status
from .headers import DeezerHeaders

def getSpotifyISRCValue(SpotifyResponse):
    SpotifyISRCValue = []
    for item in SpotifyResponse['items']:
        SpotifyISRCValue.append(item['track']['external_ids']['isrc'])

    # SpotifyISRCValue = "[item.get('external_ids') for item in SpotifyResponse.items.track]"
    # print(SpotifyISRCValue)
    # print("getting SpotifyISRCValue")
    return SpotifyISRCValue


def getDeezerUserID(accessTokenDestination):
    DeezerURLMe = "https://api.deezer.com/user/me?output=json&access_token=" + \
        accessTokenDestination
    DeezerMeResponse = requests.request(
        "GET", DeezerURLMe, headers=DeezerHeaders)
    # print("getting DeezerUserID")
    return DeezerMeResponse.json()['id']


def getDeezerISRCValues(SpotifyISRCValue):
    DeezerTrackIdsList = []

    ISRCCounter = 0
    DeezerURLISRCFetch = "https://api.deezer.com/track/isrc:"
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    while ISRCCounter < len(SpotifyISRCValue):
        if (ISRCCounter % 45 == 0 and ISRCCounter > 0):
            timeNow = datetime.today().strftime("%Y-%m-%d %H:%M:%S:%f")
            print("sleeping for 5 seconds at " + timeNow)
            time.sleep(5)
        # print(SpotifyISRCValue[ISRCCounter])
        # print(DeezerURLISRCFetch+SpotifyISRCValue[ISRCCounter])
        DeezerISRCResponse = requests.request(
            "GET", DeezerURLISRCFetch+SpotifyISRCValue[ISRCCounter], headers=DeezerHeaders)
        if (DeezerISRCResponse.status_code == 200 and 'error' not in DeezerISRCResponse.json()):
            # print(DeezerISRCResponse.text)
            DeezerTrackIdsList.append(DeezerISRCResponse.json()['id'])
            # print("no error")
        else:
            print("error::" + str(DeezerISRCResponse.json()['error']))
            ResponseValue = DeezerISRCResponse.json()['error']
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        ISRCCounter += 1
    # print(DeezerTrackIdsList)
    # print("getting ISRC values")
    return DeezerTrackIdsList, ResponseValue, ResponseStatus


def addTracksToDeezer(DeezerTrackIdsList, DeezerPlaylistId, accessTokenDestination):
    DeezerTrackIdsString = ','.join(str(valueInList)
                                    for valueInList in DeezerTrackIdsList)

    DeezerURLPlaylist = "https://api.deezer.com/playlist/"+DeezerPlaylistId + \
        "/tracks?access_token="+accessTokenDestination+"&order=" + \
        DeezerTrackIdsString+"&songs="+DeezerTrackIdsString
    # print(DeezerURLPlaylist)

    DeezerPlaylistResponse = requests.request(
        "POST", DeezerURLPlaylist, headers=DeezerHeaders)
    # print(DeezerPlaylistResponse.text)

    # print("adding tracks to deezer")


def getSpotifyTrackArtistValues(SpotifyResponse):
    # print("getting getSpotifyTrackArtistValues")
    SpotifyTrackArtistValues = []
    for item in SpotifyResponse['items']:
        SpotifyTrackArtistValues.append(
            item['track']['name'] + " by " + item['track']['artists'][0]['name'])
        
    # print(SpotifyTrackArtistValues)
    return SpotifyTrackArtistValues


def getYoutubeMusicVideoIDs(SpotifyTrackArtistValues, YoutubeMusicHeaders):
    YoutubeMusicVideoIDsList = []
    YoutubeMusicURLToFetchVideoIDs = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com&q="
    YoutubeMusicURLToFetchCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    while YoutubeMusicURLToFetchCounter < len(SpotifyTrackArtistValues):
        if (YoutubeMusicURLToFetchCounter % 40 == 0 & YoutubeMusicURLToFetchCounter > 0):
            time.sleep(5)
        YoutubeMusicVideoIDsResponse = requests.request(
            "GET", YoutubeMusicURLToFetchVideoIDs+SpotifyTrackArtistValues[YoutubeMusicURLToFetchCounter], headers=YoutubeMusicHeaders)
        # print(YoutubeMusicVideoIDsResponse.json())
        if YoutubeMusicVideoIDsResponse.status_code == 200:
            YoutubeMusicVideoIDsList.append(YoutubeMusicVideoIDsResponse.json()['items'][0]['id']['videoId'])
        else:
            ResponseValue = YoutubeMusicVideoIDsResponse.json()['error']
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        YoutubeMusicURLToFetchCounter += 1
    # print("getting getYoutubeMusicVideoIDs")
    return YoutubeMusicVideoIDsList, ResponseValue, ResponseStatus


def createYoutubePlaylist(YoutubeMusicHeaders):
    YoutubeMusicURLToCreatePlaylist = "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"

    timeNow = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    YoutubeMusicToCreatePlaylistBody = json.dumps({
        "snippet": {
            "title": "Playlist created via Playlist Transfer App  " + timeNow,
            "description": "Created on " + timeNow,
            "tags": ["Playlist Transfer App", "Transfered Playlist"],
            "defaultLanguage": "en"
        },
        "status": {
            "privacyStatus": "private"
        }
    })

    YoutubeMusicPlaylistResponse = requests.request(
        "POST", YoutubeMusicURLToCreatePlaylist, headers=YoutubeMusicHeaders, data=YoutubeMusicToCreatePlaylistBody)
    print(YoutubeMusicPlaylistResponse.json())
    YoutubeMusicPlaylistID = YoutubeMusicPlaylistResponse.json()['id']

    # print("creating yt music playlist")
    return YoutubeMusicPlaylistID


def YoutubeMusicAddItemsToPlaylist(YoutubeMusicPlaylistID, YoutubeMusicVideoIDsList, YoutubeMusicHeaders):
    YoutubeMusicURLToAddItemsToPlaylist = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"
    YoutubeMusicAddItemsToPlaylistCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    YoutubeMusicPlaylistAddItemSuccessCounter = 0
    while YoutubeMusicAddItemsToPlaylistCounter < len(YoutubeMusicVideoIDsList):
        YoutubeMusicAddItemsToPlaylistBody = json.dumps({
            "snippet": {
                "playlistId": str(YoutubeMusicPlaylistID),
                "position": 0,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": str(YoutubeMusicVideoIDsList[YoutubeMusicAddItemsToPlaylistCounter])
                }

            }
        })

        YoutubeMusicPlaylistAddItemResponse = requests.request(
            "POST", YoutubeMusicURLToAddItemsToPlaylist, headers=YoutubeMusicHeaders, data=YoutubeMusicAddItemsToPlaylistBody)
        # print(YoutubeMusicPlaylistAddItemResponse.json())
        if YoutubeMusicPlaylistAddItemResponse.status_code == 200:
            YoutubeMusicPlaylistAddItemSuccessCounter += 1
        YoutubeMusicAddItemsToPlaylistCounter += 1
    return YoutubeMusicPlaylistAddItemSuccessCounter


def getSpotifyUserID(Spotifyheaders):
    SpotifyUserURL = "https://api.spotify.com/v1/me"
    SpotifyUserResponse = requests.request(
        "GET", SpotifyUserURL, headers=Spotifyheaders)
    # print("getting spotify user ID")
    return SpotifyUserResponse.json()['id']


def getURIsFromSpotify(QueryParams, Spotifyheaders, sourceValue):
    if (sourceValue == 'fromYoutubeMusic'):
        SpotifyTrackURL = "https://api.spotify.com/v1/search?type=track&limit=1&q="
    if (sourceValue == 'fromDeezer'):
        SpotifyTrackURL = "https://api.spotify.com/v1/search?type=track&q=isrc:"
    SpotifyTrackURIValue = []
    SpotifyTrackCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete', 'Songs Not Found': ''}
    while SpotifyTrackCounter < len(QueryParams):
        if (SpotifyTrackCounter % 40 == 0 and SpotifyTrackCounter > 0):
            time.sleep(5)
        SpotifyTrackValueResponse = requests.request(
            "GET", SpotifyTrackURL+str(QueryParams[SpotifyTrackCounter]), headers=Spotifyheaders)
        if (SpotifyTrackValueResponse.json()['tracks']['total'] != 0):
            SpotifyTrackURIValue.append(
                SpotifyTrackValueResponse.json()['tracks']['items'][0]['uri'])
            # print("no error")
        else:
            print("error:: no value found for: " +
                  str(QueryParams[SpotifyTrackCounter]))
            ResponseValue['Songs Not Found'] += str(
                QueryParams[SpotifyTrackCounter])
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        SpotifyTrackCounter += 1
    # print("getting URIs from Spotify")
    return SpotifyTrackURIValue, ResponseValue, ResponseStatus


def createSpotifyPlaylist(SpotifyUserId, Spotifyheaders):
    timeNow = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    SpotifyCreatePlaylistBody = json.dumps({
        "name": "Playlist Transfer App To Spotify " + timeNow,
        "description": "Playlist Transfer App To Spotify playlist description" + timeNow,
        "public": "false"
    })

    SpotifyCreatePlaylistURL = "https://api.spotify.com/v1/users/" + \
        SpotifyUserId + "/playlists"
    SpotifyCreatePlaylistResponse = requests.request(
        "POST", SpotifyCreatePlaylistURL, headers=Spotifyheaders, data=SpotifyCreatePlaylistBody)
    # print("creating spotify playlist")
    return SpotifyCreatePlaylistResponse.json()['id']


def addItemsToSpotifyPlaylist(SpotifyNewPlaylistId, SpotifyTrackURIString, Spotifyheaders):
    SpotifyAddItemToPlaylistURL = "https://api.spotify.com/v1/playlists/" + \
        SpotifyNewPlaylistId + "/tracks?uris=" + SpotifyTrackURIString
    SpotifyAddItemToPlaylistResponse = requests.request(
        "POST", SpotifyAddItemToPlaylistURL, headers=Spotifyheaders)  # , data=SpotifyAddItemToPlaylistBody)

    # print(SpotifyAddItemToPlaylistResponse.text)
    return("adding items to spotify playlist")

def SpotifyGetTrackIDs():
    print("get SpotifyGetTrackIDs")
