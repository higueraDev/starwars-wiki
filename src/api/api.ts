import { environment } from 'src/environments/environment';

const baseUrl = environment.apiURL;

export const apiUrl = (id: string = '') => ({
  filmsUrl: baseUrl + '/films' + (id ? `/${id}` : ''),
  peopleUrl: baseUrl + '/people' + (id ? `/${id}` : ''),
});
