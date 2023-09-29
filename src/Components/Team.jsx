import { useDispatch } from 'react-redux';

import {
  Box,
  Card,
  Heading,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

import { AiOutlinePlusCircle } from 'react-icons/ai';
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

import { updateIdOfTeamToEdit } from '../store/employeeTreeSlice';

import FormEmployeeInfoModal from './FormEmployeeInfoModal';

const Team = ({ teamData }) => {
  const { id: teamId, teamName, department, employeesUnder } = teamData;
  const dispatch = useDispatch();

  const {
    isOpen: isAddFormEmployeeInfoModalOpen,
    onOpen: onAddFormEmployeeInfoModalOpen,
    onClose: onAddFormEmployeeInfoModalClose,
  } = useDisclosure();

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
                onClick={onAddFormEmployeeInfoModalOpen}
              >
                <AiOutlinePlusCircle />
              </Box>
            </Tooltip>

            {isAddFormEmployeeInfoModalOpen && (
              <FormEmployeeInfoModal
                isOpen={isAddFormEmployeeInfoModalOpen}
                onClose={onAddFormEmployeeInfoModalClose}
                isAddingEmployeeAndData={{
                  department,
                  teamId,
                }}
              />
            )}

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
