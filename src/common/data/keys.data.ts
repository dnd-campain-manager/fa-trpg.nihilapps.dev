import { id } from 'date-fns/locale';

export const usersKeys = {
  getAll: [ 'getUsers', ],
  getById: (id: string) => [ 'getUserById', id, ],
};

export const campainsKeys = {
  getAll: [ 'getCampains', ],
  getById: (id: string) => [ 'getCampainById', id, ],
};
