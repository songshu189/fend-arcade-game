## Frontend Nanodegree Arcade Game

This is an arcade game required for [udacity](https://www.udacity.com/) Frontend Web Developer Nanadegree, original project is from [here](https://github.com/udacity/frontend-nanodegree-arcade-game).

## Install

`$ git clone https://github.com/songshu189/fend-arcade-game`

## Files

The repository contains css, images, and js folders, as well as an index.html and a README.md file.
* The css folder contains a 'style.css' file which is used for styling setting page.
* The images folder contains the png image files, which are used when displaying the game.
* The js folder contains four javascript files for implementing the game strategies.
  * js/resources.js - This is simple an image loading utility. It eases the process of loading image files so that they can be used within your game. It also includes a simple "caching" layer so it will reuse cached images if you attempt to load the same image multiple times.
  * js/setting.js - Set parameters for the game. which shows and hides setting page, the setting parameters include player image, bug's minimum and maximum speed, number of bugs in the game, number of rows of bricks and grass.
  * js/engine.js - This file provides the game loop functionality (update entities and render) draws the initial game board on the screen, and then calls the update and render methods on your player and enemy objects
  * js/app.js - This file contains Enemy class and Player class, each has reset, update and render methods. The Player class also has a handleInput method to process arrow key input. There is a checkCollision method to check if Player and Bugs collide,  if they collide, then set a hit flag, at the next update, player returns to original position.
* index.html - opening index.html should load the game

## How to play

The goal of the player is to reach the water, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the game is reset and the player moves back to the start square. Once the player reaches the water the game is won, press space bar to continue play.

## License

This repository has no license yet.