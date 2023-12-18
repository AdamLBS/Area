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
import { logIn } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

const UpdateFormComponent = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const updateMutation = useMutation({
    mutationFn: logIn, //change this function
    onSuccess: () => {
      // router.push('/dashboard');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please retry.',
      });
    },
  });

  type FormValues = z.infer<typeof formSchema>;

  const checkPassword = useCallback((values: FormValues) => {
    if (
      values.newPassword.length > 0 &&
      values.newPassword !== values.confirmPassword
    ) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Password mismatch.',
      });
    } else {
      updateMutation.mutate(values);
    }
    return {};
  }, []);

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
          name="password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password confirmation</FormLabel>
              <FormControl>
                <Input placeholder="confirm your new password" {...field} />
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
