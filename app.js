var express = require('express');
var app = express();
const https = require('https')

// app.use(express.static('public'));

app.get('/', function (req, res) {
   res.redirect("/index.htm" );
})

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, response) {
   // Prepare output in JSON format
   var email= req.query.email;
   var name = req.query.name;
   var validRegex = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@zeta.tech$";
   if(email.match(validRegex)){
   		//calling the auth profile create API
   		const data = JSON.stringify({
 			 name: name
		})

   		const options = 
   		{
		  hostname: 'sb1-god-cipher.mum1-pp.zetaapps.in',
		  port: 443,
		  path: '/proteus/cerberus2/domains/rbl-admin.in/auth_profiles',
		  method: 'POST',
		  headers: 
		  	{
		    'Content-Type': 'application/json',
		    'authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiNk9mbTFpMURxQlBKTWdzWm5zeHgyUSIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoiLTI5U3lBZnlJbjdUdzBBcCJ9.Gk7xqjF3-5iXiB3n8VtiLWsBGji-vUHML3UhwAQQNKM.7dZ2spq2d53yE78HSXL9Ag.7REbM7wB1ezc5A9y2N6w_dx-CBFuMrWzLwYR1ZYfr65Des9LLWfx3iasGHRkliqfeZYBNb2KQXxgL0dkOAqXk3kiy92g4qMMNfoIq2uNAsJFn_OMelIJvMStZ5anchsySgIM-wnHeA2kzslQyWUtznkwsT9_rTtSbI0NBQK582JIXXm6aGPMYj-wmebVn6w0PReHRhARZEJBbgATakVAV91zWzcc5e260ne6ddoY92uzLsWfcWAy4NefNW4xmS5Si5LDvipiMe8HW_E_NZndq6oJ5aMD_mzCMLZ29Y4PdTOZ2f_GUTso7qpBw-yW_3X6rWz44ogeC8BomsWS232kyVc7OvGdLfExvcyhG3uOtNsUJ4I0TQ0gZC2bugddyMVe.jdjzRc08_T8SR1upDkW_6w'
			}
		}

		const req = https.request(options, res => {
		console.log(res)
  		console.log(`statusCode: ${res.statusCode}`)

	    let respData = '';
		let jsonResponse = {};
	    
	    res.on('data', d => {
	      //respData = respData + d.toString();
	      respData += d;
	      process.stdout.write(d);
	      console.log(d);
	    });

		res.on('end', () => {
        jsonResponse = JSON.parse(respData);
        try{
        console.log("Res Data " + jsonResponse)
        console.log("Auth profile ID for " + jsonResponse.headers.authProfileId)
        createEmailIdentity(jsonResponse.headers.authProfileId,email,response)
        createGoogleIdentity(jsonResponse.headers.authProfileId,email,response)
        }catch(e){
        	console.log(e);
        	response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
        }
    	});
   	});

		req.on('error', error => {
		  console.error(error)
		  response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
		});

		req.write(data);
		req.end();
	   /*
	   response = {
	      email: email,
	      name: name
	   };
	   console.log(response);
	   res.end(JSON.stringify(response)); 	
	   */
   }else{
    response.send("Please enter your valid Zeta id. Click " + '<a href="/index.htm">here</a>' + " to sign-up again");
   }
})

