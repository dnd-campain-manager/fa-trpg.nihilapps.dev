export const usersKeys = {
  getAll: [ 'getUsers', ],
  getById: (id: string) => [ 'getUserById', id, ],
};

export const campainsKeys = {
  getAll: [ 'getCampains', ],
  getById: (id: string) => [ 'getCampainById', id, ],
  getByName: (name: string) => [ 'getCampainById', name, ],
};

export const sessionsKeys = {
  getAll: [ 'getSessions', ],
  getById: (id: string) => [ 'getSessionById', id, ],
  getByName: (name: string) => [ 'getSessionById', name, ],
};
