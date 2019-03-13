var express=require("express");
var app=express();

app.use(express.json());

courses={"Course1":[],"Course2":[], "Course3":[]}
student={}
username={}
var stud_name;

app.set("views","./views")
app.set("view engine","pug")
app.use(express.urlencoded({extended: true}));

app.get('/adduser',(req,res)=> {
    res.render("users",{appName: "University Course Management System"});
});

app.post("/adduser",(req,res)=> {
    username[req.body['user']]=req.body['password'];
    student[req.body.user]=[];
    res.send("User successfully added!!");
});

app.get('/login',(req,res)=> {
    res.render("login",{appName: "University Course Management System"});
});

app.post('/login',(req,res)=> {
    flag=0;
    for (var key in username) {
        if (key===req.body.user && username[key]===req.body.password){
            flag=1;
            stud_name=key;
            return(res.redirect('/joincourse'));
        }
    }
    if (flag==0){
        res.send("User not found");
    }
});

app.get('/joincourse',(req,res)=> {
    res.render("addcourse",{appName: "University Course Management System"});
});

app.post("/joincourse",(req,res)=> {
    flag=0;
    for (var key in courses) {
        if (key===req.body.course) {
            flag=1;
            courses[key].push(stud_name);
            student[stud_name].push(key);
            res.send("Successfully Registered");
        }
    }
    if (flag==0){
        res.send("Course not found");
    }
});

app.get("/deletecourse",(req,res)=> {
    res.render("deletecourse",{appName: "University Course Management System"});
});

app.post("/deletecourse", (req,res)=> {
    flag=0;
    student[stud_name].forEach (function(val) {
        if (req.body.course===val) {
            flag=1;
            student[stud_name].splice(student[stud_name].indexOf(req.body.course),1);
            courses[req.body.course].splice(courses[req.body.course].indexOf(stud_name),1);
            res.send("Sucessfully Deleted");
        }
    });
    if (flag==0){
        res.send("Course not registered");
    }
});

app.get("/listcourses", (req,res)=> {
    res.send(student[stud_name]);
});

app.get("/viewcourse", (req,res)=> {
    res.render("viewcourse",{appName: "University Course Management System"});
});

app.post("/viewcourse", (req,res)=> {
    for (var key in courses) {
        if (req.body.course===key) {
            var l=courses[req.body.course].length;
            if(l>=5) {
                res.send("Course Confirmed");
            }
            else{
                res.send("Course not Confirmed");
            }
       }
    }
});

app.listen(3000);