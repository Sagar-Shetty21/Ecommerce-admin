import mongoose, {model, Schema, models} from "mongoose";

const FeaturedProductSchema = new Schema({
    product: {type: mongoose.Types.ObjectId, ref: 'Product'},
});

export const FeaturedProduct = models.FeaturedProduct || model('FeaturedProduct', FeaturedProductSchema)