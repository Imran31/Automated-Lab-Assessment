var express = require('express');
var router = express.Router();
//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/compilecode', function(req, res, next) {
  	var code = req.body.code;	
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    if(inputRadio === "true")
        {    
        	var envData = { OS : "linux" , cmd : "gcc"};	   	
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
        			res.send(data.error);    		
        		}
        		else
        		{
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {
	   	
	   	var envData = { OS : "linux" , cmd : "gcc"};	   
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
        		res.send(data.error);
        	}    	
        	else
        	{
        		res.send(data.output);
        	}
    
            });
	   }

});

module.exports = router;
