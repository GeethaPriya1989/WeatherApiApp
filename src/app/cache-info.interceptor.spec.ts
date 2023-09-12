import { TestBed } from '@angular/core/testing';

import { CacheInfoInterceptor } from './cache-info.interceptor';

describe('CacheInfoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheInfoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CacheInfoInterceptor = TestBed.inject(CacheInfoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
