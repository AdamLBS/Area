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
} from '@/components/ui';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  name: z.string().min(3).optional(),
  title: z.string().email().optional(),
  description: z.string().min(8).optional(),
});

const SettingsModal = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      title: undefined,
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

  const checkPassword = useCallback(
    (values: FormValues) => {
      console.log(values);
      updateMutation.mutate(values);
    },
    [updateMutation],
  );

  const onSubmit = useCallback((values: FormValues) => {
    checkPassword(values);
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Event settings</DialogTitle>
        <DialogDescription>Settings of your Bridge event</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <FormContainer>
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event title</FormLabel>
                <FormControl>
                  <Input placeholder="Your event title" {...field} />
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
          <Button
            type="button"
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
          >
            Update
          </Button>
          <DialogTrigger>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogTrigger>
        </ButtonContainer>
      </DialogFooter>
    </DialogContent>
  );
};

export const EventSettingsModal = memo(SettingsModal);
