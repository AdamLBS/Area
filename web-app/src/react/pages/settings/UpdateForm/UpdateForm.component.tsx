'use client';
import React, { memo, useCallback } from 'react';
import { FormContainer, ButtonContainer } from './UpdateForm.style';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  Input,
  Button,
} from '@/components/ui';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateCredentials } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().min(8).optional(),
  newPassword: z.string().min(8).optional(),
  confirmNewPassword: z.string().min(8).optional(),
});

const UpdateFormComponent = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: undefined,
      email: undefined,
      currentPassword: undefined,
      newPassword: undefined,
      confirmNewPassword: undefined,
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCredentials,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Your credentials have been updated.',
      });
      form.setValue('username', undefined);
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

  const checkPassword = useCallback(
    (values: FormValues) => {
      const { currentPassword, newPassword, confirmNewPassword } = values;

      if (
        (currentPassword && !newPassword && !confirmNewPassword) ||
        ((newPassword || confirmNewPassword) &&
          (!currentPassword || newPassword !== confirmNewPassword))
      ) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Password mismatch or missing current password.',
        });
      } else {
        updateMutation.mutate(values);
      }

      return {};
    },
    [updateMutation],
  );

  const onSubmit = useCallback((values: FormValues) => {
    checkPassword(values);
  }, []);

  return (
    <Form {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="current username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="current email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password confirmation</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonContainer>
          <Button type="submit" variant="default">
            Apply
          </Button>
        </ButtonContainer>
      </FormContainer>
      <Toaster />
    </Form>
  );
};

export const UpdateForm = memo(UpdateFormComponent);
