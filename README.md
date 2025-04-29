# Welcome to my Customizable Calculator App!
The purpose of this project is to give professors/instructors complete freedom in making a calculator for each of their courses. Instructors will be able to add their courses and customize what functions are available for each course calculator. Then, they can create a unique link that can be embedded into exams or quizzes for student use. The link will direct students to a login page where they will login with their school ID/number and password. If they haven't already, it will ask them to create an account. The students will then be directed to the calculator page with whatever functions were made available by their instructor.

# Initial Login Page
When you first open the app on localhost, it assumes it is an Instructor login. In the cases where a Student somehow ended up on this part of the app, they won't be able to login with their information. They are only able to access the Student login using the link given by their Instructor. This ensures a Student can't gain Instructor privileges as well as not being able to access other calculators.

# Instructor Sign-up Page
This page will ask for the Instructor's first and last name, email, and password to create an account. Upon creating the account, the Instructor is redirected to the 'Instructor Verification Page'.

# Instructor Verification Page
The whole purpose of this page is to simulate the scenario where someone other than an Instructor tries to create an account. The Instructor would wait to receive a code from the company that owns the application, who checked with the University or School to verify the Instructor's identity. Once the Instructor puts in the code, they will be directed to their 'Courses Page'. If they left the page before verifying, the sign-in page will redirect them back to this page until they verify themselves.

   ## TODO
      - Style these pages

# Courses Page
This is the page an Instructor is directed to after successful login. It will list all of their courses, which each act as a link to their own 'Course Page'. If an Instructor needs to Add a Course, there is a button that will redirect them to the 'Course Creation' page.

# Course Creation Page
This page contains a form that will ask for the name of the Course (i.e. Linear Algebra, Physics 2) and the Course Number (i.e. MATH2270, PHYS2210). As of now, this is all that is required for the Course upon creation. Once the Course is created, it will redirect back to the 'Courses Page' where it is displayed as a card.

# Course Page
This page acts as the 'Edit Calculator Page' for that specific Course. When an Instructor clicks a Course on the 'Courses Page', they are directed to this page. It will list all the possible functions for the calculator as toggleable buttons, which the Instructor can turn on or off. When the Instructor is done customizing the calculator, they can click the 'Generate Link' button which will create a link for Student use. There will also be a 'Delete Course' button, which will create a pop-up asking if the Instructor really wants to delete the Course, to which they can press Yes or No. If yes, they are redirected to the 'Courses Page'.

   ## TODO (Use Professor Ditton's Todo app as a reference on how to do some of this)
      - Don't forget to include error handling for all endpoints (maybe include loading and error components), and update 'urls.py'
         * If fetch or any error happens, reference Ditton's 'Todo.jsx' error handling
      - Create a EditCourse page component that acts as the page for a specific Course where the Instructor can edit the calculator
         * Create a Generate Link button that is disabled until the Instructor enables at least one function
      - Style these pages (App.jsx should act as the navbar with the site-wide page header and logout button)
         * Maybe highlight functions that are currently enabled

# Calculator Component

   ## TODO
      - Make it so that when the Instructor turns a function on or off, they can use the key on the keyboard (need to dynamically update)
      - Style the Calculator to make it user-friendly (look at other online calculators)