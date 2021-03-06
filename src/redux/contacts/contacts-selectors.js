import { createSelector } from '@reduxjs/toolkit';

const getAllContacts = state => state.contacts.items;

const getLoading = state => state.contacts.loading;

const getFilter = state => state.contacts.filter;

const getFilterContacts = createSelector(
  [getAllContacts, getFilter],

  (contacts, filter) => {
    const normalizedFilter = filter.toLocaleLowerCase();

    if (normalizedFilter || normalizedFilter === '') {
      return contacts.filter(
        ({ name, number }) =>
          name.toLocaleLowerCase().includes(normalizedFilter) ||
          number.includes(normalizedFilter),
      );
    }
  },
);

const getTotalContactsCount = state => getAllContacts(state).length;

const selectors = {
  getAllContacts,
  getLoading,
  getFilter,
  getFilterContacts,
  getTotalContactsCount,
};
export default selectors;
