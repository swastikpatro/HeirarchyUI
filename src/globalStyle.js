export const ellipsisStyle = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const sectionCenter = {
  w: '90vw',
  maxW: '1280px',
  mx: 'auto',
};

export const headingStyles = {
  ...ellipsisStyle,
  fontSize: 'lg',
  letterSpacing: '1px',
  fontWeight: 'bold',
};

export const tooltipStyle = {
  hasArrow: true,
  pb: '.25rem',
};
export const iconStyle = {
  fontSize: 'xl',
  cursor: 'pointer',
};

export const cardStyles = {
  mb: '1rem',
  p: '.75rem 1rem',
  w: { base: '100%' },
  minW: { md: '25rem' },
  maxW: { md: '25rem' },
};

export const cardCenter = {
  display: 'flex',
  flexDir: 'row',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: '.5rem',
};

export const bottomTextStyles = {
  fontSize: 'sm',
  fontWeight: 'normal',
  fontStyle: 'italic',
  color: 'gray.600',
  letterSpacing: '1px',
};

export const errorTextStyle = {
  fontSize: { base: 'md', md: 'lg' },
  color: 'red.500',
  letterSpacing: 'wider',
};

export const navStyles = {
  h: { base: '4rem', md: '5rem' },
  boxShadow: 'lg',
  pos: 'fixed',
  top: '0',
  left: '0',
  w: '100vw',
  display: 'grid',
  placeItems: 'center',
  zIndex: '100',
  backdropFilter: 'blur(10px)',
};

export const linkToButtonStyles = {
  bg: 'blue.500',
  color: 'white',
  borderRadius: 'lg',
  py: '.5rem',
  w: '6rem',
  display: 'flex',
  mx: 'auto',
  justifyContent: 'center',
  transition: 'all .3s linear',
  sx: {
    _hover: {
      textDecor: 'none',
      boxShadow: { md: 'lg' },
      bg: { md: 'blue.600' },
    },
  },
};
