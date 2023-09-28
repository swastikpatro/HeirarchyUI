import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import {
  Box,
  Card,
  Heading,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { BsTrash, BsPencil } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { HiArrowNarrowUp } from 'react-icons/hi';

import {
  bottomTextStyles,
  cardCenter,
  cardStyles,
  headingStyles,
  iconStyle,
  tooltipStyle,
} from '../globalStyle';
import { showToast } from '../utils/utils';
import { TOAST_TYPE } from '../constants';

import {
  closeTeamEditForm,
  promoteEmployeeInTeam,
  removeEmployeeFromTeam,
} from '../store/employeeTreeSlice';

import Team from './Team';
import MenuTeamChange from './MenuTeamChange';
import TeamForm from './TeamForm';
import FormEmployeeInfoModal from './FormEmployeeInfoModal';

const Employee = ({ employeeData, teamId, hasOneOrNoMemberInTeam }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    isOpen: isDisplayEmployeeInfoModalOpen,
    onOpen: onDisplayEmployeeInfoModalOpen,
    onClose: onDisplayEmployeeInfoModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditFormEmployeeInfoModalOpen,
    onOpen: onEditFormEmployeeInfoModalOpen,
    onClose: onEditFormEmployeeInfoModalClose,
  } = useDisclosure();

  const allTeamsFromStore = useSelector(store => store.employeeTree.allTeams);

  const idOfTeamToEditFromStore = useSelector(
    store => store.employeeTree.idOfTeamToEdit
  );

  const {
    id: employeeId,
    position,
    department: employeeDepartment,
    employeeInfo,
    employeesUnder,
    isMember,
  } = employeeData;

  const { employeeName, employeePhone, employeeEmail } = employeeInfo;

  const isHeadOfDepartmentAndHasTeams = !!employeeData?.teamsUnder;
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  // start: for change Team
  const availableTeamsToMove = allTeamsFromStore.filter(
    singleTeamFromStore =>
      singleTeamFromStore.department === employeeDepartment &&
      singleTeamFromStore.id !== teamId
  );

  const isChangeTeamDisable =
    hasOneOrNoMemberInTeam || availableTeamsToMove.length <= 0;
  // end: for change Team

  const toggleIsAddingTeam = () => {
    const isAnyTeamCurrentlyEditingAndNowAdd =
      !isAddingTeam & !!idOfTeamToEditFromStore;

    if (isAnyTeamCurrentlyEditingAndNowAdd) {
      dispatch(closeTeamEditForm());
    }

    setIsAddingTeam(!isAddingTeam);
  };

  useEffect(() => {
    if (!!idOfTeamToEditFromStore && isAddingTeam) {
      setIsAddingTeam(false);
    }
  }, [idOfTeamToEditFromStore]);

  const handleDeleteMember = () => {
    if (hasOneOrNoMemberInTeam) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: `Cannot remove '${employeeName}'. Minimum team members size reached.`,
      });
      return;
    }

    dispatch(
      removeEmployeeFromTeam({
        idOfEmployeeToDelete: employeeId,
        teamId,
      })
    );

    showToast({
      toast,
      type: TOAST_TYPE.Success,
      message: `Successfully Removed '${employeeName}'`,
    });
  };

  const handlePromoteMember = () => {
    dispatch(
      promoteEmployeeInTeam({
        idOfEmployeeToPromote: employeeId,
        teamId,
      })
    );

    showToast({
      toast,
      type: TOAST_TYPE.Success,
      message: `Successfully Promoted '${employeeName}'`,
    });
  };

  const uiForMembersJSX = (
    <>
      <Tooltip label="Promote Employee" {...tooltipStyle}>
        <Box as="span" {...iconStyle} onClick={handlePromoteMember}>
          <HiArrowNarrowUp />
        </Box>
      </Tooltip>

      <Tooltip label="Update Employee Info" {...tooltipStyle}>
        <Box as="span" {...iconStyle} onClick={onEditFormEmployeeInfoModalOpen}>
          <BsPencil />
        </Box>
      </Tooltip>

      {isEditFormEmployeeInfoModalOpen && (
        <FormEmployeeInfoModal
          isOpen={isEditFormEmployeeInfoModalOpen}
          onClose={onEditFormEmployeeInfoModalClose}
          isEditingEmployeeAndData={employeeData}
        />
      )}

      <Tooltip label="Remove Employee" {...tooltipStyle}>
        <Box
          as="span"
          {...iconStyle}
          color={hasOneOrNoMemberInTeam ? 'gray.500' : 'black'}
          onClick={handleDeleteMember}
        >
          <BsTrash />
        </Box>
      </Tooltip>

      <MenuTeamChange
        tooltipLabel="Change Team"
        availableTeamsToMove={availableTeamsToMove}
        idOfCurrentTeam={teamId}
        employeeObj={employeeData}
        isDisabled={isChangeTeamDisable}
      />
    </>
  );

  return (
    <>
      <Card as="article" {...cardStyles}>
        <Box as="div" {...cardCenter}>
          <Heading as="h3" {...headingStyles} fontWeight="semibold">
            {employeeName}
          </Heading>

          <Box
            as="div"
            display={'flex'}
            columnGap={{ base: '.35rem', md: '.5rem' }}
          >
            <Tooltip label="Info" {...tooltipStyle}>
              <Box as="span" {...iconStyle}>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip>

            {!isAddingTeam && isHeadOfDepartmentAndHasTeams && (
              <Tooltip label="Add Team" {...tooltipStyle}>
                <Box onClick={toggleIsAddingTeam} as="span" {...iconStyle}>
                  <AiOutlinePlusCircle />
                </Box>
              </Tooltip>
            )}

            {isMember && uiForMembersJSX}
          </Box>
        </Box>

        <Text {...bottomTextStyles}>{position}</Text>
      </Card>

      <Box
        as="div"
        pl={{ base: '1.25rem', md: '1.5rem', lg: '2rem' }}
        ml={{ base: '.25rem', md: '.5rem', lg: '.75rem' }}
        borderLeft={'2px solid black'}
      >
        {isHeadOfDepartmentAndHasTeams ? (
          <>
            {employeeData.teamsUnder.map(singleTeam =>
              singleTeam.id === idOfTeamToEditFromStore ? (
                <TeamForm
                  key={singleTeam.id}
                  isEditingTeamAndData={singleTeam}
                />
              ) : (
                <Team key={singleTeam.id} teamData={singleTeam} />
              )
            )}

            {isAddingTeam && (
              <TeamForm
                isAddingTeamAndData={{
                  department: employeeDepartment,
                  closeAddingTeamForm: toggleIsAddingTeam,
                }}
              />
            )}
          </>
        ) : (
          employeesUnder.map(singleEmployee => (
            <Employee key={singleEmployee.id} employeeData={singleEmployee} />
          ))
        )}
      </Box>
    </>
  );
};

export default Employee;
