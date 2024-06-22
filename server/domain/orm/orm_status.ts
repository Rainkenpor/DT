
exports.GetAll = async () =>{
    try{
        return await conn.db.connMongo.User.find({IsDelete: false});
    }catch(err){
        console.log(" err orm-user.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id:number ) =>{
    try{
        return await conn.db.connMongo.User.findOne({ userId: Id, IsDelete: false });
    }catch(err){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Create = async (Name:string, Description:string, MaxStudents:number) =>{
    try{
        const datacenter = await new conn.db.connMongo.User({
            name: Name,
            description: Description,
            maxStudents: MaxStudents
        });
        datacenter.save();
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.DeleteById = async ( Id:number ) =>{
    try{
        await conn.db.connMongo.User.findOneAndUpdate({userId: Id}, { IsDelete: true })
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateById = async ( Name:string, Description:string, MaxStudents:number, Id:number ) =>{
    try{
        await conn.db.connMongo.User.findOneAndUpdate(
            {
                courseId: Id
            },{ 
                name: Name,
                description: Description,
                maxStudents: MaxStudents
            })
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}