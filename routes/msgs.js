const express=require('express')
require('dotenv').config()
const router = express.Router();
const Msg=require('../models/msgShema');

// add msg
router.post('/addmsg',async(req,res)=>{
    try {
        const {from,to,message}=req.body;
        const data=await Msg.create({
            message:{text:message},
            users:[from,to],
            sender:from
                });
            if(data){
                res.json({msg:"add message successfully",success:true})
            }
            // res.json({msg:"failed message addition",success:false})
    } catch (error) {
        res.json({msg:"Internal server error",success:false})
    }

})
//get msg
router.post('/allmsg', async (req, res) => {
    try {
      const { from, to } = req.body;
      const message = await Msg.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updateAt: 1 });
  
      const projectMessage = message.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
  
      res.json(projectMessage);
    } catch (error) {
     
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  //delete message
  
  
module.exports = router;