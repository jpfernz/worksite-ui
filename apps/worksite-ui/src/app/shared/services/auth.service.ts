import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const username = 'user';
  const password = 'password';
  const auth = btoa(`${username}:${password}`);

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Basic ${auth}`),
  });

  return next(authReq);
};
