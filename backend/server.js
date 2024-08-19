const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const multer = require("multer"); // Import multer for handling file uploads
const path = require('path');

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('public'));
// app.use('/images', express.static('public/images'));


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'details'
});


// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Specify the destination directory for storing uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// const uploadHandler = upload.single('file');

app.post('/',(req,res) => {
    const sql = "INSERT INTO signin (`fname`,`lname`,`email`,`password`) VALUES(?)"

    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.password,
    ];

    db.query(sql,[values],(err,data) => {
        if(err)
        {
            return res.json("Error")
        }
        else
        {
            return res.json(data)
        }
    })
});

app.post('/login',(req,res) => {

    const sql = "SELECT * FROM signin WHERE `email` = ? AND `password` = ?"

    db.query(sql,[req.body.email,req.body.password],(err,data) => {
        if(err)
        {
            return res.json({success : false, Message : "Error"})
        }

        if(data.length > 0)
        {
            return res.json({success : true, Message : "Success", data : data})
        }
        else
        {
            return res.json({Success : false, Message : "Failed"})
        }
    })

})


app.get('/header/:id', (req, res) => {
    const id = req.params.id;
    // console.log(`Received request with id: ${id}`);

    // Database query example
    const sql = 'SELECT fname FROM signin WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const userData = {
            id: id,
            name: result[0].fname
        };        
        
        res.status(200).json(userData);
    });
});



// app.post('/products/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(id);

//     uploadHandler(req, res, function(err) {
//         if (err) {
//             // Handle multer errors
//             console.error("Multer Error:", err);
//             res.status(500).json({ error: "An error occurred while uploading the file." });
//             return;
//         }

//         // Check if a file was uploaded
//         if (!req.file) {
//             res.status(400).json({ message: "No file uploaded" });
//             return;
//         }

//         // Access tablet name and amount from req.body after file upload
//         const clothesName = req.body.clothes_name;
//         const mrpamt = req.body.mrp_amt;
//         const salesamt = req.body.sales_amt;

//         // Database query
//         const sql = "INSERT INTO products(`emp_id`,`clothes_name`,`mrp_amt`,`sale_amt`,`image`) VALUES (?)";
//         const values = [
//             id,
//             clothesName,
//             mrpamt,
//             salesamt, // Assuming mrp_amt and sale_amt are the same as 'amt', adjust as needed
//             req.file.originalname,
//         ];

//         db.query(sql, [values], (err, data) => {
//             if (err) {
//                 console.error("Database Error:", err);
//                 return res.status(500).json({ error: "An error occurred while saving data to the database." });
//             } else {
//                 return res.status(200).json({ message: "File uploaded and data saved to the database successfully." });
//             }
//         });
//     });
// });

app.post('/products/:id', upload.single('file'), (req, res) => { // Assuming 'file' is the name of the field used in the form
    const id = req.params.id;

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const image = req.file.filename; // Use 'filename' instead of 'originalname'
    const clothesName = req.body.clothes_name;
    const mrpamt = req.body.mrp_amt;
    const salesamt = req.body.sales_amt;

    const sql = "INSERT INTO new_products(`emp_id`,`clothes_name`,`mrp_amt`,`sale_amt`,`image`) VALUES (?)";
    const values = [
        id,
        clothesName,
        mrpamt,
        salesamt,
        image,
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "An error occurred while saving data to the database." });
        } else {
            return res.status(200).json({ message: "File uploaded and data saved to the database successfully." });
        }
    });
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    // Query database to get all tablet data entries by emp_id
    const sql = "SELECT * FROM new_products WHERE remove = 0";
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching tablet data:', err);
            return res.status(500).json({ success: false, message: "Failed to fetch tablet data" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No tablet data found for the provided ID" });
        }

        res.status(200).json(results);
    });
});

// Assuming you have an Express.js setup
app.put('/products/:product_id/remove', (req, res) => {
    const product_id = req.params.product_id;

    const sql = "UPDATE new_products SET remove = 1 WHERE id = ?";

    db.query(sql, [product_id], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "An error occurred while updating the product." });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No product found with the provided ID." });
        } else {
            return res.status(200).json({ message: "Product removed successfully." });
        }
    });
});



app.get('/clothes_detail/:id/:product_id', (req, res) => {
    const id = req.params.id;
    const productId = req.params.product_id;

    const sql = "SELECT * FROM new_products WHERE id = ?";  // Adjust the query to use both id and product_id

    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product data:', err);
            return res.status(500).json({ success: false, message: "Failed to fetch product data" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No product data found for the provided ID and Product ID" });
        }

        res.status(200).json(results);
    });
});





    const PORT = 8081;

    app.listen(PORT, () => {
        console.log(`Its Working on ${PORT}`);
    })
