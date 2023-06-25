const AWS = require('aws-sdk');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config()


module.exports.getData = async (event) => {
  
  AWS.config.update({
    region:process.env.region,
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
    
  });
  
  // Create an S3 client
  const s3 = new AWS.S3();
  const s3Client = new S3Client({
    region:process.env.region,
    credentials:{
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
    }
  });
  const menu = [
    {
      id: 1,
      title: 'buttermilk pancakes',
      potionSize:"200g",
      category: 'Breakfast',
      color:"#ACDDDE",
      price: 200,
      img:""
    
    
  
      
    },
    {
      id: 2,
      title: 'Lunch double',
      potionSize:"150g",
      category: 'Lunch',
      color:"#CAF1DE",
      price: 800,
      img:""
      
      
    },
    {
      id: 3,
      title: 'godzilla milkshake',
      potionSize:"1000g",
      category: 'Shakes',
      color:"#E1F8DC",
      price: 300,
      img:""
     
    },
    {
      id: 4,
      title: 'country delight',
      potionSize:"2000g",
      category: 'Breakfast',
      color:"#FEF8DD",
      price: 400,
      img:""
     
    },
    {
      id: 5,
      title: 'egg attack',
      potionSize:"1000g",
      category: 'Dinner',
      color:"#FFE7C7",
      price: 600,
      img:""
      
    },
    {
      id: 6,
      title: 'oreo dream',
      potionSize:"200g",
      category: 'Shakes',
      color:"#FFE9EE",
      img:"",
      price: 450,
  
      
    },
    {
      id: 7,
      title: 'bacon overflow',
      potionSize:"200g",
      category: 'Breakfast',
      color:"#F1B9AC",
      price: 1000,
      img:""
    },
    {
      id: 8,
      title: 'indian burger',
      potionSize:"210g",
      category: 'Lunch',
      color:"#BBEDBE",
      price: 1000,
      img:""
    
    },
    {
      id: 9,
      title: 'crsipy chiken',
      potionSize:"2000g",
      category: 'Dinner',
      color:"#C0C6ED",
      price: 250,
      img:""
     
    },
  ];
  
  //get all images names from bucker
  function getImagesFromFolder(bucketName, folderName) {
    console.log("inside get images");
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucketName,
        Prefix: folderName
      };
      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const images = data.Contents.filter((object) =>
            object.Key.endsWith('.jpeg') 
          );
          resolve(images.map((image) => image.Key));
        }
      });
    });
  }
  
  
  async function init(){
    console.log("inside init");
    const imagekeysArr=await getImagesFromFolder(process.env.bucketName, process.env.folderName);
    imagekeysArr
    for(let x=0;x<imagekeysArr.length;x++){
    let url=await GetObject(imagekeysArr[x]);
    urls=url;
    menu[x].img=url;
    }
    return menu;
  }
  async function GetObject(key){
    const command=new GetObjectCommand({
      Bucket:process.env.bucketName,
      Key:key,
    });
    const url=await getSignedUrl(s3Client,command);
    return url;
  }
  
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify({ data:await init()}),
  }
  return response
 
};
