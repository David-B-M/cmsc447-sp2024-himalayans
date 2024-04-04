# Frontend for "Everest the Olympicat"

If this is the first time you are getting ready to run this application,
make sure to run `npm install`.
After that you can run `npm start`

# Comments about Development.

I, @LT69018, am creating a mechanism to switch between which page is rendered by App.js
This is a draft and we can do it a different way if that works out better, 
but this is how I know to implement pages, 
so if this works for yall, 
let's stick with it and make sure we're consistently on the same wavelength 
(have the same idea.)

## First create your page.
See `App.js` and `Pages/MainMenu.js` for how to export your component and import it in the app.

Similarly, feel free to follow these instructions for a more in depth explanation.

1. To start, make a file called `NewPage.js` (preferably something more descriptive)
```js
import React, {Component} from 'react';

class NewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      {/*This is how you comment in an HTML section of React. */}
      <h1 style={{ textAlign: 'center' }}>Code will go here</h1>
    );
  }
}

export default NewPage; // <- IMPORTANT: make sure to export your page. 
// Use a name consistent with the component name you defined above
```

2. Import that component to `App.js`
```js
/* --------------------- IMPORTING CUSTOM PAGES --------------------- */
// Note to other frontend folk: 
// import your page (component) here!
import MainMenu from './Pages/MainMenu.js';
// ... 
import NewPage from './Pages/NewPage.js'; // <- YOURS GOES HERE
/* ------------------------------------------------------------------ */
```

## After creating a page, make it accessible to other pages through App.js

these are the steps I recommend to link it to the App. 
1. Add a constant to this dictionary (key) to represent the page you're implementing
`Frontend/Constants/pageNumbers.js`
```js
const pageNumbers = {
  MainMenu: 1,
  ChooseLevel: 2,
  // your new page goes here, i.e. MyNewPage: 10
};
```

2. Go to `App.js` and add a condition that compares the current page state to pages.NewPage
```js
render() {
    if (currentPageNum === pageNumbers.MainMenu) {
      console.log("In App.js - Switching to Main Menu page.");
      return (<div><MainMenu/></div>);
    } else if (currentPageNum === pageNumbers.ChooseLevel) {
      // ...
    } else if (currentPageNum === pageNumbers.NewPage) { // <- YOU ADD THIS 
      // ...
      console.log("In App.js - Switching to NEW page.");
      return (<div><NewPage/></div>);
    } 
}
```

3. For now, that's it! Later we'll worry about actually switching between the pages i.e. when buttons are pressed. You'll likely use some props to change the App state. Feel free to ping me with questions about this.


# React Reference
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
