var cloudinary=require('cloudinary').v2;
cloudinary.config({
cloud_name:'eaa04168',
api_key:'272569683349881',
api_secret:'Cdqg4M48LO5NrKHU3c-wcXZ669A'

});

exports.uploadImageToCloudinary=async(file,err)=>{
   // console.log('hhhhhhhhhhhs')
  var result=  await cloudinary.uploader.upload(file);
  return result;
}