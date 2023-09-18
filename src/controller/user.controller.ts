import client from "../../client/client";
export class User{
    static async registerUser(req,res){
        try{
            client.RegisterUser({
                "username": req.body.username,
                "email": req.body.email,
                "password": req.body.password,
            }, (err, response)=> {
                if(!err){
                    console.log(response);
                    res.json({user: response});
                }
                else{
                    console.log(err);
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }


    static async getUserDetails(req,res){
        try{
            client.GetUserDetails({
                "username": req.body.username,
            }, (err,response)=>{
                if(!err){
                    console.log(response);
                    res.json({details: response});
                }
                else{
                    console.log(err);
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }

    static async loginUser(req,res){
        try{
            client.LoginUser({
                "email": req.body.email,
                "password": req.body.password,
            },(err,response)=> {
                if(!err){
                    console.log(response);
                    res.json({response});
                }
                else{
                    console.log(err);
                    res.json({err});
                }
            })
        }
        catch(err){
            console.log(err);
            res.json({message: "Error", err});
        }
    }
}