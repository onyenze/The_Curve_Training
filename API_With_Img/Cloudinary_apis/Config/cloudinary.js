const cloudinary = require("cloudinary").v2
cloudinary.config({ 
    cloud_name: 'dnmessnrc', 
    api_key: '573116847391683', 
    api_secret: '6BQ_tOcjoXfKLbHyEVoXbVlVEag' 
  });

  module.exports=cloudinary