import { useQuery } from 'react-query';
import api from '../configs/axios'

const getTrivia = ({ amount, type }) => api.get('/', { params: { amount, type } });

const useQuiz = (params) => useQuery(['getQuiz', params], () => getTrivia(params), {
  enabled: !!params,
  refetchOnWindowFocus: false
});

export { useQuiz }