import { useQuery } from 'react-query';
import api from '../configs/axios'

const getTrivia = ({ amount, type }) => api.get('/', { params: { amount, type } });

const useQuiz = (params) => {
  return useQuery(['getQuiz', params], () => getTrivia(params), {
    enabled: !!params
  })
};

export { useQuiz }