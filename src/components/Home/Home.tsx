import React, { ReactElement } from 'react';
import Navbar from '../Navbar/Navbar';
import SideNav from '../SideNav/SideNav';
import GraphCanvas from '../GraphCanvas/GraphCanvas';


interface HomeProps {
  changeTheme: Function;
}

const Home: React.FC<HomeProps> = (props: HomeProps): ReactElement => {
  return (
    <div>
      <SideNav />
      <Navbar changeTheme={props.changeTheme}></Navbar>
      <GraphCanvas></GraphCanvas>
    </div>
  );
};

export default Home;
