
**KAROLIS AWESOME JUNIOR APP REST API DOCUMENTATION**

    dev server heroku - https://junior-back-dev.herokuapp.com/

    master server heroku - https://junior-back.herokuapp.com/



**End-points:**

Post:

https://junior-back-dev.herokuapp.com/api/job/email/sub  => email subscribtion, saves email to DB:
 + email
 
https://junior-back-dev.herokuapp.com/api/job/email/newsletter => sending newsletter to every subscriber:
  + text
  + subject

https://junior-back-dev.herokuapp.com/api/job/addJob  => adding job:  
 + jobTitle: 
 + location
 + companyName
 + experience
 + requirements
 + languages
 + summery
 + benefits
 + salary
 + level
 
 
https://junior-back-dev.herokuapp.com/api/job/addCategory   =>  adding category:
 + category

https://junior-back-dev.herokuapp.com/api/job/addLanguage  => adding language:
 + language

https://junior-back-dev.herokuapp.com/api/auth/register  => Register a user

**AU**
   + email
   + username
   + password
   + rePassword   


Get

https://junior-back-dev.herokuapp.com/api/job/  => getting all jobs

https://junior-back-dev.herokuapp.com/api/job/languages  => getting all languages

https://junior-back-dev.herokuapp.com/api/job/categories  => getting all categories

https://junior-back-dev.herokuapp.com/api/job/id/:id  => getting jobs by id

https://junior-back-dev.herokuapp.com/api/job/level/:level  =>  Getting Jobs by LEVEL

https://junior-back-dev.herokuapp.com/api/job/language/:language  => getting jobs by language

https://junior-back-dev.herokuapp.com/api/job/categories/:category  => getting jobs by category

https://junior-back-dev.herokuapp.com/api/job/img/:imgName  => getting img by jobImage String from jobs model


Delete

https://junior-back-dev.herokuapp.com/api/job/language/delete/:id   =>  deleting LANGUAGE by ID  AU

https://junior-back-dev.herokuapp.com/api/job/language/delete/all   =>  deleting all LANGUAGES  AU

https://junior-back-dev.herokuapp.com/api/job/category/delete/:id    =>  Deleting CATEGORY by ID  AU

https://junior-back-dev.herokuapp.com/api/job/category/delete/all    => Deleting all CATEGORIES  AU

https://junior-back-dev.herokuapp.com/api/job/delete/:id     => Deleting JOB by ID  AU

https://junior-back-dev.herokuapp.com/api/job/delete/all     => Deleting all JOBS  AU

https://junior-back-dev.herokuapp.com/api/auth/user/delete/:email    => Deleting USER by EMAIL  AU


NOTE
    - Keep in mind, all routes with AU simple needs JWT in header to authenticate, before activating controller!

    Sending JWT from REACT:

      axios.post(
                   "https://junior-back-dev.herokuapp.com/api/auth/register",
                   values,
                   {
                        headers: {
                             'Authorization': `JWT ${localStorage.getItem('jwtToken')}`
                        }
                   }) 
                 
            Keep in mind, that Junior-front provides config token in modules/Auth.js => header






