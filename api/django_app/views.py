from rest_framework.generics import GenericAPIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view

from django import forms
from django.contrib.auth import login
from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View

from . import services
from .selectors import user_list
import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import requests
import json
import time
import datetime


# @permission_classes((AllowAny, ))
# class GoogleSocialAuthView(GenericAPIView):

#     serializer_class = GoogleSocialAuthSerializer

#     def post(self, request):
#         """
#         POST with "auth_token"
#         Send an idtoken as from google to get user information
#         """

#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         data = ((serializer.validated_data)['auth_token'])
#         return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
def getRoutes(request, destinationValue, playlistId, accessTokenSpotify, accessTokenDestination):
    print("request::", request)
    print("destinationValue::", destinationValue)
    print("playlistId::", playlistId)
    print("accessTokenSpotify::", accessTokenSpotify)
    print("accessTokenDestination::", accessTokenDestination)
    SpotifyURL = "https://api.spotify.com/v1/playlists/"+playlistId+"/tracks"
    # print("SpotifyURL::"+SpotifyURL)
    Spotifyheaders = {
        # 'Content-Type': 'application/json',
        # 'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessTokenSpotify
    }
    SpotifyResponse = requests.request(
        "GET", SpotifyURL, headers=Spotifyheaders)
    # print(SpotifyResponse.text)
    SpotifyResponse = SpotifyResponse.json()

    # print(SpotifyResponse.items.track)
    SpotifyISCRValue = []
    for item in SpotifyResponse['items']:
        SpotifyISCRValue.append(item['track']['external_ids']['isrc'])

    # SpotifyISCRValue = "[item.get('external_ids') for item in SpotifyResponse.items.track]"
    print(SpotifyISCRValue)
    
    DeezerURLMe = "https://api.deezer.com/user/me?output=json&access_token="+accessTokenDestination
    DeezerHeaders = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin, Accept, Accept-Encoding',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Content-Type': 'text/javascript; charset=utf-8'
    }

    DeezerMeResponse = requests.request(
        "GET", DeezerURLMe, headers=DeezerHeaders)
    # print(DeezerMeResponse.text)
    DeezerUserId = DeezerMeResponse.json()['id']
    print(DeezerUserId)

    DeezerTrackIdsList = []

    ISCRCounter = 0
    DeezerURLISCRFetch = "https://api.deezer.com/track/isrc:"
    while ISCRCounter < len(SpotifyISCRValue):
        if (ISCRCounter % 40 == 0 & ISCRCounter>0):
            time.sleep(5)
        print(SpotifyISCRValue[ISCRCounter])
        print(DeezerURLISCRFetch+SpotifyISCRValue[ISCRCounter])
        DeezerISCRResponse = requests.request(
            "GET", DeezerURLISCRFetch+SpotifyISCRValue[ISCRCounter], headers=DeezerHeaders)
        DeezerTrackIdsList.append(DeezerISCRResponse.json()['id'])
        if (DeezerISCRResponse.status_code == 200):
            print("no error")
        else:
            print("error::" + DeezerISCRResponse.json()['error'])
        ISCRCounter += 1

    print(DeezerTrackIdsList)
    DeezerTrackIdsString = ','.join(str(valueInList)
                                    for valueInList in DeezerTrackIdsList)
    print("DeezerTrackIdsString::" + DeezerTrackIdsString)
    # DeezerMeResponse = DeezerMeResponse.json()
    # print(str(DeezerMeResponse['id']) + "::::" + DeezerMeResponse['name'])

    DeezerPlaylistId = "11623416004"
    DeezerURLPlaylist = "https://api.deezer.com/playlist/"+DeezerPlaylistId + \
        "/tracks?access_token="+accessTokenDestination+"&order=" + \
        DeezerTrackIdsString+"&songs="+DeezerTrackIdsString
    print(DeezerURLPlaylist)
    # DeezerAddTrackspayload = json.dumps({
    #     "order": DeezerTrackIdsString
    # })

    DeezerPlaylistResponse = requests.request(
        "POST", DeezerURLPlaylist, headers=DeezerHeaders)
    print(DeezerPlaylistResponse.text)
    
    return Response("hello")


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
    while ISCRCounter < len(DeezerTrackIDValue):
        if (ISCRCounter % 40 == 0 & ISCRCounter > 0):
            time.sleep(5)
        DeezerTrackValueResponse = requests.request(
            "GET", DeezerTrackFetchURL+str(DeezerTrackIDValue[ISCRCounter]), headers=DeezerHeaders)
        # print(DeezerTrackValueResponse.text)
        # DeezerISRCValue.append(DeezerTrackValueResponse.json()['isrc'])
        if (DeezerTrackValueResponse.status_code == 200):
            DeezerISRCValue.append(DeezerTrackValueResponse.json()['isrc'])
            print("no error")
        else:
            print("error::" + DeezerTrackValueResponse.json()['error'])
        ISCRCounter += 1
    print(DeezerISRCValue)

    SpotifyTrackURL = "https://api.spotify.com/v1/search?type=track&q=isrc:" #GBAHS2200261&offset=0&limit=1
    SpotifyTrackURIValue = []
    SpotifyTrackCounter = 0
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
                  DeezerISRCValue[SpotifyTrackCounter])
        SpotifyTrackCounter += 1
    
    print(SpotifyTrackURIValue)

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

    SpotifyTrackURIString = ",".join(str(valueInList)
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


    return Response("hello")

@api_view(["POST"])
def GoogleLogin(request):
    print("hello")
    print(type(request))#.body.access_token)
    print(request.body)
    print(request.data["access_token"])
    # print(request.body.query_params('access_token'))
    # print(request.POST)

    ##create a session cookie and "ADD" access toke to USER model 
    test = "testing"
    scopes = ["https://www.googleapis.com/auth/youtube.readonly"]
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "..\..\google_oauth.json"

    # Get credentials and create an API client
    # flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
    #     client_secrets_file, scopes)
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(client_secrets_file, scopes=scopes)
    credentials = flow.run_console()
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    request = youtube.playlistItems().list(
        part="snippet,contentDetails",
        maxResults=25,
        playlistId="PL6aVbvHlra__fi34KDQR90NTXMEA88WLf"
    )
    response = request.execute()

    print(response)
    return Response(test)


class GoogleLoginRedirectApi(View):
    def get(self, request, *args, **kwargs):
        google_login_flow = services.GoogleRawLoginFlowService()

        authorization_url, state = google_login_flow.get_authorization_url()

        request.session["google_oauth2_state"] = state

        return redirect(authorization_url)


class GoogleLoginApi(View):
    class InputValidationForm(forms.Form):
        code = forms.CharField(required=False)
        error = forms.CharField(required=False)
        state = forms.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_form = self.InputValidationForm(data=request.GET)

        if not input_form.is_valid():
            return

        validated_data = input_form.cleaned_data

        code = validated_data["code"] if validated_data.get(
            "code") != "" else None
        error = validated_data["error"] if validated_data.get(
            "error") != "" else None
        state = validated_data["state"] if validated_data.get(
            "state") != "" else None

        if error is not None:
            return JsonResponse({"error": error}, status=400)

        if code is None or state is None:
            return JsonResponse({"error": "Code and state are required."}, status=400)

        session_state = request.session.get("google_oauth2_state")

        if session_state is None:
            return JsonResponse({"error": "CSRF check failed."}, status=400)

        del request.session["google_oauth2_state"]

        if state != session_state:
            return JsonResponse({"error": "CSRF check failed."}, status=400)

        google_login_flow = services.GoogleRawLoginFlowService()

        google_tokens = google_login_flow.get_tokens(code=code)

        id_token_decoded = google_tokens.decode_id_token()
        user_info = google_login_flow.get_user_info(
            google_tokens=google_tokens)

        user_email = id_token_decoded["email"]
        request_user_list = user_list(filters={"email": user_email})
        user = request_user_list.get() if request_user_list else None

        if user is None:
            return JsonResponse({"error": f"User with email {user_email} is not found."}, status=404)

        login(request, user)

        result = {
            "id_token_decoded": id_token_decoded,
            "user_info": user_info,
        }

        return JsonResponse(result, status=200)
