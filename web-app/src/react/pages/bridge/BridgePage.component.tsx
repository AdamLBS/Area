'use client';
import {
  Button,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Toaster,
  useToast,
} from '@/components/ui';
import {
  CustomSelect,
  H3,
  PrimaryMutted,
  PrivateLayout,
} from '@/lib/ui/design-system';

import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  ConfigContent,
  ConfigPanel,
  ConfigPanelHeader,
  ConfigPart,
  LeftPanel,
  LeftPanelButton,
  LeftPanelContent,
  PageContainer,
  PageContent,
  RightPanel,
  RightPanelContent,
  TopBarConfig,
} from './BridgePage.style';
import { PlusIcon } from 'lucide-react';
import { useResponses, useTriggers } from '@/react/hooks/events';
import { useMutation } from '@tanstack/react-query';
import { createEvent } from '@/api/events';
import { EventCreate } from '@/api/constants';

const events = ['test1', 'test2'];

const Bridge: React.FC = () => {
  const { data: triggers } = useTriggers();
  const { data: responses } = useResponses();
  const { toast } = useToast();
  const [selectedTriggerApi, setSelectedTriggerApi] = useState<string>('');
  const [selectedTriggerInteraction, setSelectedTriggerInteraction] =
    useState<string>('');
  const [selectedResponseApi, setSelectedResponseApi] = useState<string>('');
  const [selectedResponseInteraction, setSelectedResponseInteraction] =
    useState<string>('');

  const triggersApi = useMemo(() => {
    return triggers?.map((trigger) => trigger.provider);
  }, [triggers]);

  const responsesApi = useMemo(() => {
    return responses?.map((response) => response.provider);
  }, [responses]);

  const [triggersInteractions, settriggersInteractions] = useState<string[]>(
    [],
  );
  const [responsesInteractions, setresponsesInteractions] = useState<string[]>(
    [],
  );

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast({
        title: 'Event successfully created',
        description: 'Your event has been created',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });

  const onChangeTriggerApi = useCallback(
    (value: string) => {
      setSelectedTriggerApi(value);
      settriggersInteractions(
        triggers
          ?.filter((trigger) => trigger.provider === value)
          .map((trigger) => trigger.name) || [],
      );
    },
    [triggers, settriggersInteractions, setSelectedTriggerApi],
  );

  const onChangeResponseApi = useCallback(
    (value: string) => {
      setSelectedResponseApi(value);
      setresponsesInteractions(
        responses
          ?.filter((response) => response.provider === value)
          .map((response) => response.name) || [],
      );
    },
    [responses, setresponsesInteractions, setSelectedResponseApi],
  );

  const handleSave = useCallback(() => {
    const event: EventCreate = {
      trigger_provider: selectedTriggerApi.toLowerCase(),
      response_provider: selectedResponseApi.toLowerCase(),
      triggerInteraction: {
        id:
          triggers?.find(
            (trigger) => trigger.name === selectedTriggerInteraction,
          )?.id || '',
        fields: {},
      },
      responseInteraction: {
        id:
          responses?.find(
            (response) => response.name === selectedResponseInteraction,
          )?.id || '',
        fields: {
          email: 'adam.elaoumari@gmail.com',
        },
      },
    };
    createEventMutation.mutate(event);
  }, [
    selectedTriggerApi,
    selectedTriggerInteraction,
    selectedResponseApi,
    selectedResponseInteraction,
    createEventMutation,
    triggers,
    responses,
  ]);

  return (
    <PrivateLayout pageName="Bridge">
      <PageContainer>
        <PageContent>
          <LeftPanel>
            <CardHeader>
              <CardTitle>Your events</CardTitle>
              <CardDescription>
                All of your events you have already created
              </CardDescription>
            </CardHeader>
            <LeftPanelContent>
              {events.map((event, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  style={{ justifyContent: 'flex-start' }}
                >
                  {event}
                </Button>
              ))}
            </LeftPanelContent>
            <CardFooter>
              <LeftPanelButton>
                <PlusIcon size={16} />
                Add a new event
              </LeftPanelButton>
            </CardFooter>
          </LeftPanel>
          <RightPanel>
            <CardHeader>
              <CardTitle>Your event title</CardTitle>
              <CardDescription>Your event description</CardDescription>
            </CardHeader>
            <RightPanelContent>
              <TopBarConfig>
                <Button onClick={handleSave}>Save</Button>
              </TopBarConfig>
              <ConfigContent>
                <ConfigPanel>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <H3>Trigger API</H3>
                      <PrimaryMutted>
                        Trigger API starting the event
                      </PrimaryMutted>
                    </ConfigPanelHeader>
                    <CustomSelect
                      value="Choose your api"
                      values={triggersApi}
                      onChange={onChangeTriggerApi}
                    />
                  </ConfigPart>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <H3>Trigger Action</H3>
                      <PrimaryMutted>
                        Trigger Interaction of the trigger API that is checked
                        to start the event
                      </PrimaryMutted>
                    </ConfigPanelHeader>
                    <CustomSelect
                      value="Choose your interaction"
                      values={triggersInteractions}
                      onChange={setSelectedTriggerInteraction}
                    />
                  </ConfigPart>
                </ConfigPanel>
                <ConfigPanel>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <H3>Response API</H3>
                      <PrimaryMutted>
                        Response API that is the result of your event
                      </PrimaryMutted>
                    </ConfigPanelHeader>
                    <CustomSelect
                      value="Choose your api"
                      values={responsesApi}
                      onChange={onChangeResponseApi}
                    />
                  </ConfigPart>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <H3>Response Interaction</H3>
                      <PrimaryMutted>
                        Response Interaction of the response API that is done
                        when the first interaction is triggered
                      </PrimaryMutted>
                    </ConfigPanelHeader>
                    <CustomSelect
                      value="Choose your interaction"
                      values={responsesInteractions}
                      onChange={setSelectedResponseInteraction}
                    />
                  </ConfigPart>
                </ConfigPanel>
              </ConfigContent>
            </RightPanelContent>
          </RightPanel>
        </PageContent>
      </PageContainer>
      <Toaster />
    </PrivateLayout>
  );
};

export const BridgePage = memo(Bridge);
