'use client';
import {
  Button,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import {
  CustomSelect,
  H3,
  PrimaryMutted,
  PrivateLayout,
} from '@/lib/ui/design-system';

import React, { memo } from 'react';
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

const frameworks = ['React', 'Vue', 'Angular', 'Svelte'];

const events = ['test1', 'test2'];

const Bridge: React.FC = () => {
  const [triggerApi, setTriggerApi] = React.useState('');
  const [triggerAction, setTriggerAction] = React.useState('');
  const [responseApi, setResponseApi] = React.useState('');
  const [responseAction, setResponseAction] = React.useState('');

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
                <Button>Save</Button>
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
                      values={frameworks}
                      onChange={setTriggerApi}
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
                      values={frameworks}
                      onChange={setTriggerAction}
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
                      values={frameworks}
                      onChange={setResponseApi}
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
                      values={frameworks}
                      onChange={setResponseAction}
                    />
                  </ConfigPart>
                </ConfigPanel>
              </ConfigContent>
            </RightPanelContent>
          </RightPanel>
        </PageContent>
      </PageContainer>
    </PrivateLayout>
  );
};

export const BridgePage = memo(Bridge);
