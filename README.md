# FCC-URL-Shortener-Microservice
This project was coded as part of the FreeCodeCamp Apis and Microservices Projects - URL Shortener Microservice. You can also try it out here:

## To use this:
1. Ensure you have node.js installed. If not install from https://nodejs.org/en/
2. Clone/download this repo
3. (Skip this if you used git clone) Unzip the downloaded file. 
4. Open command prompt (for windows, win + r -> cmd -> enter)
5. Change directory into the FCC-Timestamp-Microservice folder
6. This project needs express,cors, mongodb, mongoose & body-parser, do install using npm if you do not have it
7. Refer to the server.js on where to append the connection string of your database (You can create and account and the database in https://mlab.com/), afterwhich get the connection string for this database and paste it into my placeholder, const uri = <INSERT-CONNECTION-STRING-HERE>; 
8. Run the command Node server.js, you should get a reply of "Your app is listening on port 50023" (50023 is the port i specified to listen on)
9. Now go your localhost with the assigned port, 127.0.0.1:50023 and refer to that for usages

# If you want to try doing this project:
You can either visit http://freecodecamp.com
OR
Clone the base Repo from FCC: https://github.com/freeCodeCamp/boilerplate-project-urlshortener/
and Ensure that you meet all the User Stories below:

# User Stories :
1. I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
  Example : {"original_url":"www.google.com","short_url":1}
2. If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error   like {"error":"invalid URL"}
  HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
3. When I visit the shortened URL, it will redirect me to my original link.
