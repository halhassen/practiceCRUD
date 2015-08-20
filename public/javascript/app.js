//CRUD (Create, Read, Update, Delete) is a model that is followed for this app

//This section contains the function that creates the "profile" object and pushes name, age, location, and picture into an array

var profileDB = []; //array for the properties to be stored in
var counter = 0; //first "profile" created will have an id of 0

var Profile = function(name, age, location, picture) {
	this._id = counter++; //advances an object's id +1
	this.name = document.getElementById("name").value;
	this.age = document.getElementById("age").value;
	this.location = document.getElementById("location").value;
	this.picture = document.getElementById("picture").value;
}




var create = function() {
	var newProfile = new Profile();
	profileDB.push(newProfile);
	document.getElementById("profiles").innerHTML = "";
	read(); //this method invokes the function AFTER it's defined on line 28. It does so because read() is inside a function, and not global
}

//Read
//this next function loops through the array to examine the properties entered into the input fields
var read = function() {
	document.getElementById("profiles").innerHTML = "";
	for(var i = 0; i < profileDB.length; i+= 1) {
		document.getElementById("profiles").innerHTML += 
		"<li class='panel panel-default col-sm-4'>" + 
		"<ul class='panel-body'>" + 
		"<li>" + profileDB[i].name + "</li>" +
		"<li>" + profileDB[i].age + "</li>" +
		"<li>" + profileDB[i].location + "</li>" +
		"<li>" + "<img class='img-responsive img-thumbnail' src='" + profileDB[i].picture + "'/>" + "</li>" +
		"</ul>" + "<div class='panel-footer'>" + 
		"<button class='btn btn-warning' onclick='startUpdate(" + profileDB[i]._id + ")'>" + 
		"Edit" + "</button>" //Creates a button in the list that allows editing
		+ "<button class='btn btn-danger' onclick='deleteProfile(" + profileDB[i]._id + ")'>" + 
		"Delete" + "</button>" + //Creates a button in the list that allows deleting
		"</div>" + 
		"</li>";
	}
}

//Update function that uses a for loop to go through the properties of the profileDB array. Result creates input boxes that allow a user to edit data
//id parameter is used for updating that particular profile entry
var startUpdate = function(id) { 
	for(var i = 0; i < profileDB.length; i += 1) {
		if(profileDB[i]._id === id) {
			document.getElementById("updateForm").innerHTML = 
			"<h3 class='page-header text-center'>Update Contact</h3>" + "<div class='form-group'>" +
			"<input class='form-control' id='editName' value='" + profileDB[i].name + "'/>" + "</div>" + "<div class='form-group'>" + 
			"<input class='form-control' id='editAge' value='" + profileDB[i].age + "'/>" + "</div>" + "<div class='form-group'>" +
			"<input class='form-control' id='editLocation' value='" + profileDB[i].location + "'/>" + "</div>" + "<div class='form-group'>" + 
			"<input class='form-control' id='editPicture' value='" + profileDB[i].picture + "'/>" + "</div>" + "<div class='form-group'>" + 
			"<button class='btn btn-success btn-block' onclick='finishUpdate(" + profileDB[i]._id + ")'>" + "Submit Update" + "</button>";
		}
	}
}

//Enables the Edit button to take the values from the startUpdate input fields, and call them to the list results
var finishUpdate = function(id) {
	for(var i = 0; i < profileDB.length; i += 1){
		if(profileDB[i]._id === id){
			profileDB[i].name = document.getElementById("editName").value;
			profileDB[i].age = document.getElementById("editAge").value;
			profileDB[i].location = document.getElementById("editLocation").value;
			profileDB[i].picture = document.getElementById("editPicture").value;
			document.getElementById("updateForm").innerHTML = ""; //the double quotes removes the update fields after clicking the button
			read(); //important to call the read() function again so the console is updated with new, edited data
		}
		else {
			console.log("Not found"); //this was for debugging purposes
		}
	}
}

//deleteProfile function removes an array
//The loop is used to find the id that was passed in
var deleteProfile = function(id) {
	for(var i = 0; i < profileDB.length; i += 1) {
		if(profileDB[i]._id === id) {
			//splice method takes out an object from the array. The loop allows the function to delete every item from the array, no matter how large the array is
			profileDB.splice(i, 1);
			read();
		}
	}
}
