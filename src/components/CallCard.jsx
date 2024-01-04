import React, { useState } from 'react';
import { async } from 'regenerator-runtime';
import { HiPhoneMissedCall } from "react-icons/hi";
import { MdVoicemail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowRoundBack } from "react-icons/io";

import { useArchiveCall } from '../features/feed/hooks/useArchiveCall';
import '../css/CallCard.css';
import { useCallLogs } from '../features/feed/hooks/useCallLogs';

const CallTypeIcons = {
  missed: <HiPhoneMissedCall />,
  answered: <IoMdCall />,
  voicemail: <MdVoicemail />,
};


function CallCard({ detail }) {

  const [showDetail, setShowDetail] = useState(false);
  const { fetchCallLogs } = useCallLogs();

  const { call_type } = detail;
  const callTypeIcon = CallTypeIcons[call_type];

  const createdAt = new Date(detail.created_at);
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const { archiveCall } = useArchiveCall();

  let payload = {
    id: detail.id,
    data: {
      is_archived: !detail.is_archived
    }
  }
  /**
   * used to archive the calls individually.
   */
  const handleArchive = async () => {
    setShowDetail(!showDetail);
    await archiveCall(payload);
    fetchCallLogs();
  }

  const toggleCallDetails = () => {
    setShowDetail(!showDetail);
  }

  function ActivityDetail() {
    return (
      <div className='activitydetail-container'>
        <div className='activitydetail-button' onClick={toggleCallDetails}><IoIosArrowRoundBack /> back</div>
        <div className='activitydetail-profile'>
          <CgProfile size={70} />
          <h4>+ {detail.from}</h4>
        </div>
        <div className='activitydetail-metadetails'>
          <p>{formattedDate}</p>
          {detail.direction === "outbound" ? <p>Outgoing: {detail.duration}s </p> : ""}
          {detail.direction === "inbound" ? <p>Incoming: {detail.duration}s </p> : ""}
          <div className='activitydetail-actionbtn'>
            <button onClick={handleArchive}>Archive</button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      {showDetail ? <ActivityDetail /> : <div onClick={toggleCallDetails} className='call-card__container'>
        <h3>{formattedDate}</h3>
        <div className='call-card__container__detail'>
          {callTypeIcon}
          <div className='call-details'>
            <h4>+{detail.from}</h4>
            <p>tried to call on +{detail.to}</p>
          </div>
          <p className='call-details__time'>{formattedTime}</p>
          {/* <div onClick={handleArchive}>ARCHIVE ME</div> */}
        </div>
      </div>}
    </div>

  );
}

export default CallCard;