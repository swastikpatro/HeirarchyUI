import { useSelector } from 'react-redux';

import { Employee } from '../Components';

const Home = () => {
  const employeeTree = useSelector(state => state.employeeTree.employeesData);

  return (
    <>
      <Employee employeeData={employeeTree} />
    </>
  );
};

export default Home;
