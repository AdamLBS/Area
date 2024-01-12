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
import { useMutation } from '@tanstack/react-query';
import { deleteEvent } from '@/api/events';
import { useRouter } from 'next/navigation';

export type DeleteEventModalProps = {
  eventUuid: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteEventModalComponent: React.FC<DeleteEventModalProps> = ({
  eventUuid,
  isOpen,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast({
        title: 'Event deleted',
        description: 'The event has been successfully deleted.',
        variant: 'default',
      });
      router.push('/bridge');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the event.',
        variant: 'destructive',
      });
    },
  });

  const onDeleteEvent = useCallback(() => {
    deleteEventMutation.mutate(eventUuid);
  }, [deleteEventMutation, eventUuid]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this bridge</DialogTitle>
          <DialogDescription>
            Do you want to delete this bridge?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onDeleteEvent}>
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

export const DeleteEventModal = memo(DeleteEventModalComponent);
