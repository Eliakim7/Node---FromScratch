const PostModel = require('../models/post.model.js');

module.exports.getPosts = async (req, res) => {
  const post = await PostModel.find();
  res.status(200).json(post);
}

// = logique pour mettre en place un message => puis placer cette fonction dans le fichier post.routes.js dans router.post
module.exports.setPosts = async (req, res) => {
  if(!req.body.message){
    res.status(400).json({message: "Merci d'ajouter un message"})
  }

  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  });
  res.status(200).json(post);
}; 

module.exports.editPost = async (req,res) => {
  const post = await PostModel.findById(req.params.id)

  if(!post){
    res.status(400).json({message:"Ce post n'existe pas"})
  }

  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {new:true})
  res.status(200).json(updatePost)
}

module.exports.deletePost = async (req,res) => {
  const post = await PostModel.findById(req.params.id);

  if(!post){
    res.status(400).json({message:"Ce post n'existe pas"});
  }

  await post.remove();
  res.status(200).json("message supprimé" + req.params.id) //cette méthode va supprimer l'élément qui se trouve dans l'url (req.params.id)
}

module.exports.likePost = async (req,res) => {
  try {
    await PostModel.findByIdAndUpdate( // = tu vas chercher dans PostModel par Id
      req.params.id,// = post ciblé
      {$addToSet: {likers: req.body.userId}}, // = action à mener => rajouter l'utilisateur ciblé dans le tableau Likers
      {new: true} // = autorise les modifs si besoin
    ).then((data) => res.status(200).send(data));
  } catch (error) {
    res.status(400).json(error)
    
  }
}

module.exports.dislikePost = async (req,res) => {
  try {
    await PostModel.findByIdAndUpdate( // = tu vas chercher dans PostModel par Id
      req.params.id,// = post ciblé
      {$pull: {likers: req.body.userId}}, // = action à mener => retirer l'utilisateur ciblé dans le tableau Likers
      {new: true} // = autorise les modifs si besoin
    ).then((data) => res.status(200).send(data));
  } catch (error) {
    res.status(400).json(error)
    
  }
}