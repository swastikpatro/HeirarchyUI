import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { Box, Card, Input, Text, Tooltip, useToast } from '@chakra-ui/react';

import { AiOutlineClear } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { HiCheck } from 'react-icons/hi';

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
import { TOAST_TYPE } from '../constants';

const TeamForm = ({ isAddingTeamAndData, isEditingTeamAndData }) => {
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
    dispatch(closeTeamEditForm());
  };

  const handleCheck = () => {
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

    if (isEditingTeamAndData.teamName === inputTeamNameTrimmed) {
      closeInput();
      return;
    }

    if (isEditingTeamAndData) {
      dispatch(
        editTeamInfo({
          teamId: isEditingTeamAndData.id,
          teamName: inputTeamNameTrimmed,
        })
      );

      showToast({
        toast,
        type: TOAST_TYPE.Success,
        message: 'Successfully Editted Team Name',
      });
    } else {
      // dispatch(
      //   // addTeamInfo({
      //   //   teamId: ,
      //   //   teamName: teamNameTrimmed,
      //   // })
      // );
    }

    closeInput();
  };

  return (
    <>
      <Card as="article" {...cardStyles}>
        <Box as="div" {...cardCenter}>
          <Box as="div" mb=".5rem">
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
              label={`${isEditingTeamAndData ? 'Update' : 'Add'} Team`}
              {...tooltipStyle}
            >
              <Box onClick={handleCheck} as="span" {...iconStyle}>
                <HiCheck />
              </Box>
            </Tooltip>

            <Tooltip label="Close Input" {...tooltipStyle}>
              <Box onClick={closeInput} as="span" {...iconStyle}>
                <CgClose />
              </Box>
            </Tooltip>

            <Tooltip label="Clear Input" {...tooltipStyle}>
              <Box onClick={clearInput} as="span" {...iconStyle}>
                <AiOutlineClear />
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
