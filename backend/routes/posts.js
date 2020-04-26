const postController =require('../controllers/posts');
const express =require('express');
const Router=express.Router();
const checkAuth=require('../middleware/check-auth');
const multer=require('multer');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
     cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

Router.post("",checkAuth,multer({storage:storage}).single("image"),postController.createPost);
Router.get("",postController.getPosts);
Router.delete("/:id",checkAuth,postController.deletePosts);
Router.get("/:id",postController.getPostById);
Router.put("/:id",checkAuth,multer({storage:storage}).single('image'),postController.editPost);


module.exports=Router;
