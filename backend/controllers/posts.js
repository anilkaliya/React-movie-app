const Post =require('../models/posts');
const fs=require('fs');

exports.createPost=(req,res,next)=>{
    const url = req.protocol + "://" + req.get("host");
    let imgPath=  "backend/images/" + req.file.filename;

    let imgData=fs.readFileSync(imgPath);
    const post =new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath:{ data:imgData,contentType:req.file.mimeType},
    creator:req.userData.id
    });
   
    post.save().then(createdPost=>{
        console.log("yes data saved");
        res.status(201).json({message:"posted successfully" 
    });
});
};


                        
 exports.getPosts=async(req,res,next)=>{
   let data=await Post.find({});
    let newData=data.map(post=>({_id:post._id,title:post.title,content:post.content,imagePath:post.imagePath.data.toString('base64'),creator:post.creator}))
    // res.header("Content-Type","image/jpg");
       res.status(201).
       json({message:"successfull",
       posts:newData});
   }


exports.deletePosts=(req,res,next)=>{
    Post.deleteOne({ _id:req.params.id,creator:req.userData.id})
    .then(result=>{
        res.status(200).json({message:"postDeleted"})
     })
}

exports.getPostById=(req,res,next)=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(post){
            res.status(200).json(post);
        }else {
            res.status(404).json({message:"post not found"});
        }
    })
}

exports.editPost=(req,res,next)=>{
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://" + req.get("host");
        imagePath = "backend/images/" + req.file.filename;
    }
    const post=new Post({
    _id: req.body.id,
    title:req.body.title,
    content:req.body.content,
    imagePath: imagePath,
    creator:req.userData.id 
})

Post.updateOne({_id:req.params.id,creator:req.userData.id},post)
.then(result=>{
    console.log("updated");
    res.status(201).json({message:"Post updated"});
})
}