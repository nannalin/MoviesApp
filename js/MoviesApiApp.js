var app = angular.module("MoviesApp", []);

// $scope allows us to connect to the view
// $http allows us to connect to network
app.controller("MovieController", function($scope, $http) { 

	// create favorite movies array
	$scope.favoriteMovies = [];

	$scope.addToFavorites = function(movie) {		
		$scope.favoriteMovies.push(movie);
	}

	$scope.removeFavoriteMovie = function(movie) {
		var index = $scope.favoriteMovies.indexOf(movie);
		$scope.favoriteMovies.splice(index, 1);

		// delete detail section if it show the movie that is deleted
		if($scope.details == movie) {
			$scope.details = "";
		}
	}

	// click detail movie button
	$scope.detailsMovie = function(movie) {

		console.log("idIMDB = " + movie.idIMDB);
		console.log("title = " + movie.title);
		$scope.details = movie;

		/**
		$http.jsonp("http://www.myapifilms.com/imdb/idIMDB?idIMDB=" + movie.idIMDB + "&token=38156e0f-67c9-4027-af2c-8ac1d1d99398&format=json&language=en-us&callback=JSON_CALLBACK")
		.success(function (movie) {

			$scope.details = movie;
			
			console.log("details = " + $scope.details);
		});
		*/
	}

	$scope.searchMovies = function () {
		var title = $scope.searchByTitle;
		// to get the data in form of jsonp
		// get url from myapifilms website 
		// then add "&callback=JSON_CALLBACK" at the end
		$http.jsonp("http://www.myapifilms.com/imdb/idIMDB?title=" + title + "&token=38156e0f-67c9-4027-af2c-8ac1d1d99398&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=10&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&quotes=0&fullSize=0&callback=JSON_CALLBACK")
		.success(function(response){
			console.log(response);

			$scope.movies = response.data.movies;
		});
	}

	$scope.addMovie = function() {
		var addMovie = {
			title: $scope.newMovie.title,
			rate: $scope.newMovie.rate,
			year: $scope.newMovie.year,
			plot: $scope.newMovie.plot
		};

		$scope.movies.push(addMovie);
	}

	$scope.removeMovie = function(movie) {
		console.log("remove movie!");

		var index = $scope.movies.indexOf(movie);
		$scope.movies.splice(index, 1);
	}

});