import { Box, Card, Heading, Text, Tooltip } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { AiOutlineFilter, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

import Employee from './Employee';
import {
  bottomTextStyles,
  cardCenter,
  cardStyles,
  headingStyles,
  iconStyle,
  tooltipStyle,
} from '../globalStyle';
import {
  addEmployeeInTeam,
  updateIdOfTeamToEdit,
} from '../store/employeeTreeSlice';

const Team = ({ teamData }) => {
  const { id: teamId, teamName, department, employeesUnder } = teamData;
  const dispatch = useDispatch();

  const teamMembersList = employeesUnder.filter(({ isMember }) => isMember);
  const hasOneOrNoMemberInTeam = teamMembersList.length <= 1;

  return (
    <>
      <Card as="article" {...cardStyles}>
        <Box as="div" {...cardCenter}>
          <Heading as="h2" {...headingStyles}>
            {teamName}
          </Heading>

          <Box
            as="div"
            display={'flex'}
            columnGap={{ base: '.35rem', md: '.5rem' }}
          >
            <Tooltip label="Add Member" {...tooltipStyle}>
              <Box
                as="span"
                {...iconStyle}
                onClick={() => {
                  dispatch(
                    addEmployeeInTeam({
                      employeeToAdd: {
                        id: new Date().getTime(),
                        position: 'Team Member',
                        isMember: true,
                        department,
                        employeeInfo: {
                          employeeName: 'Ram',
                          employeePhone: '9273112937',
                          employeeEmail: 'ram@gmail.com',
                        },
                        employeesUnder: [],
                      },
                      teamId,
                    })
                  );
                }}
              >
                <AiOutlinePlusCircle />
              </Box>
            </Tooltip>

            <Tooltip label="Edit Info" {...tooltipStyle}>
              <Box
                as="span"
                {...iconStyle}
                onClick={() => {
                  dispatch(updateIdOfTeamToEdit(teamId));
                }}
              >
                <BsPencil />
              </Box>
            </Tooltip>

            <Tooltip label="Filter Employee" {...tooltipStyle}>
              <Box as="span" {...iconStyle}>
                <AiOutlineFilter />
              </Box>
            </Tooltip>
          </Box>
        </Box>

        <Text {...bottomTextStyles}>Team</Text>
      </Card>

      <Box
        as="div"
        pl={{ base: '1.25rem', md: '1.5rem', lg: '2rem' }}
        ml={{ base: '.25rem', md: '.5rem', lg: '.75rem' }}
        borderLeft={'2px solid black'}
      >
        {employeesUnder.map(singleEmployee => (
          <Employee
            key={singleEmployee.id}
            employeeData={singleEmployee}
            teamId={teamId}
            hasOneOrNoMemberInTeam={hasOneOrNoMemberInTeam}
          />
        ))}
      </Box>
    </>
  );
};

export default Team;
