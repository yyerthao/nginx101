## Yer Notes ##
* Configuration file for configuring nginx's reverse proxy
* We will reach out to our server to serve us our web content

*nginx will load all files in /usr/local/etc/nginx/servers/.

*To restart nginx after an upgrade:
*brew services restart nginx
*Or, if you don't want/need a background service you can just run:
*/usr/local/opt/nginx/bin/nginx -g daemon off;

## NOTES FROM VIDEO ##


1. We need an http context
http{
    server{ #Define a server, with directives to configure our nginx server
        listen 8080; #listens to port 8080
        root /Users/Yer.Thao/LearnRepos/NoobNginx; #root is the path of files to server
    

        #If we want to another location block with a specific number/another another
        #and we want to forward to the funnythings path
        # This is called a rewrite, not a direct so no need to call location block
        
        rewrite ^/jokecount/(\w+) /funnythings/$1; #

        # ^/number --> I want a number 
        # /() --> wrap it in braces
        #(\w+) --> just a variable 
        # /funnythings/
        # $1 --> variable that is (\w+)

        # Regular expressions
        location ~* /funnythings/[0-9] { # ~* will help us specificy this, as a regular expression
            root /Users/Yer.Thao/LearnRepos/NoobNginx;
            try_files /index.html =404;
        }


        # ROOT, no need to append /funnythings to path, nginx will find /funnythings from NoobNginx directory
        location /funnythings{
            root /Users/Yer.Thao/LearnRepos/NoobNginx;
        }

        # ALIAS
        location /toomuch {
            alias /Users/Yer.Thao/LearnRepos/NoobNginx/funnythings; #alias will help us not append to end offunnythings
        }

        # Try finding a path first, otherwise find other default paths, or throw an error
        location /jokes {
            root /Users/Yer.Thao/LearnRepos/NoobNginx; #use this file first 
            try_files /jokes/codepuns.html /index.html =404; # if can't find root path above, 
        }                                                    # try /jokes/codepuns.html 
                                                             # OTHERWISE try /index.html as a default 
                                                             # OTHERWISE throw 404 error


        # Working with redirect #
        location /davechapelle {
            return 307 /funnythings; #http code to redirect user to /funnythings
        }


    }###end server

    # types{ #Define our content-types
    #     text/css css; #Anything with text/css, will have css extention = .css
    #     text/html html; #Anything with text/html, will have html extensions = .html
    # }

    #Instead of above type context, we can use the below to include all mime types 
    include mime.types;
} ###end http context










# Need define this events context to get nginx to work, for now
events{}


### Command to save and reload nginx config changes ###
- nginx -s reload

#Configuring NGINX for Load Balancing 
- We need to scale our applications 
- We can build multiple servers within an infrastructure 
- How do we achieve this? 

NGINX will handle this 
--> NGXIN will forward the request to the next available server 
--> aka round robin request

We will need to build multiple servers, will do this through DOCKER
- Docker allows us to build isolated containers which we can spin up as much as we need to 


### How to spin up a server with Docker quickly ###
Create a directory called server, then index.js within it
npm init -y to initialize a node application 
npm install express (aka server)
Go to index.js and config the settings with below
    const express = require("express");

    const app = express();

    app.get("/", (req, res) => {
        res.send("Dave Chapelle endpoint");
    })

    app.listen(7777, ()=> {
        console.log('Yer listening to port 7777');
    });

Go to package.json to easily create a start script with below:
    "start": "node index"

Then npm run start in terminal and should see port listen message

- Google this quickly - docker file for express app
-  Grab the text under subtext: Your Dockerfile should now look like this:
- Paste into a new file in your server directory, called DockerFile
- run this command to create a server name: docker build . -t yerserver
- run this commend: docker run -p 1111:7777 -d yerserver
- create a total of 4 servers
    Yer.Thao@NA-300401 server % docker run -p 1111:7777 -d yerserver
        10c65efe2ca860550b9cdb241909dd58ce5961716466cef0591168f5126deaac
    Yer.Thao@NA-300401 server % docker run -p 2222:7777 -d yerserver
        e8918056e1b5b3a47c46ffb41f6bd9ae09aaf3a1ca1a30a37776bd0f59877a24
    Yer.Thao@NA-300401 server % docker run -p 3333:7777 -d yerserver
        6fb4d053552bf69931fb9c7d27c583ee535d8a900d7d5b953e41c918029a920c
    Yer.Thao@NA-300401 server % docker run -p 4444:7777 -d yerserver

- Remove root in nginx.config because once we hit localHost, we want no path since 
we want to server our BE 

