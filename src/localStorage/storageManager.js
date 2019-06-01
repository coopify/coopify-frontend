
import { fromJS } from 'immutable';

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state');
    if (serializedData === null) {
      return undefined;
    }
    return fromJS(JSON.parse(serializedData));
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedData = JSON.stringify(state.toJS());
    localStorage.setItem('state', serializedData);
  } catch (error) {
  }
};
