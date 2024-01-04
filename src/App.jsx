import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Dialer from './components/Dialer.jsx';
import ActivityFeed from './features/feed/components/ActivityFeed.jsx';
import ArchivedFeed from './features/feed/components/ArchivedFeed.jsx';
import Header from './Header.jsx';

const App = () => {

  const [currentView, setCurrentView] = useState('all');

  /**
   * Used to change the view to Either all calls or archived calls.
   *
   */
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className='container'>
      <Header />
      <div className='container--header'>
        <div
          className={`container-view ${currentView === 'all' ? 'active' : ''}`}
          onClick={() => handleViewChange('all')}
        >
          All Calls
        </div>
        <div
          className={`container-view ${currentView === 'archived' ? 'active' : ''}`}
          onClick={() => handleViewChange('archived')}
        >
          Archived
        </div>
      </div>
      {currentView === 'all' ? <div> <ActivityFeed /> <Dialer /> </div> : <ArchivedFeed />}
      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
