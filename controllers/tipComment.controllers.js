const TipComment = require("../models/tipComment.model");

//create review
const createCommnet = async (req, res) => {
  const {userId}=req.user;
  const {
    tip, 
    text
  } = req.body; 

  try {
    if (
      !tip ,
      !text.trim() 
    ) {
      return res.status(400).send({
        message: "All fields are required.",
        success: false,
      });
    }
     if (!userId) {
      return res.status(400).send({
        message: "User ID is required.",
        success: false,
      });
    }
    await TipComment.findOne({tip,text,user : userId})
    
    const newTip = new Review({
      user : userId,
      tip, 
      text : text.trim(),
    });
    await newTip.save();
    
    
    return res.status(201).send({
      message: "Comment successfully posted.",
      success: true,
      id : newTip?._id
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};

// Update event
// const updateReview = async (req, res) => {
//   const {id} = req.user;
//   const {reviewId}=req.params;
//   const {
//     event , 
//     rating,
//     comment,
//     date
//   } = req.body;
//    if (
//       !comment.trim() ||
//       !event ||
//       !rating ||
//       !image ||
//       !date 
//     ) {
//       return res.status(400).send({
//         message: "All fields are required.",
//         success: false,
//       });
//     }

//   try {
//     if (!id || !reviewId) {
//       return res.status(400).send({
//         message: "User and review ID is required.",
//         success: false,
//       });
//     }

//     const updatedReview = await Event.findByIdAndUpdate(
//       {_id : reviewId,user : id,event },
//       {
//          user : id,
//       event , 
//       rating : Number(rating),
//         comment,
//         date
//       },
//       { new: true }
//     );

//     if (!updatedReview) {
//       return res.status(404).send({
//         message: "Review not found.",
//         success: false,
//       });
//     }

//     return res.status(200).send({
//       message: "Review successfully updated.",
//       success: true,
//       event: updatedReview,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Something broke!",
//       success: false,
//       error: error.message,
//     });
//   }
// };

// all reviews for event page
const browseComments = async (req, res) => {
  const {tip}=req.params;
  try {
    const commnets = await TipComment.find({tip}).populate('user','name email avatar').sort({ date: 1 });
    return res.status(200).send({
      message: "Comments fetched",
      commnets,
      success: false,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};


// delete review
const deleteComment = async (req, res) => {
  const { userId } = req.user;
  const { tip } = req.params;

  try {
    if (!userId || !tip) {
      return res.status(400).send({
        message: "id is required.",
        success: false,
      });
    }

    await TipComment.findOneAndDelete({_id : tip, user : userId});

    return res.status(200).send({
      message: "Commnet deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something broke!",
      success: false,
      error: error.message,
    });
  }
};


module.exports = {
    createCommnet,
    browseComments,
    deleteComment
}