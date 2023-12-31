import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Box, Card, Input, Text, Tooltip, useToast } from '@chakra-ui/react';

import { CgClose } from 'react-icons/cg';
import { HiCheck } from 'react-icons/hi';
import { GrRefresh } from 'react-icons/gr';

import {
  bottomTextStyles,
  cardCenter,
  cardStyles,
  iconStyle,
  tooltipStyle,
} from '../globalStyle';

import {
  addTeamInfo,
  closeTeamEditForm,
  editTeamInfo,
} from '../store/employeeTreeSlice';

import Employee from './Employee';
import { showToast } from '../utils/utils';
import { TOAST_TYPE, TOOLTIP_LABELS } from '../constants';

const TeamForm = ({
  isAddingTeamAndData = null,
  isEditingTeamAndData = null,
}) => {
  const initialState = isEditingTeamAndData
    ? isEditingTeamAndData.teamName
    : '';

  const [teamName, setTeamName] = useState(initialState);
  const inputTeamNameTrimmed = teamName.trim();

  const dispatch = useDispatch();
  const toast = useToast();

  const allTeamsFromStore = useSelector(store => store.employeeTree.allTeams);
  const isTeamNameAlreadyExists = allTeamsFromStore.find(
    ({ id, teamName }) =>
      teamName.toLowerCase() === inputTeamNameTrimmed.toLowerCase() &&
      id !== isEditingTeamAndData?.id
  );

  let hasOneOrNoMemberInTeam;
  if (!!isEditingTeamAndData) {
    const teamMembersList = isEditingTeamAndData.employeesUnder.filter(
      ({ isMember }) => isMember
    );

    hasOneOrNoMemberInTeam = teamMembersList.length <= 1;
  }

  const clearInput = () => setTeamName('');

  const closeInput = () => {
    if (isEditingTeamAndData) {
      dispatch(closeTeamEditForm());
    }

    if (isAddingTeamAndData) {
      isAddingTeamAndData.closeAddingTeamForm();
    }
  };

  const handleCheck = () => {
    let operationToastSuccessMessage = '';

    if (!inputTeamNameTrimmed) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: 'Please enter some text in the Input',
      });
      return;
    }

    if (isTeamNameAlreadyExists) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: 'Team Name Already Exists. Try Different Name',
      });
      return;
    }

    if (isEditingTeamAndData?.teamName === inputTeamNameTrimmed) {
      closeInput();
      return;
    }

    if (isEditingTeamAndData) {
      operationToastSuccessMessage = 'Successfully Edited Team Name';

      dispatch(
        editTeamInfo({
          teamId: isEditingTeamAndData.id,
          teamName: inputTeamNameTrimmed,
        })
      );
    } else {
      operationToastSuccessMessage = 'Successfully Added New Team';

      dispatch(
        addTeamInfo({
          id: uuid(),
          teamName: inputTeamNameTrimmed,
          department: isAddingTeamAndData.department,
          employeesUnder: [],
        })
      );
    }

    showToast({
      toast,
      type: TOAST_TYPE.Success,
      message: operationToastSuccessMessage,
    });

    closeInput();
  };

  return (
    <>
      <Card as="article" {...cardStyles}>
        <Box as="div" {...cardCenter}>
          <Box as="div">
            <Input
              outlineColor="transparent"
              borderWidth="2px"
              borderColor={isTeamNameAlreadyExists ? 'red.500' : 'black'}
              sx={{
                _hover: {
                  borderColor: isTeamNameAlreadyExists ? 'red.500' : 'black',
                },
                _focusVisible: {
                  border: `2px solid ${
                    isTeamNameAlreadyExists ? 'red.500' : 'black'
                  }`,
                },
              }}
              placeholder="Please Enter Team Name"
              onChange={({ target }) => setTeamName(target.value)}
              value={teamName}
              autoFocus
            />
          </Box>

          <Box
            as="div"
            display={'flex'}
            columnGap={{ base: '.35rem', md: '.5rem' }}
          >
            <Tooltip
              label={
                isEditingTeamAndData
                  ? TOOLTIP_LABELS.UPDATE_TEAM
                  : TOOLTIP_LABELS.ADD_TEAM
              }
              {...tooltipStyle}
            >
              <Box onClick={handleCheck} as="span" {...iconStyle}>
                <HiCheck />
              </Box>
            </Tooltip>

            <Tooltip label={TOOLTIP_LABELS.CLOSE_INPUT} {...tooltipStyle}>
              <Box onClick={closeInput} as="span" {...iconStyle}>
                <CgClose />
              </Box>
            </Tooltip>

            <Tooltip label={TOOLTIP_LABELS.CLEAR_INPUT} {...tooltipStyle}>
              <Box onClick={clearInput} as="span" {...iconStyle}>
                <GrRefresh />
              </Box>
            </Tooltip>
          </Box>
        </Box>

        <Text {...bottomTextStyles}>Team</Text>
      </Card>

      {isEditingTeamAndData && (
        <Box
          as="div"
          pl={{ base: '1.25rem', md: '1.5rem', lg: '2rem' }}
          ml={{ base: '.25rem', md: '.5rem', lg: '.75rem' }}
          borderLeft={'2px solid black'}
        >
          {isEditingTeamAndData.employeesUnder.map(singleEmployee => (
            <Employee
              key={singleEmployee.id}
              employeeData={singleEmployee}
              teamId={isEditingTeamAndData.id}
              hasOneOrNoMemberInTeam={hasOneOrNoMemberInTeam}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default TeamForm;
