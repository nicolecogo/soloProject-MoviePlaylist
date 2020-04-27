import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';

import Movies from '../MovieList';

// mocking Redux Provider and store
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../../../Reducers';
const initialState = {
  authentication: {},
  movieList: false
};
const store = createStore(allReducers, initialState);

// mocking of apiCalls
import { getMovieList } from '../../../Services/apiCalls';
jest.mock('../../../Services/apiCalls');
const fakeMoviesPromise = Promise.resolve({
  results: [
    {
      id: '27205',
      title: 'Inception',
      poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      release_date: '2010-12-07',
    },
    {
      id: '597',
      title: 'Titanic',
      poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      release_date: '1997-11-18',
    },
  ],
});
getMovieList.mockImplementation(() => fakeMoviesPromise);

describe('Movie component', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      (<Provider store={store}>
        <Movies />
      </Provider>)
    , div);
  });
  it('renders a footer message', () => {
    const component = render(
      (<Provider store={store}>
        <Movies />
      </Provider>)
    );
    expect(component.getByText(/No more movies/i)).toBeInTheDocument();
  });
  it('renders each movie occurence as a SingleMovie component', async () => {
    const { container } = await render(
      (<Provider store={store}>
        <Movies />
      </Provider>)
    );
    expect(container.getElementsByClassName('singleMovie').length).toEqual(
      (await fakeMoviesPromise).results.length
    );
  });
  it('renders the movie titles', async () => {
    const { queryByText } = await render(
      (<Provider store={store}>
        <Movies />
      </Provider>)
    );
    expect(queryByText(/Inception/i)).toBeInTheDocument();
    expect(queryByText(/Titanic/i)).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const component = renderer.create(
      (<Provider store={store}>
        <Movies />
      </Provider>)
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});