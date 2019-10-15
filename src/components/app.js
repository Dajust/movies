import React, { useEffect, useState, useCallback } from 'react';
import styled from 'react-emotion';

import movies from '../data/movies.json';

const Row = styled('ul')`
  display: flex;
  text-align: left;
  padding: 0 10px;
  font-size: 14px;
  li {
    flex: 100%;
    padding: 16px 0;
    line-height: 1.4;
    &:first-child {
      margin-right: 15px;
    }
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      flex: 0 0 85px;
    }
  }

  &:first-child {
    font-size: 15px;
    font-weight: bold;
    > li {
      18px 0;
    }
  }

  &:nth-child(2n + 2) {
    background-color: #242e39;
  }
`;

const App = () => {
  const [filterText, setFilterText] = useState('');

  useEffect(() => {}, []);

  const onChangeFilterText = useCallback(e => {
    setFilterText(e.target.value);
  }, []);

  return (
    <main
      css={`
        width: 100%;
        width: 100%;
        max-width: 850px;
        height: 500px;
        overflow-y: scroll;
        background: #2c3845;
      `}
    >
      <header
        css={`
          position: sticky;
          top: 0;
          background-color: #202932;
          padding-bottom: 10px;
        `}
      >
        <Row>
          <li>Title</li>
          <li>Year</li>
          <li>Runtime</li>
          <li>Revenue</li>
          <li>Rating</li>
          <li>Genre</li>
        </Row>
        <div
          css={`
            display: flex;
            justify-content: space-between;
            padding: 10px 10px 0;

            input,
            select {
              width: 200px;
              background: #2c3845;
              padding: 6px 10px;
              border-radius: 3px;
              border: 1px solid transparent;
              font-size: 14px;
              outline: none;
              &:focus {
                border-color: #3f4e5f;
              }
            }
            option {
              padding: 15px; 10px;
            }
          `}
        >
          <input
            type="text"
            onChange={onChangeFilterText}
            value={filterText}
            placeholder="filter by title"
            css={''}
          />
          <select>
            <option selected value="all">
              All
            </option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
            <option value="year">Year</option>
          </select>
        </div>
      </header>

      {movies
        .filter(m => m.title.toLowerCase().includes(filterText.toLowerCase()))
        .map(m => (
          <Row key={m.description}>
            <li>{m.title}</li>
            <li>{m.year}</li>
            <li>{m.runtime} mins</li>
            <li>{m.revenue && `$${m.revenue}M`}</li>
            <li>{m.rating}</li>
            <li>{m.genre.join(' ').replace(/\s/g, ', ')}</li>
          </Row>
        ))}
    </main>
  );
};

export default App;
