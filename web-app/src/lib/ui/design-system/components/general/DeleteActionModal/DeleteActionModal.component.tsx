import React, { memo, useCallback } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
  Button,
  DialogClose,
  useToast,
} from '@/components/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEventAction } from '@/api/events';

export type DeleteEventModalProps = {
  eventUuid: string;
  index: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteActionModalComponent: React.FC<DeleteEventModalProps> = ({
  eventUuid,
  index,
  isOpen,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteEventActionMutation = useMutation({
    mutationFn: deleteEventAction,
    onSuccess: () => {
      toast({
        title: 'Event action deleted',
        description: 'The event action has been successfully deleted.',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
      onOpenChange(false);
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
    deleteEventActionMutation.mutate({ uuid: eventUuid, id: index });
  }, [deleteEventActionMutation, eventUuid]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this action</DialogTitle>
          <DialogDescription>
            Do you want to delete this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onDeleteEventAction}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteActionModal = memo(DeleteActionModalComponent);
