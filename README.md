# PushApp

![React Native version](https://img.shields.io/badge/react--native-0.59.8-blue.svg)

A No BS Platform for Entrepreneurs.

## Project Structure

|── **App.js**

|── **NavigationService.js**

|── **\_\_tests\_\_**

|── android

|── **app**

|     ├── **Components**

|     └── assets

|── app.json

|── babel.config.js

|── gen

|── index.js

|── ios

|── metro.config.js

|── node_modules

|── package.json

|── yarn-error.log

└── yarn.lock

## Modules

### App.js

Entrypoint for the app. Routes and Navigation are defined here.

**Loading** is the first component to be mounted in the App. getUserID searches local storage for existing user credentials and navigates accordingly.
_ActivityIndicator_ & _StatusBar_ are imported from `react-native`

**RootStack** is the main navigation Switch(unrelated/back-navigation-diabled). The functions used inside are imported from `react-navigation`. Default routes (loading and landing) and three main stacks (AuthStack, RegistrationStack and UserStack) fall under it.
Each of these stacks have their own child routes wrapped in a Stack/Tab navigator and have their own properties for design,transitions and actions defined.

**SafeAreaMaterialTopTabBar()** wraps the navbar in the UserStack in a _SafeAreaView_.

**App** is the root component on which the RootStack is reference is added. Various component life cycle functions handle external deep linking to respective pages (only supports _pushapp://login?code=\*_ for linkedIn callbacks from the browser).

### NavigationService

Directly extends from [react-navigation](https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html).
Example usage:

```
// any js module
import NavigationService from 'path-to-NavigationService.js';

// ...

NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
```

### app/assets

Contains all of the fonts and images used across Pushapp in fonts/ and images/ respectively.

### app/Components

Contains all of the components used in PushApp. Each component has its own styles.js and subcomponents as separate .js files.

#### Landing

The whole screen is wrapped in a Content (Header and Footer are skipped almost everywhere) under Container (as reccommended by `native-base`). This is in turn wrapped in a SafeAreaView to accomodate the newer screen sizes (and notches).
There are three image-header AnimatedViews. All of them have their initial positions set in the state variable along with opacities (in a list, the indices of which will correspond to different screens). This helps us perform animated switches between them using the TouchableOpacity on the screen. There is a screen indicator (we'll call it a navbar) below these views which undergoes a subtle transition as well. Various functions are used to manage the transitions. The show() and hide() functions take in the state variables for position(x), opacity(op), and the width of the active navbar(navbar). The navbar is basically three fixed views with a lighter color on which three darker, active colored views are superimposed and whose width are animated from 0 to their full width.
Move() takes in the page offset and performs the required transition (pressing on the navbar switches screens too which complicates things for 2 page transitions) and the NavMove takes care of the navbar toggle. The icon on the button also udergoes a transition when it reaches the last screen. componentDidMount() animates the first screen.

In the styles.js, `react-native-extra-dimensions-android` and are used to fix the SafeAreaView's height taking the minimizable status bar into consideration. `react-native-responsive-screen` is used to convert dimension percentage to pixels.

#### Login

This folder contains two pages, **login.js** and **confirm.js**.
**login.js** Follows the same layout patterns as in landing. A Loader Component adds a view to fill up the entire screen with a circular indicator when required (This should probably be extended to all screens to indicate background fetches and the like). Since this page is accessible via deeplinking, a timestamp and the token last authorised are maintained as state variables with every request that it receives in order to ignore repeated requests and a possibly non-dismissable loading screen.
The loginPress handles the redirecting to the backend (via the browser) to facilitate the linkedIn login process. When a response is received, the backend directly redirects to the app along with the authorisation code. This is sent as a prop (from the functions handling deep-linking from App.js) and is used to send an api call to the backend to receive login details. Once received, the app navigates to the confirm screen.

In the **confirm.js** screen, once the user taps on confirm, the profile gets saved locally and redirects to the Registration screen. (Ideally, a JWT should be received from the backend and stored instead.)

#### Register

This folder contains two main pages, **register.js** and **interests.js**.
In **register.js** input fields are validated using regExp using the validator() function. The whole field is made An endValidator() takes care of shifting the field-colors back to normal and adding a check-mark if valid once the field editing is complete. A formValidator() is used to validate the entire form on submission. Register() is called to send a post call to the api (Ideally to store details in a db) and to save the profile locally. The fields are wholly contained in a TouchableOpacity (focussing TextInput onClick) for better UX.

In **interests.js** (_probably the best of all screens yet_) FlatList and ScrollViews are implemented. A lot of Animations are used to prevent sudden movements and a _transitioning_ state variable to prevent all user interactions (used in onClick functions) for non-breaking animations. The viewRef and errorOverlay state variables are used to manage the BlurView (`@react-native-community/blur`) and the dialog that opens along with it. The fetching variable displays an indicator when the interests are being received from the backend. The Icon and searchBar variables maintain the animated values used to expand the searchBar. ContinueButBot pushes down the button when the search overlay comes up. selectedInterests and Interests store objects of interest data. Functions are used to facilitate animations and are passed to the SearchOverlay component as props to be called so that a uniform and an unhindering tranisition occurs. A lot of these use setTimeouts to keep the transitions synchronous.

**searchOverlay.js** contains the SearchOverlay component and receives props to update the interests in its parent's state when new interests are added. Since interests can also be tapped on to add or remove them, it complicates things as we also have to check with selectedInterests before rendering them on the screen. This is done using functions defined. Actual api calls are used (but dummy data :P) which should make it easy to hook it up once the backend is complete.

**utils.js** contains SelectedInterest and Interest components which styles them with overlays and circular views, used by across other components.

#### User

This folder contains three main files **archive.js**, **home.js** and **profile.js**.
The navbar design is done in App.js

**archive.js** contains horizontally scrollable flatlists for posts and events. Each card is a component imported from **utils.js** in this folder.

**home.js** is similar to archive.js but posts can be expanded here (with bugs in android!). PushNotification cards are also used.

**searchOverlay** has its basic structure copied from Register for now and doesn't have any functionalities.

**utils.js** is probably the most important file in this folder as it contains all of the sub-components used. MainCard (for posts), NotificationCard and TrendsCard(which also uses the ThumbnailCard). The NotificationCard receives a type prop which defines the title and the image used on its right along with details to be displayed. All of these cards receive props which define the details to be rendered. Images used will be cropped to fit the ratios in each of them so we should take care when creating images for posts and events in the backend.

## TBD

- Develop a backend architecture as cool as the frontend.
- Create a database.
- Launch a minimal v0.1 for the core team
- Plan an amazing launch event for the app (Apple-like) possibly demonstrating the problems faced now and how PushApp solves them all in addition to the cool new features.
