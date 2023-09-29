import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const HighlightText = ({ sentence }) => {
  const searchQuery = useSelector(store => store.searchEmployee.searchQuery);

  const textToBeHighlighted = searchQuery.trim();

  const escapedHighlight = textToBeHighlighted.replace(
    /[.+*?^${}()|[\]\\]/g,
    '\\$&'
  );

  const splittedParts = sentence.split(
    new RegExp(`(${escapedHighlight})`, 'gi')
  );

  return (
    <Box as="span">
      {splittedParts.map((singlePart, index) => (
        <Box
          as="span"
          key={index}
          bg={
            singlePart.toLowerCase() === textToBeHighlighted.toLowerCase()
              ? 'yellow.300'
              : 'inherit'
          }
        >
          {singlePart}
        </Box>
      ))}
    </Box>
  );
};

export default HighlightText;
