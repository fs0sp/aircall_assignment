import React from 'react';
import { IoArchiveOutline } from "react-icons/io5";

import CallCard from '../../../components/CallCard.jsx';
import Loading from '../../../components/Loading.jsx';
import { useArchiveCall } from '../hooks/useArchiveCall.js';
import { useCallLogs } from '../hooks/useCallLogs.js';



function ActivityFeed() {

  const { callLogs, loading, error } = useCallLogs();
  const { archiveCall } = useArchiveCall();


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error</p>;
  }

  /**
   * Async function, Used to archive all the calls.
   */
  const handleArchiveAllCalls = async () => {
    try {
      for (const item of callLogs) {
        const payload = {
          id: item.id,
          data: {
            is_archived: true
          }
        };

        // Await each archiveCall before moving to the next iteration
        await archiveCall(payload);
      }

      // After all calls are archived, re-fetch the call logs
      // fetchCallLogs();
    } catch (error) {
      console.error('Error archiving calls:', error);
    }
  }

  return (
    <div className='activityfeed-container'>
      <div className="activityfeed-container__button">
        <button onClick={handleArchiveAllCalls}><IoArchiveOutline /> Archive all calls</button>
      </div>
      {callLogs && callLogs.map((detail, index) => {
        return (<div key={index}>
          <CallCard detail={detail} />
        </div>)
      })}
    </div>
  );
}

export default ActivityFeed;