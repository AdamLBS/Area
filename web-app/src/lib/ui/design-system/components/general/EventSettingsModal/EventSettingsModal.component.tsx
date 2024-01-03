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
} from '@/components/ui';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  name: z.string().min(3).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

type SettingsProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const SettingsModal = ({ isOpen, setOpen }: SettingsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
    },
  });

  const updateMutation = useMutation({
    // mutationFn: updateCredentials,
    // onSuccess: () => {
    //   toast({
    //     variant: 'default',
    //     title: 'Success!',
    //     description: 'Your credentials have been updated.',
    //   });
    // },
    // onError: (error) => {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Uh oh! Something went wrong.',
    //     description: error.message,
    //   });
    // },
  });

  type FormValues = z.infer<typeof formSchema>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = useCallback((values: FormValues) => {
    // TODO: update event
    updateMutation.mutate();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event settings</DialogTitle>
          <DialogDescription>Settings of your Bridge event</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
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
          <Toaster />
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
