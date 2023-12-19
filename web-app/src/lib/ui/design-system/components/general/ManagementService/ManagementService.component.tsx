import React, { memo, useCallback } from 'react';
import {
  CardContainer,
  Content,
  Header,
  IconContainer,
  Redirection,
  TitleContainer,
} from './ManagementService.style';
import { H3 } from '../Text';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PrimaryMutted } from '@/lib/ui/design-system/components/general/Text';

export type ManagementServiceProps = {
  title: string;
  Icon: LucideIcon;
  description: string;
};

const ManagementServiceComponent: React.FC<ManagementServiceProps> = ({
  title,
  Icon,
  description,
}) => {
  const router = useRouter();

  const handleRedirection = useCallback(() => {
    router.push(`/${title.toLowerCase()}`);
  }, [title]);
  return (
    <CardContainer onClick={handleRedirection}>
      <Header>
        <TitleContainer>
          <IconContainer>
            <Icon size={40} color="#FFFFFF" />
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
