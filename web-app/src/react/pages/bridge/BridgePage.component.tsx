'use client';
import { getMe } from '@/api/user';
import {
  Button,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Toaster,
  toast,
} from '@/components/ui';
import { PrivateLayout } from '@/lib/ui/design-system';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import React, { memo, useEffect, useState } from 'react';
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

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

// CREATE A COMPONENT TAKING IN PARAMS A LIST OF OBJECT LIKE "frameworks" AND USE IT
// GET TRIGGER AND RESPONSE API FROM THE DATABASE
export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Select framework...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const Bridge: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { mutate: fetchUser } = useMutation({
    mutationFn: getMe,
    onSuccess: (data: User) => {
      setUserData(data);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
              {/* map of all user events */}
              <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>
                test
              </Button>
            </LeftPanelContent>
            <CardFooter>
              <LeftPanelButton>Add a new event</LeftPanelButton>
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
                      <CardTitle>Trigger API</CardTitle>
                      <CardDescription>
                        Trigger API starting the event
                      </CardDescription>
                    </ConfigPanelHeader>
                    <ComboboxDemo />
                  </ConfigPart>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <CardTitle>Trigger Action</CardTitle>
                      <CardDescription>
                        Trigger Interaction of the trigger API that is checked
                        to start the event
                      </CardDescription>
                    </ConfigPanelHeader>
                    <ComboboxDemo />
                  </ConfigPart>
                </ConfigPanel>
                <ConfigPanel>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <CardTitle>Response API</CardTitle>
                      <CardDescription>
                        Response API that is the result of your event
                      </CardDescription>
                    </ConfigPanelHeader>
                    <ComboboxDemo />
                  </ConfigPart>
                  <ConfigPart>
                    <ConfigPanelHeader>
                      <CardTitle>Response Interaction</CardTitle>
                      <CardDescription>
                        Response Interaction of the response API that is done
                        when the first interaction is triggered
                      </CardDescription>
                    </ConfigPanelHeader>
                    <ComboboxDemo />
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
