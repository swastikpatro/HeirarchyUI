import { useDispatch } from 'react-redux';

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';

import { GiJumpAcross } from 'react-icons/gi';

import { ellipsisStyle, iconStyle, tooltipStyle } from '../globalStyle';

import { showToast } from '../utils/utils';
import { TOAST_TYPE } from '../constants';

import { changeTeamOfEmployee } from '../store/employeeTreeSlice';

const MenuTeamChange = ({
  tooltipLabel,
  availableTeamsToMove,
  employeeObj,
  idOfCurrentTeam,
  isDisabled,
}) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const handleChangeTeamClick = teamId => {
    dispatch(
      changeTeamOfEmployee({
        employeeToBeMoved: employeeObj,
        idOfTeamToMoveFrom: idOfCurrentTeam,
        idOfTeamToMoveTo: teamId,
      })
    );

    showToast({
      toast,
      type: TOAST_TYPE.Success,
      message: `Successfully Changed Team`,
    });
  };

  if (isDisabled) {
    return (
      <Tooltip label={tooltipLabel} {...tooltipStyle}>
        <Box
          onClick={() =>
            showToast({
              toast,
              type: TOAST_TYPE.Error,
              message: `Cannot move. Only member in Team or No other teams available`,
            })
          }
          as="span"
          {...iconStyle}
          color={isDisabled ? 'gray.500' : 'black'}
        >
          <GiJumpAcross />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Menu>
      <Tooltip label={tooltipLabel} {...tooltipStyle}>
        <MenuButton
          variant="unstyled"
          aria-label="Options"
          // overriding
          {...iconStyle}
          sx={{
            h: 'fit-content',
            minW: 'fit-content',
            bg: 'transparent',
            _hover: { bg: 'transparent' },
            _focus: { bg: 'transparent' },
          }}
          as={IconButton}
          icon={<GiJumpAcross />}
        />
      </Tooltip>

      <MenuList maxW="10rem" py=".5rem" boxShadow="xl">
        <Text p=".75rem" pt="0" fontWeight="semibold">
          Move To Team
        </Text>

        {availableTeamsToMove.map(({ id: teamId, teamName }) => (
          <MenuItem onClick={() => handleChangeTeamClick(teamId)} key={teamId}>
            <Text {...ellipsisStyle}>{teamName}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuTeamChange;
