'use client';
import {
  Button,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Toaster,
  useToast,
} from '@/components/ui';
import {
  CustomSelect,
  EventActivation,
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
  FieldContainer,
  PageContainer,
  PageContent,
  RightPanel,
  RightPanelContent,
  TopBarConfig,
  InputField,
} from './BridgePage.style';
import { useResponses, useTriggers } from '@/react/hooks/events';
import { useMutation } from '@tanstack/react-query';
import { createEvent } from '@/api/events';
import { EventCreate } from '@/api/constants';
import { MenuEvent } from '@/lib/ui/design-system';

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
  const [triggersFields, settriggersFields] = useState<Record<string, string>>(
    {},
  );
  const [responsesFields, setresponsesFields] = useState<
    Record<string, string>
  >({});

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
        fields: triggersFields,
      },
      responseInteraction: {
        id:
          responses?.find(
            (response) => response.name === selectedResponseInteraction,
          )?.id || '',
        fields: responsesFields,
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

  const onChangeResponseField = useCallback(
    (value: string, key: string) => {
      setresponsesFields({
        ...responsesFields,
        [key]: value,
      });
    },
    [responsesFields, setresponsesFields],
  );

  const onChangeTriggerField = useCallback(
    (value: string, key: string) => {
      settriggersFields({
        ...triggersFields,
        [key]: value,
      });
    },
    [triggersFields, settriggersFields],
  );

  return (
    <PrivateLayout pageName="Bridge">
      <PageContainer>
        <PageContent>
          <MenuEvent />
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
                  {Object.entries(
                    triggers?.find(
                      (trigger) => trigger.name === selectedTriggerInteraction,
                    )?.fields || {},
                  ).map(([key, value]) => (
                    <FieldContainer key={key}>
                      <Label>Email</Label>
                      <InputField
                        id={value}
                        placeholder={value}
                        onChange={(e) =>
                          onChangeTriggerField(e.target.value, key)
                        }
                      />
                    </FieldContainer>
                  ))}
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
                  <ConfigPart>
                    {Object.entries(
                      responses?.find(
                        (trigger) =>
                          trigger.name === selectedResponseInteraction,
                      )?.fields || {},
                    ).map(([key, value]) => (
                      <FieldContainer key={key}>
                        <Label>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <InputField
                          id={value}
                          placeholder={value}
                          onChange={(e) =>
                            onChangeResponseField(e.target.value, key)
                          }
                        />
                      </FieldContainer>
                    ))}
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
