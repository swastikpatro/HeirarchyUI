import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import { headingStyles } from '../globalStyle';
import HighlightText from './HighlightText';

const EmployeeInfoCard = ({ employeeInfo }) => {
  const { employeeName, employeeEmail, employeePhone } = employeeInfo;

  return (
    <Card as="article" boxShadow="md">
      <CardHeader boxShadow="base">
        <Heading as="h3" {...headingStyles} fontWeight="semibold">
          <HighlightText sentence={employeeName} />
        </Heading>
      </CardHeader>

      <CardBody>
        <Text display="flex" gap=".5rem">
          <Box as="span" fontWeight="semibold">
            Email:
          </Box>
          <HighlightText sentence={employeeEmail} />
        </Text>

        <Text display="flex" gap=".5rem">
          <Box as="span" fontWeight="semibold">
            Phone:
          </Box>
          <HighlightText sentence={employeePhone} />
        </Text>
      </CardBody>
    </Card>
  );
};

export default EmployeeInfoCard;
