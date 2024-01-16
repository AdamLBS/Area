'use client';
import React, { memo, useCallback } from 'react';
import { FormContainer, ButtonContainer } from './EventSettingsModal.style';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Input,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Dialog,
  useToast,
} from '@/components/ui';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEventSettings } from '@/api/events';

const formSchema = z.object({
  name: z.string().min(3).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

type SettingsProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  name?: string;
  description?: string;
  eventUuid: string;
};

const SettingsModal = ({
  isOpen,
  setOpen,
  name,
  description,
  eventUuid,
}: SettingsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateEventSettings,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Your bridge has been updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['event'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = useCallback((values: FormValues) => {
    updateMutation.mutate({
      uuid: eventUuid,
      name: values.name,
      description: values.description,
    });
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bridge settings</DialogTitle>
          <DialogDescription>Settings of your bridge</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              defaultValue={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Send Discord message when I’m listenning a music on Spotify "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              defaultValue={description}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event description</FormLabel>
                  <FormControl>
                    <Input placeholder="Your event description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormContainer>
        </Form>
        <DialogFooter>
          <ButtonContainer>
            <Button variant="default" onClick={form.handleSubmit(onSubmit)}>
              Update
            </Button>
            <DialogTrigger>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
          </ButtonContainer>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const EventSettingsModal = memo(SettingsModal);
