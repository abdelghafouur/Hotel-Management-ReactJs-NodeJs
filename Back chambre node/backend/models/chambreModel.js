const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        NumChamb :{
            type : Number,
            required : true,
            trim : true
        },    

        NumEtage :{
            type : Number,
            required : true,
            trim : true
        },

        NomHotel :{
            type : String,
            required : true,
            trim : true
        },

        Type :{
            type : String,
            required : true,
            trim : true
        },

        NumBD :{
            type : Number,
            required : true,
            trim : true
        },

        prix :{
            type : Number,
            required : true   
        }
    },
    {     versionKey: false
    }
)

module.exports = mongoose.model('chambre', productSchema);