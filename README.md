## A tool to create your own Chinese characters (汉字)


### Why?
Inventive new Chinese characters have been used as artistic protest before, including:
TK
HK example

### Setup

This project uses [middleman](https://middlemanapp.com/), a static site generator and deploys to github pages.

The page itself uses [fabricjs](http://fabricjs.com/).

To get middleman set up, make sure you have [rvm](https://rvm.io/) installed as well as [nvm](https://github.com/nvm-sh/nvm). I had to use ruby 2.6.2 and node 8+ to get middleman working on my machine.

### To deploy

The project uses middleman deploy to deploy to [https://xrwang.github.io/thenuhanzi/](https://xrwang.github.io/thenuhanzi/).
Simply run:
```
bundle exec middleman deploy
```
From the master branch, after you have merged your changes in.
