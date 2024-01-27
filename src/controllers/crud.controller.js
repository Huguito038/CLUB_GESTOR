import Player from "../models/player.model.js"

export const newPlayer = async(req,res)=> {
    const {nombre,categoria,telefono,deporte,fecha_nacimiento,direccion,documento,otros} = req.body
    try {
        const newUser= new Player({
        nombre,
        categoria,
        deporte,
        cuotas:{
            enero:false,
            febrero:false,
            marzo:false,
            abril:false,
            mayo:false,
            junio:false,
            julio:false,
            agosto:false,
            septiembre:false,
            octubre:false,
            noviembre:false,
            diciembre:false,
        },
        telefono,
        fecha_nacimiento,
        direccion,
        otros,
        carnet_impreso:false,
        carnet_pago:false,
        documento,
        user:req.user.id
    })
    const FoundIn = await Player.findOne({user:req.user.id,nombre})
    if(FoundIn){return res.status(404).json({message:"Ya existe este jugador en la base de datos..."})
    }else{
        await newUser.save()
        return res.status(200).json({message:"Jugador cargado con exito"})
    }
    } catch (error) {
        return res.status(400).send(error.message)
    } 
}
export const updatePlayer = async(req,res)=>{
    try {
    const player = await Player.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
    }).populate("user")
    if(!player) res.status(404).json({message:"Player not Found"})
    res.json(player)   
    } catch (error) {
        res.json({message:error.message})  
    }
   
    
}
export const deletePlayer = async(req,res)=>{
    const deleted = await Player.findByIdAndDelete(req.params.id)
    if(!deleted) return res.status(401).send("Jugador no Encontrado..")
    return res.send("borrado con exito") 
}
export const findPlayer = async(req,res)=> {
    try {  
    const playerFound = await Player.findById(req.params.id).populate("user")
    if(!playerFound){res.send("Jugador no encontrado en la base de datos!!!")}
    res.json(playerFound)
    } catch (error) {
        console.log(error)
    } 
}
export const getallPlayers = async(req,res)=>{
    try {
        const allUsers = await Player.find({user:req.user.id}).populate("user")
        res.status(200).json(allUsers)
    } catch (error) {
        res.json({message:"ERRORRRRRRRRRR"})
    }

}
export const modificarPlayers= async(req,res)=>{
    const sessionPlayers = await Player.find({ user: req.user.id });
    try{
        for (const player of sessionPlayers) {
            await Player.findByIdAndUpdate(player._id, req.body);
          }
        res.send("actualizado con exito")

    }catch(error){
        res.json(error.message)
    }
}