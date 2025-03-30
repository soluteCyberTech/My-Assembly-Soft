const express=require('express')
const mysql =require('mysql')
const cors =require('cors')
const path=require('path')

const passwordHash = require('password-hash');

const app =express()

app.use(express.static(path.join(__dirname , "public")))
app.use(cors())
app.use(express.json())

const port=5000

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"asssoft"
})


db.connect(err => {
    if (err) {
        console.error('connection failed:', err);
        return;
    }
    console.log('Connected to MySQL!!!');
});


const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};



// activation
app.get("/", (req, res)=>{
    try {
        
  
    const sql ='Select * FROM  assembly'
    db.query(sql ,(err ,data)=>{

        if(err) return res.json('Error')
        
        return res.json(data)
        
    })

} catch (error) {
        
}

})


app.post('/createstaff' ,async (req ,res)=>{

    try {
        
 
    const { data } = req.body;

    await query('START TRANSACTION');

    for (const row of data) {

         await query (`insert into  staff (name , emain , department ,	role , staff_id , username , pass ) VALUES (?,?,?,?,?,?,?)`,
        
            [
            row.name,
            row.email ,
            row.department,
            row.role,
            row.StaffId,
            row.username ,
           passwordHash.generate(row.Password)
        ]
    )
        
    }

        await query ('UPDATE assembly SET name=?, mmda=?, region =?, location=?, digital_add=?, email=?, phone=? ,logo=? ,state=? WHERE trans_code= '+req.body.ActivationId +' ' ,
        
            [req.body.assname,
                    req.body.mmda ,
                    req.body.regions ,
                    req.body.location ,
                    req.body.digitaladd ,
                    req.body.email ,
                    req.body.Phone ,
                    req.body.companylogo,
                    req.body.state 
                ]          

                
            )

            

    await query('COMMIT');
    res.json({ 
        success: true, 
        message: 'Data imported successfully'
        
       // return res.json(data)
    });


    

    } catch (error) {

        await query('ROLLBACK');
        console.error('Import error:', error);
        res.status(500).json({
            success: false,
            message: 'Error importing data',
            error: error.message
        });
        
    }

})



app.put('/activate/:ActivationId' ,(req ,res) =>{
    try {
        
  
    const sql='UPDATE assembly SET name=?, mmda=?, region =?, location=?, digital_add=?, email=?, phone=? ,logo=? ,state=? WHERE trans_code=? '
    const values=[req.body.assname,
                req.body.mmda ,
                req.body.regions ,
                req.body.location ,
                req.body.digitaladd ,
                req.body.email ,
                req.body.Phone ,
                req.body.companylogo,
                req.body.state 
            ]          

    const ActivationId =req.params.ActivationId
    db.query(sql ,[...values ,ActivationId],(err ,data)=>{
        if(err) return res.json('Error')
        
        return res.json(data)
    })

} catch (error) {
        
}
})




app.listen(port ,()=>{
    console.log('Connection Up And Runing........')
})