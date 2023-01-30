import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import uuid from 'react-native-uuid';

export function useAppQuery<T>(
  fn: () => Promise<T> | T,
  options?: { initialData?: T; refetchInterval?: number | false }
) {
  const id = useState(uuid.v4());
  return useQuery([id], fn, {
    refetchInterval: false,
    ...options,
  });
}
