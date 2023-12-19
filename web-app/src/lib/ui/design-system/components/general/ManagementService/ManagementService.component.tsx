import React, { memo, useCallback } from 'react';
import {
  CardContainer,
  Content,
  Description,
  Header,
  IconContainer,
  Redirection,
  TitleContainer,
} from './ManagementService.style';
import { H3 } from '../Text';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type ManagementServiceProps = {
  componentName: string;
  Icon: React.FC<{ size: number; color: string }>;
  description: string;
};

const ManagementServiceComponent: React.FC<ManagementServiceProps> = ({
  componentName,
  Icon,
  description,
}) => {
  const router = useRouter();

  const handleRedirection = useCallback(
    (componentName: string) => {
      router.push(`/${componentName.toLowerCase()}`);
    },
    [router],
  );
  return (
    <CardContainer onClick={() => handleRedirection(componentName)}>
      <Header>
        <TitleContainer>
          <IconContainer>
            <Icon size={40} color="#FFFFFF" />
          </IconContainer>
          <H3>{componentName}</H3>
        </TitleContainer>
        <Redirection>
          <ChevronRight size={32} />
        </Redirection>
      </Header>
      <Content>
        <Description>{description}</Description>
      </Content>
    </CardContainer>
  );
};

export const ManagementService = memo(ManagementServiceComponent);
