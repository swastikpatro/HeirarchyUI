# Hierarchy UI

Gives Hierarchical UI for a company that shows all the employees.

## **How to install and run locally ?**

```
$ git clone https://github.com/swastikpatro/HeirarchyUI.git
$ cd heirarchy-ui/
$ npm install
$ npm start
```

## **Live Link :**

[Hierarchy UI](https://heirarchy-ui.vercel.app/)

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
