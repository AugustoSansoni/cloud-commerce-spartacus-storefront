import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  StateWithSiteContext,
  CurrenciesState,
  CurrencyEntities,
  SiteContextState
} from '../state';
import { getSiteContextState } from './site-context.selector';

const currenciesEntitiesSelector = (state: CurrenciesState) => state.entities;
export const currenciesLoadAttemptedSelector = (state: CurrenciesState) =>
  state.loadAttempted;
const currenciesLoadingSelector = (state: CurrenciesState) => state.loading;
const activeCurrencySelector = (state: CurrenciesState) => state.activeCurrency;

export const getCurrenciesState: MemoizedSelector<
  StateWithSiteContext,
  CurrenciesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.currencies
);

export const getCurrenciesEntities: MemoizedSelector<
  StateWithSiteContext,
  CurrencyEntities
> = createSelector(getCurrenciesState, currenciesEntitiesSelector);

export const getActiveCurrency: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(getCurrenciesState, activeCurrencySelector);

export const getAllCurrencies: MemoizedSelector<
  StateWithSiteContext,
  any
> = createSelector(getCurrenciesEntities, entities => {
  return Object.keys(entities).map(isocode => entities[isocode]);
});

export const getCurrenciesLoadAttempted: MemoizedSelector<
  StateWithSiteContext,
  boolean
> = createSelector(getCurrenciesState, currenciesLoadAttemptedSelector);

export const getCurrenciesLoading: MemoizedSelector<
  StateWithSiteContext,
  boolean
> = createSelector(getCurrenciesState, currenciesLoadingSelector);
