import React from 'react';

import Header from './components/Interview/Header';
import Card from './components/UI/Card';
import InterviewList from './components/Interview/InterviewList';
import AddInterview from './components/Interview/AddInterview';

function Home() {
  return (
    <div>
        <Card>
            <Header></Header>
            <AddInterview></AddInterview>
        </Card>
          <InterviewList></InterviewList>
    </div>
  );
}

export default Home;