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

Q1. Define idempotency. Give two examples of an idempotent operation and non-idempotent operation.

An operation is defined as idempotent if the result remains constant and doesn't depend on the number of times the operation has been called. For ex: Setting a variable i's value as 1. Irrespective of the number of times we call this operation, the result doesn't vary i.e.  the variable i's value is being set to 1. But take the example of decrement operator, the variables value will keep decreasing, thus its not idempotent, as the result keeps varying. 

Examples of Idempotent Operation:
* HTTP GET: This operation will be ideally returning the same value as long as server's state doesn't change
* HTTP HEAD: Just like GET, this will also be ideally returning just the header as long as the server's state doesn't change.

Examples of Non-Idempotent Operation:
* Append operation on a file: It will keep appending the same value in the file, therefore it can't be said as an idempotent operation as the value keeps changing.
* Ping operation: Practically speaking the value will keep changing thus it's not idempotent.


Q2. Describe several issues related to management of your inventory.



Q3. Describe two configuration models. What are disadvantages and advantages of each model?
The two models are Push based and Pull Based.

Push Based Configuration System:

In push based configuration system, the server is responsible for pushing configuration and other important softwares to the nodes where it installs them remotely. Thus, server takes care of configuration of nodes in Push based configuration system.

Advantages:
1. Since the master is responsible for configuring and deployment of nodes, it can orchestrate the node deployment. This would be definitely helpful in scenarios where a particular set of nodes. 
2. It is easier to manage when compared to Pull Based system.


Disadvantages:
1. Because server is in charge of configuring, it becomes cumbersome when trying to scale like if you want to deploy 100 images simultaneously it'd load to performance issues.
2. Independent configuration is not usually possible i.e. to boot a new node and have it configure on its own(basically the idea of pull based system).

Pull Based Configuration System:

In pull based configuration system, the individual nodes contact the master server and request their configuration and other importnat softwares and configure themselves. Thus, the individual nodes are responsible for configuration in Pull based configuration system.

Advantages:
1. The nodes can continue configuration of themselves without the intervention of master, thus not impacting the performance of master. Thus scaling becomes comparitively easier as the new nodes that come in just setup on their own after getting instructions from master.
2. It is better at ensuring that the nodes stay in sync.

Disadvantages:
1. In case of instaneous deployment, it'd impact performance of master server because all the nodes will be se ding a request to master server. 
2. Security is a big concern because it connects back to the master server. 

Q4. What are some of the consquences of not having proper configuration management?


