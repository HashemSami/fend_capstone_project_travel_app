# Weather-Journal App Project

## Generel info

This project is for Udacity's front end nanodegree that requires you to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites.

Natural Language Processing. NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us. This is the Wikipedia definition:

> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
> concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
> process and analyze large amounts of natural language data.

Typically, NLP programs require far more resources than individuals have access to, but a fairly new API called Meaningcloud has put a public facing API in front of their NLP system. This project uses it to determine various attributes of an article or blog post.

The goal of this project is to practice with:

- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Technologies

- HTML
- CSS
- Javascript
- nodejs
- Webpack
- Sass

## Setup

- Clone this repo.
- Install the dependencies by running `npm i` in your terminal.
- You'll need to setup your own API to be able to use this project:
  ### Setting up the API
  - First, you will need to go [here](https://www.meaningcloud.com/developer/sentiment-analysis). Signing up will get you an API key.
  - Next you need to declare the API keys by saving it as an environment variable. Create a new `.env` file in the root of your project.
  - Fill the .env file with your API keys like this:
  ```
   API_KEY=**************************
  ```
- run `npm run build-prod` to create the production folders.
- open your browser on localhost:8001 to see the app running.
