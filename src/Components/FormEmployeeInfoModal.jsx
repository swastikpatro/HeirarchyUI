import { useDispatch, useSelector } from 'react-redux';

import { useRef, useState } from 'react';

import { v4 as uuid } from 'uuid';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';

// from internal
import {
  hasEqualProperties,
  showToast,
  validatePhoneNum,
} from '../utils/utils';

import { PHONE_REGEX, TOAST_TYPE } from '../constants';

import {
  addEmployeeInTeam,
  updateEmployeeInfo,
} from '../store/employeeTreeSlice';

const FormEmployeeInfoModal = ({
  isOpen,
  onClose,
  isAddingEmployeeAndData = null,
  isEditingEmployeeAndData = null,
}) => {
  const initialRef = useRef(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const allEmployeesListFromStore = useSelector(
    store => store.searchEmployee.allEmployeesList
  );

  const initialState = {
    employeeName: isEditingEmployeeAndData?.employeeInfo.employeeName ?? '',
    employeeEmail: isEditingEmployeeAndData?.employeeInfo.employeeEmail ?? '',
    employeePhone: isEditingEmployeeAndData?.employeeInfo.employeePhone ?? '',
  };

  const isEmptyOrValidPhoneInitialState =
    !initialState.employeePhone ||
    validatePhoneNum({
      pattern: PHONE_REGEX,
      phoneNumber: initialState.employeePhone,
    });

  const [employeeInfoInputs, setEmployeeInfoInputs] = useState(initialState);

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(
    isEmptyOrValidPhoneInitialState
  );

  const handleEmployeeInfoChange = ({ target: { name, value } }) => {
    setEmployeeInfoInputs({
      ...employeeInfoInputs,
      [name]: value,
    });

    if (name === 'employeePhone') {
      const isEmptyOrValidPhoneValue =
        !value ||
        validatePhoneNum({
          pattern: PHONE_REGEX,
          phoneNumber: value.trim(),
        });

      setIsValidPhoneNumber(isEmptyOrValidPhoneValue);
    }
  };

  const handleSubmitEmployeeInfo = e => {
    e.preventDefault();

    let operationToastSuccessMessage = '';

    let isAnyInputsEmpty = false;

    const trimmedEmployeeInfoInputs = Object.keys(employeeInfoInputs).reduce(
      (acc, currKey) => {
        acc[currKey] = employeeInfoInputs[currKey].trim();

        if (currKey === 'employeeEmail') {
          // gmail ids are case-insensitive
          acc[currKey] = acc[currKey].toLowerCase();
        }

        if (!acc[currKey]) {
          isAnyInputsEmpty = true;
        }

        return acc;
      },
      {}
    );

    const { isMailAreadyExists, isPhoneAlreadyExists } =
      allEmployeesListFromStore.reduce(
        (acc, { id, employeeInfo: { employeePhone, employeeEmail } }) => {
          if (
            !!isEditingEmployeeAndData &&
            id === isEditingEmployeeAndData.id
          ) {
            return acc;
          }

          acc.isPhoneAlreadyExists =
            employeePhone === trimmedEmployeeInfoInputs.employeePhone ||
            acc.isPhoneAlreadyExists;

          acc.isMailAreadyExists =
            employeeEmail === trimmedEmployeeInfoInputs.employeeEmail ||
            acc.isMailAreadyExists;

          return acc;
        },
        { isMailAreadyExists: false, isPhoneAlreadyExists: false }
      );

    if (isAnyInputsEmpty) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: 'Please fill all the inputs',
      });
      return;
    }

    if (!isValidPhoneNumber) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: 'Phone Number Not Valid.',
      });
      return;
    }
    if (isMailAreadyExists) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: 'Email Already Exists. Try different.',
      });
      return;
    }

    if (isPhoneAlreadyExists) {
      showToast({
        toast,
        type: TOAST_TYPE.Error,
        message: 'Phone Already Exists. Try different.',
      });
      return;
    }

    if (isEditingEmployeeAndData) {
      if (
        hasEqualProperties({
          stateData: trimmedEmployeeInfoInputs,
          dataObj: isEditingEmployeeAndData.employeeInfo,
        })
      ) {
        onClose();
        return;
      }

      operationToastSuccessMessage = 'Successfully Edited Employee Info.';

      dispatch(
        updateEmployeeInfo({
          updatedEmployeeInfo: trimmedEmployeeInfoInputs,
          idOfEmployeeToUpdate: isEditingEmployeeAndData.id,
        })
      );
    } else {
      const { department, teamId } = isAddingEmployeeAndData;

      operationToastSuccessMessage = 'Successfully Added Employee in the Team.';

      dispatch(
        addEmployeeInTeam({
          employeeToAdd: {
            id: uuid(),
            position: 'Team Member',
            isMember: true,
            department,
            employeeInfo: trimmedEmployeeInfoInputs,
            employeesUnder: [],
          },
          teamId,
        })
      );
    }

    showToast({
      toast,
      type: TOAST_TYPE.Success,
      message: operationToastSuccessMessage,
    });

    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
      <ModalContent w="90vw" maxW="400px">
        <ModalHeader letterSpacing="wide">
          {isEditingEmployeeAndData ? 'Edit' : 'Add'} Employee Info
        </ModalHeader>

        <ModalCloseButton />

        <Box as="form" onSubmit={handleSubmitEmployeeInfo}>
          <ModalBody pb={6} display="flex" flexDir="column" gap="1rem">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                autoComplete="off"
                type="text"
                ref={initialRef}
                name="employeeName"
                onChange={handleEmployeeInfoChange}
                placeholder="Enter Employee Name"
                value={employeeInfoInputs.employeeName}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="off"
                type="email"
                name="employeeEmail"
                onChange={handleEmployeeInfoChange}
                placeholder="Enter Employee Email"
                value={employeeInfoInputs.employeeEmail}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                autoComplete="off"
                type="tel"
                name="employeePhone"
                onChange={handleEmployeeInfoChange}
                placeholder="Enter Employee Phone"
                value={employeeInfoInputs.employeePhone}
              />
              {!isValidPhoneNumber && (
                <Text color="red.500" mt=".5rem">
                  {/* hardcoded */}
                  Please enter a valid phone number in the format +91-xxxxxxxxxx
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter display={'flex'}>
            <Button onClick={onClose}>Cancel</Button>

            <Spacer />

            <Button colorScheme="blue" mr={3} type="submit">
              {isEditingEmployeeAndData ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FormEmployeeInfoModal;
