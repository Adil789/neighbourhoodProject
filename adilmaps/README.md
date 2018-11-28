#Neighborhood-react-map
1. Here we are going to do neighborhood map react in single page web application using react.
2. it displays the interest places in google map. 
3. we can search any place including landmarks and the additional information is shown in FOURSQUARE APIs.

#how to get the map and how to install the modules.
* create-react-app project-name

npm install --save google-maps-react.
npm cache clean --force.
1.  A new browser window open automatically displaying the app.  
2. If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.
3. Here, we have used the Foursquare site for complete details regarding the location.

#how to run this project in production mode.
1. Run the project in the production build by using the command `npm run build`
2. Now, run the static server by using the command `npm install -g serve`
3. After running the above command then use the command `serve -s build`
4. Now, we will see that the prpoject is being hosted in a [http://localhost:5000/](http://localhost:5000/)
5. The cache is being stored in the localserver:5000 and is now available for offline use.

##features
1. I have selected some landmarks on the map for this project.
2. here we have 'search here' box in this we can find selected locations.
3. click the button 'show/hide places' box to hide and show the suggestions list.
4. click anywhere on the map to close the information window that opens.
5. click on the selected place and there we get infomation in foursquare APIs.
