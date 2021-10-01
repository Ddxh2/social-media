# Social Media App Project
 
This was built for the purpose of gaining full stack experience, especially with the MERNG stack. [This tutorial](https://www.youtube.com/watch?v=n1mdAPFq2Os&t=20005s&ab_channel=freeCodeCamp.org) was followed to develop the basis for this application.

The front end for this project was built using React and Apollo Client, the backend was set up with NodeJS, Express, GraphQL and Apollo Server, and the data is stored in a MongoDB database.

## Summary

With the help of the tutorial, user register/login functionality was set up and JWT authenatication was used to verify action permissions. Users can add, delete, like and comment on posts. The UI is built with the help of Semantic-UI and info popups are included with buttons for ease of use. 

Additional functionalities I added include:

- **Implementing automatic logout on token expiration**
- **Developing users profile page with editable profile image and bio, along with a history of the users posts**

## Local Pre-requisites

- NodeJS and NPM 

## Local Setup 

After cloning the repo, make sure to set the environment variables (see .env.example). The following steps need to be performed in both the client and server folders.

1. Run ```npm install``` to install all dependencies
2. Run ```npm start``` to run the front/back end of the application. 

## Future Changes

Below is a list of additional features or changes that I would have liked to include

- Better handling of large numbers of posts
- Follower functionality to restrict home page to only posts of the user or the users they follow
- UI bugs with the tab highlighting
- Tagging in comments or posts and associated notifications to the relevant users
- Image posts
- Unit tests
