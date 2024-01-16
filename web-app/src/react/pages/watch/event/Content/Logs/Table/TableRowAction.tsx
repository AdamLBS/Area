'use client';
import React, { useCallback } from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteEventLog } from '@/api/events';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

type DataTableRowActionsProps = {
  uuid: string;
  eventUuid: string;
};

export const DataTableRowActions: React.FC<DataTableRowActionsProps> = ({
  uuid,
  eventUuid,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteEventActionMutation = useMutation({
    mutationFn: deleteEventLog,
    onSuccess: () => {
      toast({
        title: 'Event action deleted',
        description: 'The event action has been successfully deleted.',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the event action.',
        variant: 'destructive',
      });
    },
  });

  const onDeleteEventAction = useCallback(() => {
    deleteEventActionMutation.mutate({ uuid: eventUuid, logUuid: uuid });
  }, [deleteEventActionMutation, eventUuid]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onDeleteEventAction()}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
