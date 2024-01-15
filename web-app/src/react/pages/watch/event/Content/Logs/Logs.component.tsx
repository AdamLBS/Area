import { useEventLogs } from '@/react/hooks/events';
import React, { memo } from 'react';
import { LogContainer } from './Logs.style';
import { columns } from './Table/Columns';
import { DataTable } from './Table/Table.component';
import { DateTime } from 'luxon';
import { DotsLoading } from '../Overview/Overview.style';

type LogProps = {
  eventUuid: string;
};

const LogComponent: React.FC<LogProps> = ({ eventUuid }) => {
  const { data: eventLogs, isLoading } = useEventLogs(eventUuid);
  // make me mock data for dataTable
  const eventData = eventLogs?.map((log) => {
    // Parse the created_at string into a Luxon DateTime object
    const parsedDate = DateTime.fromISO(log.created_at, {
      zone: 'Europe/Paris',
    });

    // Format the DateTime to the desired output
    const formattedDate = parsedDate.toFormat('MM-dd-yyyy');

    const formattedId = log.log_id.toString();

    return {
      eventUuid: log.event_uuid,
      uuid: log.uuid,
      id: formattedId,
      date: formattedDate, // Use the formatted date
      title: log.message,
      status: log.status,
    };
  });
  return (
    <LogContainer>
      {eventData && !isLoading && (
        <DataTable data={eventData} columns={columns} />
      )}
      {isLoading && <DotsLoading />}
    </LogContainer>
  );
};

export const Log = memo(LogComponent);
