var express = require('express');
var router = express.Router();
var puppyArray = [];
var peopleArray = [];


//route handler for handling a GET request to '/'
router.get('/', function(req, res, next) {
  //sends the index.html page for the user to see
  res.render('index', { title: 'Express' });
});

//route handler for handling a POST request to '/submit'
router.post('/submit', function(req, res, next) {
  //requesting by the body of the form, and the NAME attribute - has to be the name!

  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;

  var errorsPuppy = puppyValidationCheck(puppyInputName, puppyInputID);

  if(errorsPuppy.length > 0) {
    //it knows it's index.html
    res.render('index', {
      errorsPuppy: errorsPuppy
    });

  } else {

    puppyArray.push({
      name: req.body.puppyName,
      id: req.body.puppyID
    });
    //console log so you can see it in the terminal
    console.log(puppyArray);
    //  //have to send a response or nothing happens
    // res.send("yo dawg");
    //instead of send, you can RENDER a new page - it sends a response to the user in the form of dog.html - it shows the user that page.
    //when you pass this object {puppies: puppyArray} it becomes accessable in the template - name it puppies and assign it the puppy Array
    res.render('dog', {
      puppies: puppyArray,
      success: "The puppy was saved successfully!"
    });
  }
});

router.post('/submitperson', function(req, res, next) {
  var personInputName = req.body.personName;
  var personInputHobby = req.body.personHobby;

  var errors = personValidationCheck(personInputName, personInputHobby);

  if(errors.length > 0) {
    //it knows it's index.html
    res.render('index', {
      errors: errors
    });

  } else {
    peopleArray.push({
      name: req.body.personName,
      hobby: req.body.personHobby
    });

    res.render('people', {
      people: peopleArray,
      success: "The person was saved successfully!"
    });
  }
});

function puppyValidationCheck(puppyName, puppyID) {

  var errorPuppyArray = [];
  //trims white space away
  var puppyNameTrimmed = puppyName.trim();
  var puppyIDTrimmed = puppyID.trim();
//if the name is blank, push in the error
  if(puppyNameTrimmed === '') {
    errorPuppyArray.push("Name cannot be blank.");
  }

  if(puppyIDTrimmed === '') {
    errorPuppyArray.push('ID cannot be blank.');
  } else if (puppyIDTrimmed.length < 3) {
    errorPuppyArray.push('ID must be at least 3 characters long.');
  }

  return errorPuppyArray;

}

function personValidationCheck(personName, personHobby) {

  var errorArray = [];
  //trims white space away
  var personNameTrimmed = personName.trim();
  var personHobbyTrimmed = personHobby.trim();
//if the name is blank, push in the error
  if(personNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  if(personHobbyTrimmed === '') {
    errorArray.push('Hobby cannot be blank.');
  }

  return errorArray;

}

module.exports = router;
