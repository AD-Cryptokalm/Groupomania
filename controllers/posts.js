
// const User = require("../models/userModel");
const postModel = require("../models/Post");
const ObjectId = require("mongoose").Types.ObjectId;

// importer fs pour gérer les images
const fs = require("fs");

// Voir tous les posts
module.exports.getAllPost = (req, res, next) => {
  postModel.find((err, data) => {
    if (!err) res.send(data);
    else console.log(err);
  });
};

// Ajouter un post
module.exports.createPost = async (req, res, next) => {
  const newPost = new postModel({
    userId: req.body.userId,
    message: req.body.message,
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Modifier un post
module.exports.modifyPost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);
  const modifyRec = {
    message: req.body.message,
  };
  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: modifyRec },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log(err);
    }
  );
};

// Supprimer un post
module.exports.deletePost = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu :" + req.params.id);

  postModel.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send({message:"post supprimé"});
    else console.log(err);
  });
};




















// // importer le model post
// const Post = require("../models/Post");

// // importer fs pour gérer les images
// const fs = require("fs");

// //Voir un post par son id
// exports.getOnePost = async (req, res, next) => {
//   try {
//     const post = await post.findById({ _id: req.params.id }).exec();
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// // Voir tous les posts
// exports.getAllPost = async (req, res, next) => {
//   try {
//     const post = await post.find({}).select("-.__v");
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// // Ajouter un post
// exports.createPost = (req, res, next) => {
//   const postObject = req.image
//     ? {
//         ...JSON.parse(req.body),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };
//   delete postObject._id;
//   delete postObject.userId;
//   const post = new Post({
//     ...postObject,
//     userId: req.auth.userId,
//   });
//   post
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Objet enregistré !" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

// // Modifier un post
// exports.modifyPost = (req, res, next) => {
//   const postObject = req.image
//     ? {
//         ...JSON.parse(req.body),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   delete postObject.userId;
//   Post.findOne({ _id: req.params.id })
//     .then((post) => {
//       if (post.userId != req.auth.userId) {
//         res.status(401).json({ message: "Non autorisé !" });
//       } else {
//         Post.updateOne(
//           { _id: req.params.id },
//           { ...postObject, _id: req.params.id }
//         )
//           .then(() => res.status(200).json({ message: "Post modifié!" }))
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

// // Supprimer un post
// exports.deletePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => {
//       if (post.userId != req.auth.userId) {
//         res.status(401).json({ message: "Non autorisé !" });
//       } else {
//         const filename = post.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {
//           Post.deleteOne({ _id: req.params.id })
//             .then(() => {
//               res.status(200).json({ message: "Post supprimé !" });
//             })
//             .catch((error) => res.status(401).json({ error }));
//         });
//       }
//     })
//     .catch((error) => res.status(400).json({ error }));
// };
