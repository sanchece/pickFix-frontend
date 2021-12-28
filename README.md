# pickFix Frontend  
### URL
> [Visit pickFix](https://sable-able.surge.sh/login)   
### Overview
> pickFix is an online web application that provides a platform for local service providers and customers to connect. Customers can explore local services based on their geographical location and availability. Then customers can send project requests to contractors, where contractors can review, chat back and confirm or decline the project. 
 
 ### Backend
> This is full stack application where the backend is deployed elsewhere and can be found here: [pickFix-Backed](https://github.com/sanchece/pickFix-backend)  
 
### Features  
>* <strong>Single-page Frontend React Application </strong>
>* <strong>HTML Geolocation</strong> On login pickFix-frontend requests HTML Geolocation from the client and then sends it to pickFix-backend where it is stored in the pickfix-user_locations database.  
>* <strong>Google Maps API</strong> - User's location and contractors near the user's location are fetched from pickfix-user_locations database and then fed into the Google Map Component that is rendered in the Explore route.  
>* <strong>React Calendar</strong> - Project dates are fetched from pickfix-projects database and then populated in contractor's Calendar component where availability is displayed to potential customers. Calendars are also rendered in all user's profiles displaying all projects and requests sent. While public contractor's calendars only display confirmed projects and not requested projects.  
>* <strong> Password Bycryption </strong>
>* <strong> Authentication/Authorization </strong>
>* <strong> Token stored in client's Local Storage </strong>
>* <strong> Multi-device compatible front-end interface </strong>
>* <strong> Backend Data Handling </strong>
>* <strong> Database Data Storage </strong>


### Tech Stack
>* Google Calendar API
>   * [API Link](https://www.npmjs.com/package/google-map-react)
>   * Credentials required and can be declared in contractorList.js
>* React Big Calendar
>   * [API Link](https://www.npmjs.com/package/react-big-calendar)
>   * Credentials not required
>* HTML Geolocation API
>   * Credentials not Required [Link](https://www.w3schools.com/html/html5_geolocation.asp)
>   * Compatible browser required
>* Node Express
>   * [Express](https://expressjs.com/)
>* Node React
>   * [React](https://reactjs.org/)
>* PostgreSQL
>   * [psql](https://www.postgresql.org/)


### User Flow
>1. Sign In and Log In routes are available at first arrival.
>![image](https://user-images.githubusercontent.com/78108711/146651612-0180e075-65ea-4440-87de-c120f883a47d.png)
![image](https://user-images.githubusercontent.com/78108711/146651645-92b80d17-79fa-4379-8cde-1d598b4cd63a.png)

>2. After Signing in or Logging in you are welcomed to your <em>Profile</em> page. Confirmed and requested projects are displayed in your <em>Profile</em>'s calendar
![image](https://user-images.githubusercontent.com/78108711/146651760-dcf5f087-9fe8-4836-807f-e04307133d61.png)

>3. Customers can search for local services in <em>Explore</em>.  If you are a contractor you cannot search for other contractors hence <em>Explore</em> is not displayed.
>Clicking on a contractor a card will display showing you more details and button to request service.
![image](https://user-images.githubusercontent.com/78108711/146651834-9b92dc8c-865c-43fd-a4ce-53403136a651.png)
![image](https://user-images.githubusercontent.com/78108711/146651900-d618d844-83d0-46c5-996a-b187a52deaf8.png)

>4. When Clicking request service, a form appears where you can fill in details regarding the service you are requesting.
>![image](https://user-images.githubusercontent.com/78108711/146651929-5b6ec2e7-9a1a-4a31-99b7-fd217712aa9b.png)

>5. Once submitting a request, you can find requested projects in the <em>Requests</em> until they are Accepted or Declined
>![image](https://user-images.githubusercontent.com/78108711/146651929-5b6ec2e7-9a1a-4a31-99b7-fd217712aa9b.png)

>6. Accepted Projects can be found in the <em>Requests</em> route.
>![image](https://user-images.githubusercontent.com/78108711/146652074-89bac475-0db0-438f-99fe-5aad1d251ed4.png)

7.All projects/requests have a chat room so the contractor and customer can communicate.
![image](https://user-images.githubusercontent.com/78108711/146652100-faa8fcab-10f2-496a-9087-62f66378b861.png)

8. Log out to clear session






## Set up
In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
