import mongoose from "mongoose";


const TransactionSchema = new mongoose.Schema({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    amount: Number,
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    description:{
        type:String,
        default:""
    },
    category: String,
    date:{
        type:Date,
        required:true
    }


},
    {
        timestamps: true
    })

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction;