import requests
import time

from rest_framework import status
from .headers import DeezerHeaders

def getSpotifyISCRValue(SpotifyResponse):
    SpotifyISCRValue = []
    for item in SpotifyResponse['items']:
        SpotifyISCRValue.append(item['track']['external_ids']['isrc'])

    # SpotifyISCRValue = "[item.get('external_ids') for item in SpotifyResponse.items.track]"
    print(SpotifyISCRValue)
    print("getting SpotifyISCRValue")
    return SpotifyISCRValue


def getDeezerUserID(accessTokenDestination):
    DeezerURLMe = "https://api.deezer.com/user/me?output=json&access_token=" + \
        accessTokenDestination
    DeezerMeResponse = requests.request(
        "GET", DeezerURLMe, headers=DeezerHeaders)
    print("getting DeezerUserID")
    return DeezerMeResponse.json()['id']


def getDeezerISCRValues(SpotifyISCRValue):
    DeezerTrackIdsList = []

    ISCRCounter = 0
    DeezerURLISCRFetch = "https://api.deezer.com/track/isrc:"
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    while ISCRCounter < len(SpotifyISCRValue):
        if (ISCRCounter % 40 == 0 & ISCRCounter > 0):
            time.sleep(5)
        print(SpotifyISCRValue[ISCRCounter])
        print(DeezerURLISCRFetch+SpotifyISCRValue[ISCRCounter])
        DeezerISCRResponse = requests.request(
            "GET", DeezerURLISCRFetch+SpotifyISCRValue[ISCRCounter], headers=DeezerHeaders)
        if (DeezerISCRResponse.status_code == 200 and 'error' not in DeezerISCRResponse.json()):
            print(DeezerISCRResponse.text)
            DeezerTrackIdsList.append(DeezerISCRResponse.json()['id'])
            print("no error")
        else:
            print("error::" + str(DeezerISCRResponse.json()['error']))
            ResponseValue = DeezerISCRResponse.json()['error']
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        ISCRCounter += 1
    print(DeezerTrackIdsList)
    print("getting ISCR values")
    return DeezerTrackIdsList, ResponseValue, ResponseStatus


def addTracksToDeezer(DeezerTrackIdsList, DeezerPlaylistId, accessTokenDestination):
    DeezerTrackIdsString = ','.join(str(valueInList)
                                    for valueInList in DeezerTrackIdsList)

    DeezerURLPlaylist = "https://api.deezer.com/playlist/"+DeezerPlaylistId + \
        "/tracks?access_token="+accessTokenDestination+"&order=" + \
        DeezerTrackIdsString+"&songs="+DeezerTrackIdsString
    print(DeezerURLPlaylist)

    DeezerPlaylistResponse = requests.request(
        "POST", DeezerURLPlaylist, headers=DeezerHeaders)
    print(DeezerPlaylistResponse.text)

    print("adding tracks to deezer")


def getSpotifyTrackArtistValues(SpotifyResponse):
    print("getting getSpotifyTrackArtistValues")
    SpotifyTrackArtistValues = []
    for item in SpotifyResponse['items']:
        SpotifyTrackArtistValues.append(
            item['track']['name'] + " by " + item['track']['artists'][0]['name'])
        
    print(SpotifyTrackArtistValues)
    return SpotifyTrackArtistValues


def getYoutubeMusicVideoIDs(SpotifyTrackArtistValues, YoutubeMusicHeaders):
    YoutubeMusicVideoIDsList = []
    YoutubeMusicURLToFetchVideoIDs = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com&q="
    YoutubeMusicURLToFetchCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    while YoutubeMusicURLToFetchCounter < 1:#len(SpotifyTrackArtistValues):
        if (YoutubeMusicURLToFetchCounter % 40 == 0 & YoutubeMusicURLToFetchCounter > 0):
            time.sleep(5)
        YoutubeMusicVideoIDsResponse = requests.request(
            "GET", YoutubeMusicURLToFetchVideoIDs+SpotifyTrackArtistValues[YoutubeMusicURLToFetchCounter], headers=YoutubeMusicHeaders)
        print(YoutubeMusicVideoIDsResponse.json())
        if YoutubeMusicVideoIDsResponse.status_code == 200:
            YoutubeMusicVideoIDsList.append(YoutubeMusicVideoIDsResponse.json()['items'][0]['id']['videoId'])
        else:
            ResponseValue = YoutubeMusicVideoIDsResponse.json()['error']
            ResponseStatus = status.HTTP_207_MULTI_STATUS
        YoutubeMusicURLToFetchCounter += 1
    print("getting getYoutubeMusicVideoIDs")
    return YoutubeMusicVideoIDsList, ResponseValue, ResponseStatus


def createYoutubePlaylist(YoutubeMusicHeaders):
    YoutubeMusicURLToCreatePlaylist = "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"

    timeNow = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())
    YoutubeMusicToCreatePlaylistBody = {
        'snippet': {
            'title': 'Playlist created via API' + timeNow,
            'description': 'Playlist description.' + timeNow,
            'tags': ['sample playlist', 'API call'],
            'defaultLanguage': 'en'
        },
        'status': {
            'privacyStatus': 'private'
        }
    }

    YoutubeMusicPlaylistResponse = requests.request(
        "POST", YoutubeMusicURLToCreatePlaylist, headers=YoutubeMusicHeaders, data=YoutubeMusicToCreatePlaylistBody)
    YoutubeMusicPlaylistID = YoutubeMusicPlaylistResponse.json()['id']

    print("creating yt music playlist")
    return YoutubeMusicPlaylistID


def YoutubeMusicAddItemsToPlaylist(YoutubeMusicPlaylistID, YoutubeMusicVideoIDsList, YoutubeMusicHeaders):
    YoutubeMusicURLToAddItemsToPlaylist = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=515720033979-c374rl8jubtear7c8g3jel8gg2965vib.apps.googleusercontent.com"
    YoutubeMusicAddItemsToPlaylistCounter = 0
    ResponseStatus = status.HTTP_200_OK
    ResponseValue = {'Response': 'Transfer Complete'}
    YoutubeMusicPlaylistAddItemSuccessCounter = 0
    while YoutubeMusicAddItemsToPlaylistCounter < len(YoutubeMusicVideoIDsList):
        YoutubeMusicAddItemsToPlaylistCounter += 1
        YoutubeMusicAddItemsToPlaylistBody = {
            'snippet': {
                'playlistId': str(YoutubeMusicPlaylistID),
                'position': 0,
                'resourceId': {
                    'kind': 'youtube#video',
                    'videoId': str(YoutubeMusicVideoIDsList[YoutubeMusicAddItemsToPlaylistCounter])
                }

            }
        }

        YoutubeMusicPlaylistAddItemResponse = requests.request(
            "POST", YoutubeMusicURLToAddItemsToPlaylist, headers=YoutubeMusicHeaders, data=YoutubeMusicAddItemsToPlaylistBody)
        print(YoutubeMusicPlaylistAddItemResponse.json())
        YoutubeMusicPlaylistAddItemResponse.status_code == 200:
        YoutubeMusicPlaylistAddItemSuccessCounter += 1
    print("adding YoutubeMusicAddItemsToPlaylist")
