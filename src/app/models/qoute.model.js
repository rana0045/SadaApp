import mongoose from "mongoose";


const qSchema = new mongoose.Schema({
    quote: {
        type: String
    }
})


const Quote = mongoose.models.Quote || mongoose.model('Quote', qSchema);
export default Quote;