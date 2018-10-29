import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  StateWithSiteContext,
  LanguagesState,
  LanguagesEntities,
  SiteContextState
} from '../state';

import { getSiteContextState } from './site-context.selector';

const activeLanguageSelector = (state: LanguagesState) => state.activeLanguage;
const languagesEntitiesSelector = (state: LanguagesState) => state.entities;
const languagesLoadAttemptedSelector = (state: LanguagesState) =>
  state.loadAttempted;
const languagesLoadingSelector = (state: LanguagesState) => state.loading;

export const getLanguagesState: MemoizedSelector<
  StateWithSiteContext,
  LanguagesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.languages
);

export const getLanguagesEntities: MemoizedSelector<
  StateWithSiteContext,
  LanguagesEntities
> = createSelector(getLanguagesState, languagesEntitiesSelector);

export const getActiveLanguage: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(getLanguagesState, activeLanguageSelector);

export const getAllLanguages: MemoizedSelector<
  StateWithSiteContext,
  any
> = createSelector(getLanguagesEntities, entities => {
  return Object.keys(entities).map(isocode => entities[isocode]);
});

export const getLanguagesLoadAttempted: MemoizedSelector<
  StateWithSiteContext,
  boolean
> = createSelector(getLanguagesState, languagesLoadAttemptedSelector);

export const getLanguagesLoading: MemoizedSelector<
  StateWithSiteContext,
  boolean
> = createSelector(getLanguagesState, languagesLoadingSelector);
