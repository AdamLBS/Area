import { useMemo } from 'react';
import { useServices } from '@/react/hooks/oauth';

export const getConnectedServices = (responses?: string[]) => {
  const { data: services } = useServices();

  const connectedServices = useMemo(() => {
    const result: boolean[] = [];
    responses?.forEach((response) => {
      result.push(
        services?.find((service) => service.provider === response.toLowerCase())
          ? false
          : true,
      );
    });
    return result;
  }, [responses, services]);

  return connectedServices;
};
