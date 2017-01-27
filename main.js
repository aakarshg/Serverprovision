var needle = require("needle");
var os = require("os");
var fs=require("fs");
var aw=require("./ec2_request.js")
var myobj={};

var config = {};
//config.token = "";

var headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + config.token
};

var client = {

    createDroplet: function(dropletName, region, imageName, onResponse) {
        var data = {
            "name": dropletName,
            "region": region,
            "size": "512mb",
            "image": imageName,
            // Id to ssh_key already associated with account.
            //"ssh_keys": [],
            //"ssh_keys":null,
            "backups": false,
            "ipv6": false,
            "user_data": null,
            "private_networking": null
        };

        console.log("Attempting to create: " + JSON.stringify(data));

        needle.post("https://api.digitalocean.com/v2/droplets", data, {
            headers: headers,
            json: true
        }, onResponse);
    },
    getDropletInfo: function(dropletID, onResponse) {
        needle.get(`https://api.digitalocean.com/v2/droplets/${dropletID}`, {
            headers: headers
        }, onResponse)
    },
    deleteDroplet: function(dropletID, onResponse) {
        needle.delete(`https://api.digitalocean.com/v2/droplets/${dropletID}`, null,{
            headers: headers,

        }, onResponse)
    }

};

// to Create an droplet with the specified name, region, and image
// Comment out when completed. ONLY RUN ONCE!!!!!
// Write down/copy droplet id.

var name = "agopi" + os.hostname();
var region = "nyc3"; 
var image = "ubuntu-14-04-x64"; 
client.createDroplet(name, region, image, function(err, resp, body) {

 if (resp.headers) {
        console.log("\n\n\nCalls remaining", resp.headers["ratelimit-remaining"]);
    }
    console.log("Creating a droplet");
    // StatusCode 202 - Means server accepted request.
    if (!err && resp.statusCode == 202) {
        console.log("Created successfully droplet id is",body.droplet.id);
        myobj.dropletID=body.droplet.id;
        getinfo();
    }
    
    else{
            console.log("Digitalocean is not able to provision so switching to aws");
            aw.runaws();
    }
    
});

function getinfo(){
    var dropletId=myobj.dropletID;
    client.getDropletInfo(dropletId, function(err, resp, body) {

    console.log("Getting IP address");
    // console.log(body);
    var ipadd = resp.body;
    // StatusCode 202 - Means server accepted request.
    if (!err) {
        console.log("The IP address is:" + ipadd.droplet.networks.v4[0].ip_address);

     fs.writeFile('output.txt',ipadd.droplet.networks.v4[0].ip_address,function(err){
         if (err){
             return console.error(err);
         }
         console.log("Ip address written successfully");
     });
     
    }
});
}

//end of create 
//To delete the droplet please enter the dropletId in the below line and uncomment the creation part
/*
var dropletId=myobj.dropletID;
var dropletId="38168206";
client.deleteDroplet(dropletId, function(err, resp, body) {

    console.log("Deleting the droplet ");
    var droplet = resp;
    // StatusCode 204 - Means server accepted request.

    if (!err && resp.statusCode == 204) {
        console.log("Deleted!");
    }
});
*/
//end of delete
