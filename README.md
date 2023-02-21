# susdeck
Susdeck is a "soundboard" meant to model a Stream Deck with macro capabilities.  
Susdeck does not play sounds, it is meant to control your computer with minimal ease like a Stream Deck.  
You'll need to set up your own soundboard, keybinds, icons (if wanted) if you want a setup like mine.  
For the soundboard, I recommend [Soundux](https://github.com/Soundux/Soundux).  
So far, Susdeck only officially supports iOS. 

## How do I use Susdeck?
Clone the repo, then change `Settings.js.default` to only have it's extension `.js`.  
Next, modify the settings however you want, you can add authentication, a password, and a message for when somebody tries to login to your Susdeck.  
Now, for the fun part. Run `npm i` and then `node .`.  
Now your computer is hosting a server on port 3000. Get any iOS device and go to `yourlocalip:3000` in Safari.  
Now, add the app to your home screen by pressing the share button.  
Next, open the app on your device. It will be full screen.  
**Susdeck is best viewed in landscape/horizontal mode.**  
There are preloaded keys, for example `Shooting` will press Alt+F24 - it is meant to be a keybind in a soundboard.

## How do I make my own sounds/macros?
Susdeck processes keys at the front-end, and it uses robotjs to press them on your computer.  
It is very easy to add your own macros/sounds.  
All you need to do is edit `app/sounds.js` to your liking.  
**Icons are not required for any macro/sound!**  

## Tested Devices
Susdeck has not had many devices tested on it. Information on how to contribute to testing will be added later. For now, these are the officially supported devices.
| Tested Device      | Does it work? | Is it practical? | Does it look good? | Final Notes                                  |
|--------------------|---------------|------------------|--------------------|----------------------------------------------|
| iPod Touch 7th Gen | Yes.          | Yes.             | Yes.               | Susdeck was made for the iPod Touch 7th gen  |
| iPhone 12          | Yes.          | Yes.             | Yes.           | No comment |
| Desktop         | Yes.          | No.             | Meh.           | Susdeck is made for touchscreen devices when you can't instantly press a key. |
## Closing Notes
Do not mind the occasional reference to 'Onyx', that is a super not secret codename for Susdeck.
