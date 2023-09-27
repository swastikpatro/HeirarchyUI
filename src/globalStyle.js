export const ellipsisStyle = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const headingStyles = {
  ...ellipsisStyle,
  fontSize: 'lg',
  letterSpacing: '1px',
  fontWeight: 'bold',
  mb: '.5rem',
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
};

export const bottomTextStyles = {
  fontSize: 'sm',
  fontWeight: 'normal',
  fontStyle: 'italic',
  color: 'gray.600',
  letterSpacing: '1px',
};
