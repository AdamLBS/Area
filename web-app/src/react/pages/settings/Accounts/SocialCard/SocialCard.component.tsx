'use client';
import React, { memo, useCallback } from 'react';
import {
  SocialCardContainer,
  TitleContainer,
  ConnectContainer,
  Connected,
} from './SocialCard.style';
import { BadgeCheck } from 'lucide-react';
import { PrimaryMutted } from '@/lib/ui/design-system';
import { signIn } from 'next-auth/react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { deleteOAuth } from '@/api/oauth';

type CardsProps = {
  serviceName: string;
  connected: boolean;
  icon: React.ReactNode;
  provider: string;
};

const Cards: React.FC<CardsProps> = ({
  serviceName,
  connected,
  icon,
  provider,
}) => {
  const deleteAccountMutation = useMutation({
    mutationFn: deleteOAuth,
    onSuccess: () => {
      window.location.reload();
    },
  });
  const [open, setOpen] = React.useState(false);
  const onCardClick = useCallback(() => {
    if (connected) {
      setOpen(true);
    } else {
      signIn(provider);
    }
  }, [provider, connected, setOpen]);

  const onDeleteAccount = useCallback(() => {
    deleteAccountMutation.mutate(provider);
    setOpen(false);
  }, [provider, setOpen]);

  return (
    <>
      <SocialCardContainer variant="outline" onClick={onCardClick}>
        <TitleContainer>
          {icon}
          {serviceName}
        </TitleContainer>
        {connected ? (
          <ConnectContainer>
            <BadgeCheck size={16} color="#6D28D9" />
            <Connected>Connected </Connected>
          </ConnectContainer>
        ) : (
          <PrimaryMutted>Not linked</PrimaryMutted>
        )}
      </SocialCardContainer>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlink your account</DialogTitle>
            <DialogDescription>
              Do you want to unlink your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onDeleteAccount}>Save changes</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const SocialCard = memo(Cards);
