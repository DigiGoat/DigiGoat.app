import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const setupPayloadGuard: CanMatchFn = () => {
  const router = inject(Router);

  // During matching, grab the query param from the navigation URL
  const payload =
    router.getCurrentNavigation()?.extractedUrl.queryParamMap.get('payload');

  if (payload && payload.startsWith('eyJyZXBvIjoi')) { //All encodings will start with this since it is base64 for {"repo":"
    return true;
  }
  return false;
};
