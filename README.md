# React-Django Playlist Transfer App

_Prerequisite:_

-   [Node](https://nodejs.org/en/download)
    **Install appropriate [Node 14.0.0 or later version](https://nodejs.org/en/download) on your local development machine if not already available**
    To check if Node is isntalled, run `node -v`
    **Restart the Terminal if you are installing Node anew.**
-   Make sure you have [Python](https://www.python.org/downloads/) installed

## Backend Setup

-   Download/clone repo: `git clone https://github.com/imdsrs/react-django-PlaylistTransferApp.git`
-   Change the current directory: `cd .\react-django-PlaylistTransferApp\`.
-   Install Django and other dependencies with `pip install -r requirements.txt`.

## Frontend Setup

[Detailed Frontend Setup](https://github.com/imdsrs/react-django-PlaylistTransferApp/blob/main/react_app/README.md)

-   Change the current directory: `cd .\react_app\ `.
-   Install React dependencies with `npm install`.
-   Build React app using `npm run build`.

## Running the Web App

-   **In a new terminal** Run Django app in 'react-django-PlaylistTransferApp' direcotry using `python manage.py runserver`.
-   Run React app in 'react_app' directory with `npm start`. (Click 'Allow Access' if you have installed Node anew)
    -   Runs the app in the development mode and opens it in Browser.
    -   If does not open automatically, open http://localhost:3000 to view it in your browser.
