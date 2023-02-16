# Recollection Flash Card App
Recollection is a flash card app built with create-t3-app, Discord for authentication, a Postgres database on Railway.app, and hosted on Vercel.

## Features
Recollection offers the following features:

- Authentication using Discord
- Create a "collection" and add "flash cards" to the collection
- Collections are filterable by type, description, name, and difficulty
- Earn "apples" on your account for each correct answer given during studying

## Technologies Used
Recollection uses the following technologies:

create-t3-app: a tool for creating React apps with no build configuration <br /> 

Discord: a communication platform for communities and friends <br />

Postgres: a powerful, open-source relational database system <br /> 

Railway.app: a cloud platform for hosting Postgres databases <br /> 

Vercel: a cloud platform for hosting web applications <br /> 

## How to Run the App
If you want to run the app on your machine, you can follow these simple steps:

> #### Clone the repository to your local machine.
> #### Install the dependencies using `npm install`.
> #### Create a .env file in the root directory of the project and add your Discord application client ID and secret as REACT_APP_DISCORD_CLIENT_ID=your_client_id and REACT_APP_DISCORD_SECRET=your_secret.
> #### Start the app using `npm start`.
> #### Open your web browser and navigate to http://localhost:3000/.

## How to Use the App
To use Recollection, follow these steps:

Log in to the app using your Discord account.
Create a new collection by clicking on the "Create Collection" button.
Add flash cards to your collection by clicking on the "Add Flash Card" button.
Study your collection by clicking on the "Study" button. For each correct answer, you will earn "apples" on your account.
Filter your collections by type, description, name, and difficulty by using the filter options.
