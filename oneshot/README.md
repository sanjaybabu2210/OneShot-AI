# One Shot AI Task

This project Backend server runs on: https://glacial-wave-89509.herokuapp.com/ 

## Backend Repo
Repository for Backend Code (NodeJS): https://github.com/sanjaybabu2210/OneShot-AI/tree/master

## React APP link
Link: https://keen-noyce-86c166.netlify.app/



## API End Points for Testing

```

# Get a list of Colleges
curl \
--request GET \
https://glacial-wave-89509.herokuapp.com/allCollege/

# Get a list of Students 
curl \
--request GET \
https://glacial-wave-89509.herokuapp.com/allStudents/

# Get a College By Name or ID 
curl \
--request GET \
https://glacial-wave-89509.herokuapp.com/college/:id/

# Get a College By state
curl \
--request GET \
https://glacial-wave-89509.herokuapp.com/state/college/:id/

# Get a College By Course
curl \
--request GET \
https://glacial-wave-89509.herokuapp.com/course/college/:id/

# Get a Student By Name of ID
curl \
--request GET \
hhttps://glacial-wave-89509.herokuapp.com/student/:id/

# add New College
curl \
--header "Content-Type: application/json" \
--request POST \
--data '{
    "id":"6","name": "Institute Name","year":" Established Year ", 
    "city":"city name" , "state":"state name" ,
    "country":"Country Name", "students":"No of Students",
    "courses":"course serparete with commas..."
    
}' \
https://glacial-wave-89509.herokuapp.com/addColleges/

# To Add New Student
curl \
--header "Content-Type: application/json" \
--request POST \
--data '{
    "id":"student Id",
    "name": "Name",
    "year":"bath year",
    "collegeId":" student college id",
    "skills":" skills commo separated"
    
}' \
https://glacial-wave-89509.herokuapp.com/addStudents/


```
### One shot Task
Created by Sanjay Babu 18BIS0001 
