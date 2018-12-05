import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPage from '../reducers/page.reducer';

import { Page } from '../../model/page.model';
import { PageState, CmsState } from '../cms-state';

export const getPageState: MemoizedSelector<any, PageState> = createSelector(
  fromFeature.getCmsState,
  (state: CmsState) => state.page
);

export const getPageEntities: MemoizedSelector<
  any,
  { [context: string]: Page }
> = createSelector(
  getPageState,
  fromPage.getPageEntities
);

export const getLatestPageKey: MemoizedSelector<any, string> = createSelector(
  getPageState,
  fromPage.getLatestPageKey
);

export const getLatestPage: MemoizedSelector<any, Page> = createSelector(
  getPageEntities,
  getLatestPageKey,
  (entities, key): Page => {
    return entities[key];
  }
);

export const currentSlotSelectorFactory = (
  position
): MemoizedSelector<any, any> => {
  return createSelector(
    getLatestPage,
    entity => {
      if (entity) {
        return entity.slots[position];
      }
    }
  );
};