ytreponse = {'kind': 'youtube#searchListResponse', 'etag': 'PN4C8_O0Nv_dMzwpCOFIc1DgguY', 'nextPageToken': 'CAEQAA', 'regionCode': 'GB', 'pageInfo': {'totalResults': 1000000, 'resultsPerPage': 1}, 'items': [{'kind': 'youtube#searchResult', 'etag': 'fJt-DaLPRhcCkNnbmt6l4jjQF9A', 'id': {'kind': 'youtube#video', 'videoId': 'LEbEUk-fXd0'}, 'snippet': {'publishedAt': '2023-05-04T10:03:25Z', 'channelId': 'UCnbxauSHmysDdIahTUlXG_Q', 'title': 'Delight', 'description': 'Provided to YouTube by PLYGRND Delight · Mad Keys · Tamuz · Brandon McCadney · Tamuz Dolev · Mad Keys · Tamuz Delight ...', 'thumbnails': {'default': {'url': 'https://i.ytimg.com/vi/LEbEUk-fXd0/default.jpg', 'width': 120, 'height': 90}, 'medium': {'url': 'https://i.ytimg.com/vi/LEbEUk-fXd0/mqdefault.jpg', 'width': 320, 'height': 180}, 'high': {'url': 'https://i.ytimg.com/vi/LEbEUk-fXd0/hqdefault.jpg', 'width': 480, 'height': 360}}, 'channelTitle': 'Various Artists - Topic', 'liveBroadcastContent': 'none', 'publishTime': '2023-05-04T10:03:25Z'}}]}
print(ytreponse['items'][0]['id']['videoId'])