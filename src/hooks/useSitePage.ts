import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface SitePage {
  slug: string;
  content: string;
}

export const getSitePage = (slug: string) =>
  axios.get<SitePage>(`/site-pages/${slug}`).then(res => res.data);

export const updateSitePage = (slug: string, content: string) =>
  axios.put<SitePage>(`/site-pages/${slug}`, { content }).then(res => res.data);

export const useSitePage = (slug: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['site-page', slug],
    queryFn: () => getSitePage(slug),
  });

  const mutation = useMutation({
    mutationFn: (content: string) => updateSitePage(slug, content),
    onError: () => toast.error('Nu s-a putut salva conținutul paginii.'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['site-page', slug] });
      toast.success('Conținutul a fost salvat cu succes.');
    },
  });

  return {
    ...query,
    saveContent: mutation.mutateAsync,
    isSaving: mutation.isPending,
  };
};