function createEmailIdentity(authprofileId,email,response){
   		const data = JSON.stringify({
 			 identityType: 'email',
 			 identityValue: email
		})

   		const options = 
   		{
		  hostname: 'sb1-god-cipher.mum1-pp.zetaapps.in',
		  port: 443,
		  path: '/proteus/cerberus2/domains/rbl-admin.in/auth_profiles/' + authprofileId + '/identities',
		  method: 'POST',
		  headers: 
		  	{
		    'Content-Type': 'application/json',
		    'authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiNk9mbTFpMURxQlBKTWdzWm5zeHgyUSIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoiLTI5U3lBZnlJbjdUdzBBcCJ9.Gk7xqjF3-5iXiB3n8VtiLWsBGji-vUHML3UhwAQQNKM.7dZ2spq2d53yE78HSXL9Ag.7REbM7wB1ezc5A9y2N6w_dx-CBFuMrWzLwYR1ZYfr65Des9LLWfx3iasGHRkliqfeZYBNb2KQXxgL0dkOAqXk3kiy92g4qMMNfoIq2uNAsJFn_OMelIJvMStZ5anchsySgIM-wnHeA2kzslQyWUtznkwsT9_rTtSbI0NBQK582JIXXm6aGPMYj-wmebVn6w0PReHRhARZEJBbgATakVAV91zWzcc5e260ne6ddoY92uzLsWfcWAy4NefNW4xmS5Si5LDvipiMe8HW_E_NZndq6oJ5aMD_mzCMLZ29Y4PdTOZ2f_GUTso7qpBw-yW_3X6rWz44ogeC8BomsWS232kyVc7OvGdLfExvcyhG3uOtNsUJ4I0TQ0gZC2bugddyMVe.jdjzRc08_T8SR1upDkW_6w'
			}
		}

		const req = https.request(options, res => {
		console.log(res)
  		console.log(`statusCode: ${res.statusCode}`)

  		let respData = '';
		res.on('data', d => {
	      //respData = respData + d.toString();
	      respData += d;
	      process.stdout.write(d);
	      console.log(d);
	    });

		res.on('end', () => {
        jsonResponse = JSON.parse(respData);
        console.log("Res Data " + jsonResponse)
        try{
        console.log("Auth profile ID for " + jsonResponse.headers.authProfileId)
        //addRoleToAuthProfile(jsonResponse.headers.authProfileId,response)
        }catch(e){
        	console.log(e);
        	response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
        }
    	});

   	});

		req.on('error', error => {
		  console.error(error)
		  response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
		});

		req.write(data);
		req.end();

}

function createGoogleIdentity(authprofileId,email,response){
	console.log("entering google idp step")
   		const data = JSON.stringify({
 			 identityType: 'okta_id',
 			 identityValue: email
		})

   		const options = 
   		{
		  hostname: 'sb1-god-cipher.mum1-pp.zetaapps.in',
		  port: 443,
		  path: '/proteus/cerberus2/domains/rbl-admin.in/auth_profiles/' + authprofileId + '/identities',
		  method: 'POST',
		  headers: 
		  	{
		    'Content-Type': 'application/json',
		    'authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiNk9mbTFpMURxQlBKTWdzWm5zeHgyUSIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoiLTI5U3lBZnlJbjdUdzBBcCJ9.Gk7xqjF3-5iXiB3n8VtiLWsBGji-vUHML3UhwAQQNKM.7dZ2spq2d53yE78HSXL9Ag.7REbM7wB1ezc5A9y2N6w_dx-CBFuMrWzLwYR1ZYfr65Des9LLWfx3iasGHRkliqfeZYBNb2KQXxgL0dkOAqXk3kiy92g4qMMNfoIq2uNAsJFn_OMelIJvMStZ5anchsySgIM-wnHeA2kzslQyWUtznkwsT9_rTtSbI0NBQK582JIXXm6aGPMYj-wmebVn6w0PReHRhARZEJBbgATakVAV91zWzcc5e260ne6ddoY92uzLsWfcWAy4NefNW4xmS5Si5LDvipiMe8HW_E_NZndq6oJ5aMD_mzCMLZ29Y4PdTOZ2f_GUTso7qpBw-yW_3X6rWz44ogeC8BomsWS232kyVc7OvGdLfExvcyhG3uOtNsUJ4I0TQ0gZC2bugddyMVe.jdjzRc08_T8SR1upDkW_6w'
			}
		}

		const req = https.request(options, res => {
		console.log(res)
  		console.log(`statusCode: ${res.statusCode}`)

  		let respData = '';
		res.on('data', d => {
	      //respData = respData + d.toString();
	      respData += d;
	      process.stdout.write(d);
	      console.log(d);
	    });

		res.on('end', () => {
        jsonResponse = JSON.parse(respData);
        console.log("Res Data " + jsonResponse)
        try{
        console.log("Auth profile ID for " + jsonResponse.headers.authProfileId)
        addRoleToAuthProfile(jsonResponse.headers.authProfileId,response)
        }catch(e){
        	console.log(e);
        	response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
        }
    	});

   	});

		req.on('error', error => {
		  console.error(error)
		  response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
		});

		req.write(data);
		req.end();

}

