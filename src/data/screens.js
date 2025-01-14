// Menus is an array for screens
// We will store here different screens, which we will need in game
// also this is very useful if we have multiple screens

// each screens will have own id, it should be same with an id in html
// if you want to add a screens, you just have to add one more element here
// "best practice" create a constant in screens-constants.js and then add it here
// "you can do it" write a string inside 'my-id'

// each screens needs id
// key, to trigger event, for example help screens or pause
// optionally background
// array of screens selectors, which should be shown also with picked screens
// object with routes
// each property of this object is like a key -> value
// on the left is the html selector of your button
// on the right is the selector of next screens or action, from screens-actions.js

import {mainMenuSelector, pauseMenuSelector, areYouSureMenuSelector, chooseLevel, victorySelector} from "./menu-constants.js"
import MenuScreen from "../classes/screens/menu-screen.js";
import ScreenTrigger from "../classes/screens/screen-trigger.js";
import {GameScreen} from "../classes/screens/game-screen.js";
import Button from "../base-classes/button.js";
import GameFrameScreen from "../classes/screens/game-frame.js";

export const screens = [
  // main screens
  new MenuScreen({
    selector: mainMenuSelector,
    name: 'Main menu',
    id: mainMenuSelector,
    backgroundSelector: '#main-menu-background',
    triggers: [
      new ScreenTrigger({selector: '#yes-main-menu', evtType: 'click'}),
      new ScreenTrigger({selector: '#go-back-to-main-menu', evtType: 'click'}),
      new ScreenTrigger({selector: '#go-to-main-menu-from-victory', evtType: 'click'})
    ],
    // buttons: [
    //   new Button({id: 'some-id', label: 'this is my button', classList: 'btn btn-primary', dataLevelId: 'test'})
    // ]
  }),
  new MenuScreen({
    selector: chooseLevel,
    name: 'Level auswählen',
    id: chooseLevel,
    backgroundSelector: '#main-menu-background',
    triggers: [
      new ScreenTrigger({selector: '#main-menu-choose-level', evtType: 'click'}),
      new ScreenTrigger({selector: '#go-back-to-choose-level', evtType: 'click'}),
      new ScreenTrigger({selector: '#go-back-to-choose-level-2', evtType: 'click'}),
      new ScreenTrigger({selector: '#go-back-to-choose-level-3', evtType: 'click'})
    ]
  }),
  // Level Screens
  new MenuScreen({
    selector: '#level-preview-1',
    name: 'Level Name',
    id: 'level-preview-1',
    backgroundSelector: '#main-menu-background',
    triggers: [
      new ScreenTrigger({selector: '#choose-level-1', evtType: 'click'}),
    ]
  }),
  new MenuScreen({
    selector: '#level-preview-2',
    name: 'Leipzig',
    id: 'level-preview-2',
    backgroundSelector: '#main-menu-background',
    triggers: [
      new ScreenTrigger({selector: '#choose-level-2', evtType: 'click'})
    ]
  }),
new MenuScreen({
  selector: '#level-preview-3',
  name: 'Berlin',
  id: 'level-preview-3',
  backgroundSelector: '#main-menu-background',
  triggers: [
    new ScreenTrigger({selector: '#choose-level-3', evtType: 'click'})
  ]
}),
  // pause screens
  new MenuScreen({
    selector: pauseMenuSelector,
    name: 'Pause menu',
    id: pauseMenuSelector,
    triggers: [
      new ScreenTrigger({evtType: 'keydown', evtKey: 'Escape'}),
      new ScreenTrigger({evtType: 'click', selector: '#no-continue-pause'}),
    ],
    showWithMe: ['#my-canvas']
  }),
  new MenuScreen({
    selector: areYouSureMenuSelector,
    name: 'Are You Sure',
    id: areYouSureMenuSelector,
    triggers: [
      new ScreenTrigger({selector: '#go-to-main-menu', evtType: 'click'})
    ],
    showWithMe: ['#my-canvas']
  }),
  // canvas screens
  new GameFrameScreen({
    selector: '#game-frame',
    id: 'game-frame',
  }),
  new GameScreen({
    selector: '#my-canvas',
    name: 'My Canvas',
    id: 'my-canvas',
    backgroundSelector: '#game-background',
    triggers: [
      new ScreenTrigger({selector: '#main-menu-start-btn', evtType: 'click'}),
      new ScreenTrigger({selector: '#continue-btn', evtType: 'click'}),
      new ScreenTrigger({selector: '#start-level-1', evtType: 'click'}),
      new ScreenTrigger({selector: '#start-level-2', evtType: 'click'}),
      new ScreenTrigger({selector: '#start-level-3', evtType: 'click'})
    ],
    showWithMe: ['#my-jump-charging-bar', '#game-frame'],
  }),
  new GameScreen({
    selector: '#my-jump-charging-bar',
    name: 'Jump Charging',
    id: 'my-jump-charging-bar',
  }),

  //victory screen:
  new MenuScreen({
    selector: victorySelector,
    name: 'victory',
    id: victorySelector,
    showWithMe: ['#my-canvas', '#game-frame'],
    backgroundSelector: '#main-menu-background',
    })
]