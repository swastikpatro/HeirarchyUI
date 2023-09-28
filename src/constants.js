export const TOAST_TYPE = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
};

export const PHONE_REGEX = /^\+91-\d{10}$/;

export const employeesDataLocal = {
  id: 1,
  position: 'CEO',
  isMember: false,
  department: null,
  employeeInfo: {
    employeeName: 'Swastik Patro',
    employeePhone: '+91-9082931945',
    employeeEmail: 'swastik.patro2001@gmail.com',
  },
  employeesUnder: [
    {
      id: 2,
      position: 'Head of Staff',
      isMember: false,
      department: 'staff',
      employeeInfo: {
        employeeName: 'Jayesh',
        employeePhone: '+91-9082933545',
        employeeEmail: 'jayesh@gmail.com',
      },
      employeesUnder: [],
      teamsUnder: [
        {
          id: 5,
          department: 'staff',
          teamName: 'Staffing 1',
          employeesUnder: [
            {
              id: 6,
              position: 'Team Leader',
              isMember: false,
              department: 'staff',
              employeeInfo: {
                employeeName: 'Ram',
                employeePhone: '+91-9273112937',
                employeeEmail: 'ram@gmail.com',
              },
              employeesUnder: [],
            },
            {
              id: 7,
              position: 'Team Member',
              isMember: true,
              department: 'staff',
              employeeInfo: {
                employeeName: 'Laxman',
                employeePhone: '+91-9084431941',
                employeeEmail: 'laxman@gmail.com',
              },
              employeesUnder: [],
            },
          ],
        },
        {
          id: 8,
          department: 'staff',
          teamName: 'Staffing 2',
          employeesUnder: [
            {
              id: 9,
              position: 'Team Leader',
              isMember: false,
              department: 'staff',
              employeeInfo: {
                employeeName: 'Krishna',
                employeePhone: '+91-98253112937',
                employeeEmail: 'krishna@gmail.com',
              },
              employeesUnder: [],
            },
            {
              id: 10,
              position: 'Team Member',
              isMember: true,
              department: 'staff',
              employeeInfo: {
                employeeName: 'Vitthal',
                employeePhone: '+91-9084432222',
                employeeEmail: 'vitthal@gmail.com',
              },
              employeesUnder: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      position: 'Head of Engineering',
      isMember: false,
      department: 'engineering',
      employeeInfo: {
        employeeName: 'Naresh',
        employeePhone: '+91-9273932937',
        employeeEmail: 'naresh@gmail.com',
      },
      employeesUnder: [],
      teamsUnder: [
        {
          id: 11,
          department: 'engineering',
          teamName: 'Talented Team Of Top Engineers',
          employeesUnder: [
            {
              id: 12,
              position: 'Team Leader',
              isMember: false,
              department: 'engineering',
              employeeInfo: {
                employeeName: 'Gopal',
                employeePhone: '+91-9233882937',
                employeeEmail: 'gopal@gmail.com',
              },
              employeesUnder: [],
            },
            {
              id: 13,
              position: 'Team Member',
              isMember: true,
              department: 'engineering',
              employeeInfo: {
                employeeName: 'Govinda',
                employeePhone: '+91-9089931941',
                employeeEmail: 'govinda@gmail.com',
              },
              employeesUnder: [],
            },
          ],
        },
        {
          id: 14,
          department: 'engineering',
          teamName: 'Engineering 2',
          employeesUnder: [
            {
              id: 15,
              position: 'Team Leader',
              isMember: false,
              department: 'engineering',
              employeeInfo: {
                employeeName: 'Mohan',
                employeePhone: '+91-9223112337',
                employeeEmail: 'mohan@gmail.com',
              },
              employeesUnder: [],
            },
            {
              id: 16,
              position: 'Team Member',
              isMember: true,
              department: 'engineering',
              employeeInfo: {
                employeeName: 'Narayana',
                employeePhone: '+91-9664431771',
                employeeEmail: 'narayana@gmail.com',
              },
              employeesUnder: [],
            },
          ],
        },
        {
          id: 100,
          department: 'engineering',
          teamName: 'Engineering 3',
          employeesUnder: [
            {
              id: 101,
              position: 'Team Leader',
              isMember: false,
              department: 'engineering',
              employeeInfo: {
                employeeName: 'Vasu',
                employeePhone: '+91-9003112337',
                employeeEmail: 'vasu@gmail.com',
              },
              employeesUnder: [],
            },
            {
              id: 102,
              position: 'Team Member',
              isMember: true,
              department: 'engineering',
              employeeInfo: {
                employeeName: 'Ganesh',
                employeePhone: '+91-9994431991',
                employeeEmail: 'ganesh@gmail.com',
              },
              employeesUnder: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      position: 'Head of Design',
      isMember: false,
      department: 'design',
      employeeInfo: {
        employeeName: 'Satyanarayan Laxminarayan Subramaniam Swamy',
        employeePhone: '+91-9083531941',
        employeeEmail: 'suresh@gmail.com',
      },
      employeesUnder: [],
      teamsUnder: [
        {
          id: 17,
          department: 'design',
          teamName: 'Design 1',
          employeesUnder: [
            {
              id: 18,
              position: 'Team Leader',
              isMember: false,
              department: 'design',
              employeeInfo: {
                employeeName: 'Jagadish',
                employeePhone: '+91-9233882911',
                employeeEmail: 'jagadish@gmail.com',
              },
              employeesUnder: [],
            },
            {
              id: 19,
              position: 'Team Member',
              isMember: true,
              department: 'design',
              employeeInfo: {
                employeeName: 'Keshav',
                employeePhone: '+91-9089931922',
                employeeEmail: 'keshav@gmail.com',
              },
              employeesUnder: [],
            },
          ],
        },
      ],
    },
  ],
};
