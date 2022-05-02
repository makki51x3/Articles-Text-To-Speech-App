# Quick Video of Prototype on The Web

  https://user-images.githubusercontent.com/96151955/166102395-7a8abe36-6134-4c9b-8242-fbe0759e1564.mp4 

# Contents Table

• Quick Video of Prototype on The Web

• Description

• Usecase and Features 

• UI/UX Design

• Architecture and Libraries

• Build Tools

• Documentation

• How to Run the App

• On Mobile

• On Web

• Coming Soon

• Prototype (IOS/Android/Web) 

# Description

A ReactJS application that communicates with a blogging API to allow users to sign in, view, and filter different articles in a user friendly manner. 

# Usecase and Features 

The application consists of two screens: Login & Dashboard. Upon starting the application, the user is directed to the Login screen which contains a username and password input fields as well as a login button. The login button is initially disabled when both input fields are empty or the login API is in progress. A loading spinner is displayed whenever an API call is made. If the username or password are invalid, the API sends back an unauthorised response which is fetched by the app that in turn displays a warning text in red color. Upon authentication, the API sends back an access token that is later used to fetch articles from the API. The application then routes the user to the dashboard screen. The dashboard screen is made up of a list of article cards, that display an additional paragraph once pressed, and a logout and search buttons. The application fetches articles from the API whenever the user is routed to the dashboard screen. If the user reaches the end of the articles list, the application will send a request, with the page parameter incremented, to the API to load new articles, Lastly, the application will scroll automatically to the first item in the articles. The application handles exceptions where the API wasn’t successful or didn’t return any data. If the user pulls down to refresh, the application will display an animated loading indicator, reset the page number to zero and remove the articles from the redux store. It then will send a fetch request to load new articles from the API. If the user presses the search button, the app enters search mode, a search input field will be displayed and the loaded articles are cleared. When the user types in the search input, the loaded articles are filtered and only the articles that contain the searched pattern in the article title or article description are displayed. Once the user represses the search button, it exits search mode, the search input field will get cleared and disappear from the screen displaying back all the loaded articles. During search mode the user cannot load more data. The user can choose to logout at any time using the logout button displayed on the top left of the screen. Upon logout the application clears the access token from the redux store and routes the user to the login screen. 

# UI/UX Design

I used stylesheet and react-native-paper libraries to help me design and implement a simple, user-friendly, and eye-appealing user interface. I also used Platform, StatusBar, and other components to make the UI responsive and compatible to different platforms such as android, iphone and web. The color theme I chose is blue with two different space background images and some variance in the opacity to achieve translucency. I added a responsive search bar instead of having it fixed on the screen. 

# Architecture and Libraries 

The project makes use of different libraries like redux js tools for state management, react navigation for routing, axios for http methods,  react native paper for UI design, etc. The code makes use of functional programming, Hooks, redux for state management, proper file structure, and components best practices,etc.  

# Build Tools

I used Visual Studio Code to compile and run the code and the Expo framework to test the application on different screens and platforms it also allows for easy setup and quick run before moving to deployment. 

# Documentation

• Connect to the backend of the API using this URL: http://34.245.213.76:3000

• The API documentation can be found here: http://34.245.213.76:3000/api

• The login credentials for successful login:

- Username: candidate

- Password: P@ssw0rd 

# How to Run the App 

## On Mobile
More information can be found here: https://docs.expo.dev/guides/sharing-preview-releases/

• Download Expo Go App from Apple store or Play store ( search expo )

• Create an account if you don't have one and sign in

• Access the application using:
  ### *Link*
  exp.host/@51x3/interview_challenge?release-channel=default
  ### *QR Code*
  ![image](https://user-images.githubusercontent.com/96151955/166200975-d22e8468-e178-4253-858c-ef17c6b1f59c.png)

## On Web
More information can be found here: https://docs.expo.dev/get-started/installation/

• Download and install Node.js LTS release from: https://nodejs.org/en/
• Install expo-cli (in your command line or terminal, run: *npm install --global expo-cli* )
• Clone this repository
• Open command line or terminal and run in cloned directory and run: *expo start* or *npm start*

# Coming Soon

• Unit tests on different interactions between the user or API and the application. 

• Code refactoring

• Better code commentary 

• The use of Docker container to deploy the application on the cloud

• Better file structure and architecture tweaks 

# Prototype (IOS/Web/Android)

<img src="https://user-images.githubusercontent.com/96151955/166102677-edee71c2-2a6f-4830-bcb6-d56741ec934c.png" alt="IOS" width="200" height="420" /><img src="https://user-images.githubusercontent.com/96151955/166103633-b3d5a2c9-8808-45e3-b57e-352618c0ba3b.png" alt="laptop" height="420"/><img src="https://user-images.githubusercontent.com/96151955/166103467-018d4d32-5a62-49cf-9aac-bed4c7943aea.png" alt="android" width="200" height="420"/>

