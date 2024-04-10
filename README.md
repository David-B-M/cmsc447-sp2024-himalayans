# Everest the Olympicat by "The Himalayans"
Welcome to the Himalayans group (CMSC447-04 Spring 2024) github project repository!

# Sprint 2 - Implementation
## Build Instructions
1. Load the backend by following the instructions in `./Backend/README.md`
2. Render the app by following the instructions in `./Frontend/README.md`.

## Current Progress!
Here is how our application is currently lookin!
You can load the app up and see the the following pages.

To quickstart, either click the `LevelExample` link at the top nap bar of our app, or just go to ChooseLevel then level 1 (the other two levels are still under development). To jump, press the up arrow key. The game will freeze if you hit a rock or when time runs out.

See the Use Case Diagram / Use Case document for the general flow of the application. 

Note: currently there is no score saving since the level isn't complete (we don't have a win condition yet).

Shoutout our awesome team of developers for each of those pages.
- MainMenu: @cmgilger, @samdev193, @LT69018, @David-B-M, @ampham03
- StartGame: @David-B-M @LT69018
- ChooseLevel: @cmgilger
- PauseMenu/LevelFail: @samdev193
- ViewLeaderboard: @ampham03
- LevelExample: @ampham03 
<figure>
    <img src="current_appearance/MainMenu_4_4.jpg" height="300px">
    <figcaption>Main Menu Screen as of 4-4. ChooseLevel navigates to ChooseLevel page, rest are not functional. Credits - Connor, Jess, David. Moving background as of 4-9 (Credits - Anna).</figcaption>
</figure>

<figure>
    <img src="current_appearance/StartGame_4-9.jpg" height="300px">
    <figcaption>Start Game Screen as of 4-9. Credits: David. Currently shows skeleton saves for the user to choose from. This will soon show the actual users that have been saved the the database. Basically allow the user to change "who" they play as, i.e. against their friends on the same computer, if they already saved their name. When they press [New Game] they will be prompted to enter their name.</figcaption>
</figure>

<figure>
    <img src="current_appearance/ChooseLevel4-9.png" height="300px">
    <figcaption>ChooseLevel screen as of 4-9. Credits: @cmgilger </figcaption>
</figure>

<figure>
    <img src="current_appearance/ViewLeaderboard 4-9.png" height="300px">
    <figcaption>ViewLeaderboard as of 4-9.</figcaption>
</figure>

<figure>
    <img src="current_appearance/LevelExample 4-9.png" height="300px">
    <figcaption>LevelExample as of 4-9. Level is playable. To jump, press the up arrow key. The game will freeze if you hit a rock or when time runs out. Credits: Anna.</figcaption>
</figure>

# Sprint 1 - Design
<figure>
    <img src="./about_images/himalayan_cat.jpg" height="300px">
    <!-- source: https://www.dreamstime.com/hand-drawn-himalayan-cat-vector-illustration-hand-drawn-himalayan-cat-image131123437 -->
    <figcaption>Current concept of the sprite for the game character!</figcaption>
</figure>

## Game concept
Picture this. 

You're the cute himalayan cat shown above born and raised in the himalayan mountains.

You love to ski and you have your heart set on winning the upcoming winter olympics which are in your very own backyard.
<figure>
    <img src="./about_images/snowy_mountains.jpg" height="300px">
    <!-- source: https://www.freepik.com/premium-vector/snowy-mountains-fir-trees-starry-sky-pixel-art-game-location-8-bit-retro-backdrop-seamless_36462427.htm7 -->
    <figcaption>Current concept of background landscape!</figcaption>
</figure>

You know it won't be easy, with at least 3 trials of increasing difficulty you have to pass to take home the goal. But you're brave, and are going to give it your best shot.

# Full Product

**Come back on 5/2/2024 to play and compete for the #1 gold medal!**
<figure>
    <img src="./about_images/gold_medal.jpg" height="100px">
    <!-- source: https://www.freepik.com/premium-vector/snowy-mountains-fir-trees-starry-sky-pixel-art-game-location-8-bit-retro-backdrop-seamless_36462427.htm7 -->
    <figcaption>The gold medal you want to win!</figcaption>
</figure>

Feel free to check out our 
<a href="./docs/Use-Case-Document_CMSC447-Himalayans.pdf">Use Case Document</a> 
for more!


# Course Reference
This work is originally created for our Software Engineering I course (<a href="https://www.csee.umbc.edu/cmsc-447-syllabus/">see the CMSC447 website here</a>) in Spring 2024
at <a href="https://umbc.edu/">UMBC</a>
with <a href="https://redirect.cs.umbc.edu/people/faculty/nick-allgood/">Prof. Nick Allgood</a>. 



# Who We Are
You can contact our team at <a>everest-the-olympicat@googlegroups.com</a>

Anna Pham
- Github: https://github.com/ampham03
- Email: apham6@umbc.edu

Jessica Turner
- Github: https://github.com/LT69018
- Email: jturner3@umbc.edu

Connor Gilger
- Github: https://github.com/cmgilger
- Email: cgilger1@umbc.edu

David Middour
- Github: https://github.com/David-B-M
- Email: dmiddou1@umbc.edu

Samuel Oyeneyin
- Github: https://github.com/samdev193
- Email: soyeneyin@umbc.edu


# Notes about our Branches
## Anna's Branch: 
Currently working on an example level using Phaser
- implemented an endless runner concept
- created a moving background with a static player
- created obstacles to avoid and items to collect for points
- level ends when player hits an obstacle or time runs out
## Jess' Branch: 
Will be where I implement the StartGame and ChooseLevel Page.
- I originally implemented them using classes and custom page switching,
but I was overcomplicating it :p 
- Stashed that code in `backup-frontend-class-components`
- I will pull sam's updated main so that we are both the same page.

Connors Branch:
@LT69018 Todo: add a skeleton HTML page for him to add buttons to.

Main Branch: (what have we all agreed on)
- App that switches between different pages 

## David's Branch:
<figure>
    <img src="current_appearance/StartGame_4-9.jpg" height="300px">
</figure>
Worked on the StartGame page GUI.
- button functionality to traverse between pages
- displays current example saved games
- added css file and image for StartGame styling