function addRoleToAuthProfile(authProfileId,response){
	  //console.log("Got request to create email identity");
  const roles = ['cipher_tenant_admin','backoffice_admin','bot_admin','bot_admin_77', 'role_SupportCentre', 'oc_admin', 'oc_executive', 'role_ControlCenter','role_financeCenter'];
  var data = '';
  for (const role of roles) {  
	  //console.log('Created data');
	  var urlPath = '/sandbox/tenants/140793/sandboxes/77/realms/rbl-admin.in/subjects/'
	                  + authProfileId + '/roles/' + role;
	  var options = {
	    hostname: 'proteus-cipher.mum1-pp.zeta.in',
	    port: 443,
	    path: urlPath,
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json, text/plain, */*',
	      'Content-Type': 'application/json',
	      'authorization':' Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiNk9mbTFpMURxQlBKTWdzWm5zeHgyUSIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoiLTI5U3lBZnlJbjdUdzBBcCJ9.Gk7xqjF3-5iXiB3n8VtiLWsBGji-vUHML3UhwAQQNKM.7dZ2spq2d53yE78HSXL9Ag.7REbM7wB1ezc5A9y2N6w_dx-CBFuMrWzLwYR1ZYfr65Des9LLWfx3iasGHRkliqfeZYBNb2KQXxgL0dkOAqXk3kiy92g4qMMNfoIq2uNAsJFn_OMelIJvMStZ5anchsySgIM-wnHeA2kzslQyWUtznkwsT9_rTtSbI0NBQK582JIXXm6aGPMYj-wmebVn6w0PReHRhARZEJBbgATakVAV91zWzcc5e260ne6ddoY92uzLsWfcWAy4NefNW4xmS5Si5LDvipiMe8HW_E_NZndq6oJ5aMD_mzCMLZ29Y4PdTOZ2f_GUTso7qpBw-yW_3X6rWz44ogeC8BomsWS232kyVc7OvGdLfExvcyhG3uOtNsUJ4I0TQ0gZC2bugddyMVe.jdjzRc08_T8SR1upDkW_6w'
	    }
	  };

	  //console.log('Created options also. About to make https request');

	  var req = https.request(options, res => {
	    console.log(`statusCode: ${res.statusCode}`);
	    console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));

	    let respData = '';
	    let jsonResponse = {};
	    res.on('data', d => {
	      //respData = respData + d.toString();
	      respData += d;
	      process.stdout.write(d);
	      //console.log(d);
	    });
	    res.on('end', () => {
	        //console.log('Printing the response');
	        //jsonResponse = JSON.parse(data);
	        //console.log(jsonResponse);
	        // We dont get a json response.
	        // jsonResponse = JSON.parse(respData);
	        console.log( role + ' role assigned for ' + authProfileId);
	    });
	  });

	  req.on('error', error => {
	    console.error(error);
	    response.send("Registration failed. Please click " + '<a href="/index.htm">here</a>' + " to sign-up again");
	    return;
	    //console.log("Got an error while assigning " + profile.ROLE + "role for " + profile.NAME);
	  });

	  req.write(data);
	  req.end();
	}
	response.send("Successfully registered. Please click " + '<a href="https://aphrodite-pp.zetaapps.in/#/?domain=rbl-admin.in&tenant=140793">here</a>' + " to sign-in");
}

var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})