var express = require("express"), 
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")



mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({

	name: String,
	image: String,
	description: String

});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create(
//	{
//		name: "White Mountain, New Hampshire and Maine",
//		image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2018%2F05%2Fwhite-mountain-national-forest-new-hampshire-SCENICCAMP0118.jpg",
//		description: "If you’re looking for a rugged hike, look no further than this northernmost part of the Appalachian Valley. The sights are particularly magical in the fall when leaf-peeping season is at its peak. Plus, the forest has several campgrounds with a combined hundreds of campsites. Currently, several campgrounds, climbing areas, and shelters remain closed."
//	}
//);

app.get("/", function(request,response){

	response.render("landing");

});

//INDEX - Show all campgrounds
app.get("/campgrounds", function(request,response){
	
			//Get all campgrounds from DB
			Campground.find({},function(err,allCampgrounds){


				if(err){console.log(err);}
				

				else{response.render("index", {campgrounds:allCampgrounds});}
			});
	

});


//CREATE - add new campground to DB
app.post("/campgrounds", function(request,response){

		
		var name = request.body.name;
		var image = request.body.image;
		var desc = request.body.description
		var newCampground = {name: name, image: image, description: desc}
	
		//Create a new campground and save to DB
		Campground.create(newCampground, function(err, newlyCreated){


			if(err){ console.log(err); }
			else{

				//redirect back to campgrounds page
				response.redirect("/campgrounds");

			}


		});
	


});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(request,response){


		response.render("new.ejs");

});




app.get("/campgrounds/:id", function(request,response){

		//find the campground with provided ID
		Campground.findById(request.params.id, function(err, foundCampground){

			if(err){ console.log(err); }
			else{
				response.render("show", {campground: foundCampground});

			}	


		});






});


app.listen(3000, function(){


	console.log("YelpCamp Has Started!");


});
