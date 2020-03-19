import React from 'react';
import CoursesTable from './components/CoursesTable';
import Header from './components/Header';

function App(props) {

  return (
    <div className="App">
      <Header />
      <CoursesTable /> 
    </div>
  );
}

export default App;
