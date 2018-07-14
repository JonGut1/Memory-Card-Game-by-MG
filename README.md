# Memory Card Game 

## Table of content

* [About] (#about)
* [How the game works] (#how the game works)
* [Resources] (#resources)
* [Dependencies] (#dependencies)
* [Known Bugs] (#kniwn bugs)


## About

**Memory card game** is a project I worked on in order to practice my _frontend_ skills (mainly JS). You play this game by clicking a card and trying to memorize the image on the back of it. When the images on two open cards match, they stay flipped, image up. After you manage to find all the image pairs the game is finished and your score is calculated. The score is caculated by taking into consideration the time it took you to match all the card pairs, how many moves you needed and how many stars you have left. All of this is visible on the panel above the card deck, so if you see that you're not doing as well as you wanted to, you can always reset the game, by clikcing reset button on the same panel. 

If you're proud of your performance you can write down your name/nickname, and post the score on the _Highscore_ wall. All the results will be stored in the _Highscore_ section, you can always see your achievements, by clicking on the _Highscore_ button. 

Hope you'll enjoy it and have fun playing it. 

## How the game works

All the gaming logic was built by using plain **JavaScript**. The game was styled and animations were created by using **CSS3**, although some of the interactive features, such as _modals_ and _buttons_ were manipulated by using **JavaScript**. All the primary elements were added wtih **HTML5**. 

## Dependencies

#### Styling 

_index.html_ - contains page structure. 
_normalize.css_ - used to make the default styling more consistent, for easier custom styling throughout the project.
_app.css_ - all the game's styling. 
_responsive.css_ -  used to make the page responsive on multiple screen sizes. 
_Google Fonts_ - styles the fonts of the text elements of the page. These fonts were used: (https://fonts.googleapis.com/css?family=Amatic+SC|Monoton|Poor+Story). 
_Bootsrap_ - used to add icons such as restart button, star icons and the game card icons. 


#### Game Logic

_app.js_ - used for all the game's logic. Makes the game interactice. Creates game mechanics. 
_Local Browser Storage_ - stores player's score with all the statistics (e.g. score, time, moves stars). Player statistics is stored only if the player chooses to, by inserting his name and cicking submit on the _Winner_ screen.  

## Known Bugs

Currently there is one known bug in _Internet Explorer_. The bug prevents the flip animation because _IE_ doesn't support `.matches()` method. This will be fixed in near future. 
