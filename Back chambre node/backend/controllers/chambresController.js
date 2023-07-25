let Chambre =require('../models/chambreModel');

// get all chambres :
exports.getAllChambres =async (req,res)=>{
    try{
        const Chambres = await Chambre.find();
        if(Chambres.length == 0)
            {
                res.status(200).json({
                    success : "pas de chambre .",
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    count : Chambres.length,
                    Chambres
                });
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
   

}

// get all chambres with prix :
exports.getAllChambresPrix =async (req,res)=>{
    try{
        const ChambresPrix = await Chambre.aggregate([
            {"$project": {"_id":0,"NumChamb": 1, "prix": 1}},
            {"$sort": {"NomHotel": -1}}
          ]);
          if(ChambresPrix.length == 0)
            {
                res.status(200).json({
                    success : "pas de chambre .",
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    count : ChambresPrix.length,
                    ChambresPrix
                });
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }


}

// get all chambres with type  :
exports.getAllChambrestype =async (req,res)=>{
    try{
        const ChambresType = await Chambre.find(
            {"Type": req.params.type}
          );
          if(ChambresType.length == 0)
            {
                res.status(200).json({
                    success : "pas de chambre avec ce type.",
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    count : ChambresType.length,
                    ChambresType
                });
            }
       
    }
    catch(error){
        res.status(500).json({message: error.message})
    }


}


// get all chambres with type prix fix :
exports.getAllChambresPrixFix =async (req,res)=>{
    try{
        const ChambresPrixFix = await Chambre.find(
            {"prix":{"$lte" : req.params.prix}}
          );
          if(ChambresPrixFix.length == 0)
            {
                res.status(200).json({
                    success : "pas de chambre avec ce prix.",
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    count : ChambresPrixFix.length,
                    ChambresPrixFix
                });
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }


}
// get all chambres with num tage :
exports.getAllChambresEtage =async (req,res)=>{
    try{
        const ChambresEtage = await Chambre.find(
            {"NumEtage" : req.params.NumEtage}
          );
          if(ChambresEtage.length == 0)
            {
                res.status(200).json({
                    success : "pas de chambre dans un cette etage .",
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    count : ChambresEtage.length,
                    ChambresEtage
                });
            }
       
    }
    catch(error){
        res.status(500).json({message: error.message})
    }


}
///// ajouter  chambre
exports.addChambre =async (req,res)=>{
    try {

        const ChambreNum = await Chambre.find({"NumChamb" : req.body.NumChamb});
        if (ChambreNum.length == 0) 
            {
                const ChambreEtage = await Chambre.find({"NumEtage" : req.body.NumEtage});
                if (ChambreEtage.length < 5) 
                    {
                        
                            const Chambres = new Chambre(req.body)
                            await Chambres.save();
                                res.status(200).json({
                                    message:" Chambre bien ajouter"
                                });
                    } 
                else
                    {
                        res.status(200).json({
                            message:" Etage est depasser du 5 chambre",
                            
                        });
                        
                    }
            } 
        else 
            {
                res.status(200).json({
                    message:" Numero du chambre deja exsict"
                });
                
            }
            
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

}
// one chambre 
exports.getChambreById = async (req,res)=>{
    try{
        const MaChambre = await Chambre.findOne({
            NumChamb : req.params.NumChamb
        })
        if(MaChambre == null)
            {
                res.status(200).json({
                    success : "pas de chambre avec cette numero .",
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    MaChambre
                });
            }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    

}


// udtate chambre 
exports.updateChambre = async (req,res)=>{

    try {
        const upd_Chambres = await Chambre.updateOne(
            {NumChamb : req.params.NumChamb},
            {
                $set :req.body
                
            }
        )
        if(upd_Chambres.matchedCount == 0)
            {
                res.status(200).json({
                    message:`pas de chambre avec cette numero  ${req.params.NumChamb}`
                });
            }
        else
            {
                res.status(200).json({
                    success : true,
                    message:`chambre avec numero ${req.params.NumChamb} est Update.`,
                    upd_Chambres
                });
            }
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }


}

// delete chambre
exports.deleteChambre = async (req,res)=>{

    try {
        const del_Chambres = await Chambre.findOneAndDelete(
            {NumChamb : req.params.NumChamb}
        )
        if(!del_Chambres)
            {
                res.status(200).json({
                    message:`pas de chambre avec cette numero  ${req.params.NumChamb}`
                });
            }
        else
            {
                res.status(200).json({
                    deleted : true,
                    message:`chambre avec numero ${req.params.NumChamb} est Delete.`,
                    del_Chambres,
                });
            }
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}