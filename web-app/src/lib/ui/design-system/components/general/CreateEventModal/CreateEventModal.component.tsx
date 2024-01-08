import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/components/ui';
import { PlusIcon } from 'lucide-react';
import React, { memo, useState } from 'react';
import {
  DialogContainer,
  EventPanelButton,
  Header,
  LabelContent,
  Modal,
  Page,
} from './CreateEventModal.style';

const title = [
  'Let’s start to create a new event (* required)',
  'Add your trigger event',
  'Add your response event',
];

const CreateEventModal: React.FC = () => {
  const [state, setState] = useState<number>(1);
  const [eventName, setEventName] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');

  const addState = () => {
    if (state === 3) {
      return;
    }
    if (state === 1 && eventName === '') {
      return;
    }
    setState((prevState) => prevState + 1);
  };

  const removeState = () => {
    if (state === 1) {
      return;
    }
    setState((prevState) => prevState - 1);
  };

  return (
    <DialogContainer>
      <DialogTrigger asChild>
        <EventPanelButton>
          <PlusIcon size={16} />
          Add a new event
        </EventPanelButton>
      </DialogTrigger>
      <Modal>
        <Header>
          <DialogTitle>Create a new event</DialogTitle>
          <DialogDescription>{title[state - 1]}</DialogDescription>
        </Header>
        {state === 1 && (
          <Page>
            <LabelContent>
              <Label>Event name*</Label>
              <Input
                id="event-name"
                placeholder="Event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </LabelContent>
            <LabelContent>
              <Label>Event description</Label>
              <Input
                placeholder="Event description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </LabelContent>
          </Page>
        )}
        <DialogFooter>
          <Button onClick={addState}>Continue</Button>
          <Button onClick={removeState} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </Modal>
    </DialogContainer>
  );
};

export const EventModal = memo(CreateEventModal);
