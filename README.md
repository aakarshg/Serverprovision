# HW1-A
###Provisioning Servers
The main.js contains code to provision an ubuntu-14-04-x64 image from digitalocean's nyc server. In case of any issue occuring, and say if we arent able to provision from digitalocean, this code will call another module ec2_request.js's function runaws(). The runaws will basically create an instance and run it. 

####INSTRUCTIONS
* Install required dependencies by `npm install`. 
* Add configuration token for Digital ocean at line 8 of main.js and uncomment it. 
* Also update sshkeys on line 24 of main.js for digital ocean
* To create an aws instance directly, you can uncomment line 62 in ec2_request.js file and run it directly using 
`node ec2_request.js`.
* Please create the credentials json file in same directory for aws code api to work properly. Please follow http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-json-file.html


####NOTE:
* The IP address will be saved in 'output.txt' file.
* After creating a droplet using digital ocean, please comment from line 56 to line 101.
* To delete the droplet uncomment line 104 to 117 and edit droplet id on line 106.
* Please don't run create droplet more than once. 

###Screencast
Here's the link to screencast: http://screencast-o-matic.com/watch/cbVOVHQMpQ

* Please use `node main.js` to run the script this way after following the first 3 instructions given above.

###Configuration Management
All the dependencies are mentioned in packages.json file, therefore make sure to `npm install` in the directory to install necessary dependencies before running the js scripts. 

The required dependencies are as follows:
* needle
* aws-sdk
* os
* fs

###Concepts
1. Define idempotency. Give two examples of an idempotent operation and non-idempotent operation.
An operation is defined as idempotent if the result remains constant and doesn't depend on the number of times the operation has been called. For ex: Setting a variable i's value as 1. Irrespective of the number of times we call this operation, the result doesn't vary i.e.  the variable i's value is being set to 1. But take the example of increment operator, the variables value will keep increasing, thus its not idempotent.

Examples of Idempotent Operation:
* asda
* dasd

Examples of Non-Idempotent Operation:
* asd
* asd


2. Describe several issues related to management of your inventory.



3. Describe two configuration models. What are disadvantages and advantages of each model?



4. What are some of the consquences of not having proper configuration management?
