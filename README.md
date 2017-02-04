meteor-webapp-tesi
==================

Academic Dissertation Project for my final exam in [University of Bologna](http://www.unibo.it/en/homepage).

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/christianascone/meteor-webapp-tesi/blob/master/LICENSE)

> - [MeteorJS](https://www.meteor.com)

> - [BlazeJS](http://blazejs.org)

## Meteor Packages

> - [Zodiase](https://github.com/Zodiase/meteor-mdl) and [Material Design Lite](https://getmdl.io/index.html)

> - [Meteor Collection Helpers](https://github.com/dburles/meteor-collection-helpers)

> - [Iron-router](https://github.com/iron-meteor/iron-router)

> - [msavin/Mongol](https://github.com/msavin/Mongol)

> - [tap-i18n](https://github.com/TAPevents/tap-i18n)

> - [Meteor Wrapper for HighCharts](https://github.com/MaazAli/Meteor-HighCharts)

> - [Highcharts Solid Gauges](https://github.com/MaazAli/highcharts-gauge)


## Getting Started

### Installing

Move inside meteor directory and run:
```
meteor npm install
```
```
meteor
```
Dependencies will be downloaded.

### Configuration (Optional)

This project uses a settings file for some optional features.

Place a `settings.json` in meteor directory.

```javascript
{
  "public": {
    "RECIPIENT_MAIL_ADDRESS": "recipient@domain.com",
    "SENDER_MAIL_ADDRESS": "sender@domain.com",
    "MAX_GAME": 5,
    "CARDS_NUMBER": 16,
    "ENVIRONMENT":{
      "FULL": true
    }
  },
  "private": {
    "DEBUG": false,
    "LOGS_ENABLED": true,
    "MAIL_URL": "smtp://USERNAME%40DOMAIN:PASSWORD@HOST:PORT/"
  }
}
```

This project uses [Meteor Mail package](https://docs.meteor.com/api/email.html) to send some data but it is not necessary.
If you want to configure it, the MAIL_URL environment variable can be set in setting file with the email address of recipient who will receive messages and email address of sender.

**Pay attention**: special characters (for example @ and /) in MAIL_URL, must be escaped with hex code to be valid.

Other settings provide default values, but they can be customized:

- Private
 - DEBUG means if the environment is production or development (**false is default value**).

 - LOGS_ENABLED means if it should log user behavior in MongoDB (**true is default value**).
   
- Public   
 - MAX_GAME is the number of task for each series (**5 is default value**).
   
 - CARDS_NUMBER is the (even) number of cards for memory game (**16 is default value**).
   
 - ENVIRONMENT.FULL is the boolean value for fully gamified environment, or minimal (**true is default value**).

Run
```
meteor --settings settings.json
```


### Setup (Debug only)

1. Register a new user in homepage and login.
2. Click on **setup tab**
3. Insert the preferred total score to use (meant as the final score the real player will gain after tasks)
4. Click **Create new mock data**

Mock users will be created and added to leaderboard, using the given score.

It is possible to clear users with **Clear mock data** button.

## Browsers support <sub><sup><sub><sub>made by <a href="https://godban.github.io">godban</a></sub></sub></sup></sub>

Tested browsers

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :---------: | :---------: | :---------: |
| 51.0.1 | 55.0.2883.95| 10.0.2

## Credits

### Images

[Main logo](https://github.com/christianascone/meteor-webapp-tesi/blob/master/meteor/TesiMagistrale/public/images/logo.svg) by [Aybigeaya](https://thenounproject.com/aybigeaya/) is licensed under [CC BY 3.0 US](https://creativecommons.org/licenses/by/3.0/us/). ([Original file](https://thenounproject.com/term/screen-game/616239/))

Edited with [Android Material Shadow Generator](https://android-material-icon-generator.bitdroid.de/) licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)

Leaderboard images ([1](https://github.com/christianascone/meteor-webapp-tesi/blob/master/meteor/TesiMagistrale/public/images/pole-1.svg), [2](https://github.com/christianascone/meteor-webapp-tesi/blob/master/meteor/TesiMagistrale/public/images/pole-2.svg), [3](https://github.com/christianascone/meteor-webapp-tesi/blob/master/meteor/TesiMagistrale/public/images/pole-3.svg)) by [YouToDesign](http://www.youtodesign.com) is licensed under [Creative Commons Attribution](https://creativecommons.org/licenses/by/4.0/). ([Original file](http://www.youtodesign.com/Vector/LogosIcons/2014/0729/2765.html))

Memory cards images:
> - [Howl's moving castle](http://i.imgur.com/HzFbUWC.jpg)
> - [Howl's moving castle 2](http://www.gatto999.it/images/stories/Movie/Howls%20Moving%20Castle%20(4).jpg)
> - [Chocobo](http://vignette1.wikia.nocookie.net/ssb-allstars/images/f/fc/CT_Chocobo.png/revision/latest?cb=20130908001258)
> - [Cloud Strife](http://s267.photobucket.com/user/Animecrazy9161/media/Final%20fantasy/CloudStrife4.jpg.html)
> - [Totoro](http://1.bp.blogspot.com/-6-rpLsC-nGM/UVGFxHnjNFI/AAAAAAAAA7Y/j1qbh2_jdEg/s1600/totoro_by_noodlecutie123-d3j76oj.png)
> - [Yoda](http://orig09.deviantart.net/d3f0/f/2013/152/8/9/yoda_is_cool__by_yellow_submarine7-d67hyss.png) by DeviantArt
> - [Laputa's Castle](http://img00.deviantart.net/839e/i/2015/182/0/d/laputa__castle_in_the_sky_over_achensee___wp_by_fantasio-d8zco4i.jpg) by DeviantArt
> - [Pikachu in Charizard Costume](https://s-media-cache-ak0.pinimg.com/originals/98/2c/d8/982cd88ff2d4285eb3596073b14272ad.jpg)
> - [Unknown symbol](http://destiny.wikia.com/wiki/File:Unknown_License.png) by [T3CHNOCIDE](http://destiny.wikia.com/wiki/User:T3CHNOCIDE) licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)

### Dependencies

[Highcharts](http://www.highcharts.com/) by [Highsoft](http://www.highcharts.com/about) licensed under [CC BY-NC 3.0](https://creativecommons.org/licenses/by-nc/3.0/)

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT).