import React, { ReactNode, memo, useCallback } from 'react';
import {
  CardContainer,
  Content,
  Header,
  IconContainer,
  Redirection,
  TitleContainer,
} from './ServiceCard.style';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PrimaryMutted, H3 } from '@/lib/ui/design-system';

export type ManagementServiceProps = {
  title: string;
  icon: ReactNode;
  description: string;
};

const ManagementServiceComponent: React.FC<ManagementServiceProps> = ({
  title,
  icon,
  description,
}) => {
  const router = useRouter();

  const handleRedirection = useCallback(() => {
    router.push(`/${title.toLowerCase()}`);
  }, [title]);
  return (
    <CardContainer variant={'outline'} onClick={handleRedirection}>
      <Header>
        <TitleContainer>
          <IconContainer>
            {React.cloneElement(icon as React.ReactElement, {
              size: 40,
              color: '#fff',
            })}
          </IconContainer>
          <H3>{title}</H3>
        </TitleContainer>
        <Redirection>
          <ChevronRight size={32} />
        </Redirection>
      </Header>
      <Content>
        <PrimaryMutted>{description}</PrimaryMutted>
      </Content>
    </CardContainer>
  );
};

export const ServiceCard = memo(ManagementServiceComponent);
