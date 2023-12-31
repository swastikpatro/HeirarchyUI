import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

const DisplayEmployeeInfoModal = ({
  isOpen,
  onClose,
  employeeDataToDisplay,
}) => {
  const {
    employeeInfo: { employeeName, employeeEmail, employeePhone },
    position,
  } = employeeDataToDisplay;

  let department = employeeDataToDisplay?.department;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(8px)" />
      <ModalContent w="90vw" maxW="400px">
        <ModalHeader letterSpacing="wide">Employee Info</ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={6} display="flex" flexDir="column" gap="1rem">
          <Text display="flex" gap=".5rem">
            <Box as="span" fontWeight="semibold">
              Name:{' '}
            </Box>

            <Box
              as="span"
              // for bigger names
              maxH="4rem"
              overflow={'auto'}
            >
              {employeeName}
            </Box>
          </Text>

          <Text display="flex" gap=".5rem" textTransform="capitalize">
            <Box as="span" fontWeight="semibold">
              Position:{' '}
            </Box>

            <Box as="span">{position}</Box>
          </Text>

          {!!department && (
            <Text display="flex" gap=".5rem" textTransform="capitalize">
              <Box as="span" fontWeight="semibold">
                Department:{' '}
              </Box>

              <Box as="span">{department}</Box>
            </Text>
          )}

          <Text display="flex" gap=".5rem">
            <Box as="span" fontWeight="semibold">
              Email:{' '}
            </Box>

            <Box
              as="span"
              // for bigger emails
              maxH="4rem"
              overflow={'auto'}
            >
              {employeeEmail}
            </Box>
          </Text>

          <Text display="flex" gap=".5rem">
            <Box as="span" fontWeight="semibold">
              Phone:{' '}
            </Box>

            <Box as="span">{employeePhone}</Box>
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DisplayEmployeeInfoModal;
