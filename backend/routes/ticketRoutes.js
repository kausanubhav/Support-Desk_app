const express=require('express');
const { getTickets,getTicket,createTicket,deleteTicket, updateTicket } = require('../controllers/ticketController');
const router=express.Router();

//Re-route into note router
const noteRouter=require('./notesRoute');
router.use('/:ticketId/notes',noteRouter );

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect,getTickets).post(protect,createTicket);
router.route('/:id').get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket)

module.exports=router;