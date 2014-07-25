// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Clound.define("followEachOther",function(request, response){
	var userId1 = request.params.userId1;
	var userId2 = request.params.userId2;
	var query1 = new AV.Query(AV.User);
	var query2 = new AV.Query(AV.User);
	query1.get(userId1, {
	  success: function(user1) {
	  	query2.get(userId2, {
	  	  success: function(user2) {
			  user1.follow(user2,{
				  success: function(object) {
					  user2.follow(user1,{
						  success: function(object) {
							  response.success("follow success");
						  },
						  error: function(object, error) {
						  	  response.error("follow user failed");
						  }
					  });
				  },
				  error: function(object, error) {
				  	  response.error("follow user failed");
				  }
			  });
	  	  },
	  	  error: function(object, error) {
			  response.error("user lookup failed");
	  	  }
	  	});
	  },
	  error: function(object, error) {
		  response.error("user lookup failed");
	  }
	});
});