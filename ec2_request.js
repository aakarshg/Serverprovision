/*
   Copyright 2010-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
   This file is licensed under the Apache License, Version 2.0 (the "License").
   You may not use this file except in compliance with the License. A copy of
   the License is located at
    http://aws.amazon.com/apache2.0/
   This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied. See the License for the
   specific language governing permissions and limitations under the License.
*/

var fs=require("fs");
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
   ImageId: 'ami-0b33d91d', // amazon supported linux image that includes  Python, Ruby, Perl, and Java. The repositories include Docker, PHP, MySQL, PostgreSQL, and other packages
   InstanceType: 't2.micro',
   MinCount: 1,
   MaxCount: 1
};


// Create the instance


var runaws=function runaws(){
  ec2.runInstances(params, function(err, data) {
   if (err) {
      console.log("Could not create instance", err);
      return;
   }
   var instanceId = data.Instances[0].InstanceId;
   console.log("Created an aws instance", instanceId);
   // Add tags to the instance
   console.log("The IP address is",data.Instances[0].PrivateIpAddress)
    fs.writeFile('output.txt',data.Instances[0].PrivateIpAddress,function(err){
         if (err){
             return console.error(err);
         }
         console.log("Ip address written successfully");
  /*uncomment if you want to tag your instance
   params = {Resources: [instanceId], Tags: [
      {
         Key: 'Name',
         Value: 'Auto-provisioning server'
      }
   ]};
   ec2.createTags(params, function(err) {
      console.log("Tagging instance", err ? "failure" : "success");
   });
   */
});
  });
}

module.exports.runaws = runaws;
//requestaws();
