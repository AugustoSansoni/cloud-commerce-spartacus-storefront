import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule, combineReducers, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import * as fromStore from '../../store';

// todo: fix below import after auth store is moved to the core
// import * as fromAuthStore from '../../../../../storefrontlib/src/lib/auth/store';

// below mock must be removed after auth store is moved
const LOAD_USER_TOKEN = '[Auth] Load User Token';

export class LoadUserToken implements Action {
  readonly type = LOAD_USER_TOKEN;
  constructor(public payload: { userId: string; password: string }) {}
}

// fix end

import { UserRegisterEffects } from './user-register.effect';
import { OccUserService } from '../../occ';
import { UserRegisterFormData } from '../../model/user.model';

class MockUserService {
  registerUser(_user: UserRegisterFormData): Observable<any> {
    return;
  }
}

const user: UserRegisterFormData = {
  firstName: '',
  lastName: '',
  password: '',
  titleCode: '',
  uid: ''
};

describe('UserRegister effect', () => {
  let effect: UserRegisterEffects;
  let actions$: Observable<any>;
  let userService: OccUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers())
        })
      ],
      providers: [
        UserRegisterEffects,
        { provide: OccUserService, useClass: MockUserService },
        provideMockActions(() => actions$)
      ]
    });

    effect = TestBed.get(UserRegisterEffects);
    userService = TestBed.get(OccUserService);

    spyOn(userService, 'registerUser').and.returnValue(of({}));
  });

  describe('registerUser$', () => {
    it('should register user', () => {
      const action = new fromStore.RegisterUser(user);
      const loadUser = new LoadUserToken({
        userId: '',
        password: ''
      });
      const completion = new fromStore.RegisterUserSuccess();

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: loadUser,
        c: completion
      });

      expect(effect.registerUser$).toBeObservable(expected);
    });
  });
});
