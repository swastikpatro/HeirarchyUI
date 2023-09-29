# Hierarchy UI

Gives Hierarchical UI for a company that shows all the employees.

## **How to install and run locally ?**

```
$ git clone https://github.com/swastikpatro/HeirarchyUI.git
$ cd HeirarchyUI/
$ npm install
$ npm start
```

## **Live Link :**

[Hierarchy UI](https://heirarchy-ui.vercel.app/)

## Screenshots: 

- Hierarchy (Destktop)
![image](https://github.com/swastikpatro/HeirarchyUI/assets/113245457/03fbad2d-f027-4f0e-9e70-a2779bc58393)
![image](https://github.com/swastikpatro/HeirarchyUI/assets/113245457/b0dcce61-a77d-4bcf-9982-3615ecf8ac62)


- Hierarchy (Mobile)
![image](https://github.com/swastikpatro/HeirarchyUI/assets/113245457/0f4caeea-54b3-419f-88c5-1d454582f7a7)

- Search (Desktop)
![image](https://github.com/swastikpatro/HeirarchyUI/assets/113245457/456e876a-8b8e-417e-891d-bfa3bcf2988e)



## **Features -**

0. Responsive UI with ellipsis for bigger texts where needed.
1. Add Team Member and Update Team Member's Information (Two Employee cannot have same email (case-insensitive) or same phone number).
2. Remove Team Member
3. Change Team of a Member (Within the same department i.e Engineering Team Member can't be moved to HR or other department)
4. Create New Team.
5. Edit Team (Two Teams in a department cannot be edited at the same time).
6. Filter Employee by Name, Email or Phone Number using the Debounced Search with Highlighing the info of the employee.
7. Two Teams cannot have the same name.
8. Promote Team Member to Team Leader and (assumption) demote the employee on the Team Leader level.
9. Data Persistance.

## **Tech Stack -**

0. React.js
1. Redux Toolkit (For state management)
2. React Router DOM (For Routing)
3. Chakra UI (UI Library for Basic Components)
4. React Icons
