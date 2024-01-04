import React from 'react';
import { IoArchiveOutline } from "react-icons/io5";

import CallCard from '../../../components/CallCard.jsx';
import Loading from '../../../components/Loading.jsx';
import { useArchiveCall } from '../hooks/useArchiveCall.js';
import { useCallLogs } from '../hooks/useCallLogs';


function ArchivedFeed() {

  const { callLogs, loading, error, fetchCallLogs } = useCallLogs();
  const archivedCallLogs = callLogs.filter(item => item.is_archived === true);
  const { archiveCall } = useArchiveCall();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: </p>;
  }

  /**
   * Async function, used to unarchive all the calls.
   */
  const handleUnArchiveAllCalls = async () => {
    try {
      // Create an array of promises for each archiveCall
      const archivePromises = archivedCallLogs.map(item => {
        const payload = {
          id: item.id,
          data: {
            is_archived: !item.is_archived
          }
        };
        return archiveCall(payload);
      });

      // Wait for all promises to resolve
      await Promise.all(archivePromises);

      // After all calls are unarchived, re-fetch the call logs
      fetchCallLogs();
    } catch (error) {
      console.error('Error unarchiving calls:', error);
    }
  }

  return ( 
    <div>
      <div className="activityfeed-container__button">
        <button onClick={handleUnArchiveAllCalls}><IoArchiveOutline /> Unarchive all calls</button>
      </div>
      {archivedCallLogs && archivedCallLogs.map((detail, index) => {
        return (<div key={index}>
          <CallCard detail={detail} />
        </div>)
      })}
    </div>
   );
}

export default ArchivedFeed;