// node_modules
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'react-emotion';

// app_modules
import movies from '../data/movies.json';
import Chat from './chat';

// movies need unique ids for chat to function well
movies.forEach((m, index) => (m.id = `movie_${index}`));

const Row = styled('ul')`
  display: flex;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
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

  &:nth-child(2n + 2) {
    background-color: #242e39;
  }

  &:first-child {
    font-size: 15px;
    font-weight: bold;
    pointer-events: <no></no>ne;
    > li {
      padding: 18px 0;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  transition: background-color 0.25s ease-in-out;
`;

const App = () => {
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {}, []);

  function sorter(a, b) {
    if (/year|rating/.test(sortBy)) {
      return b[sortBy] - a[sortBy]; // newest/highest rating first
    }

    if (sortBy == 'title') {
      let A = a.title.toUpperCase();
      let B = b.title.toUpperCase();

      if (A < B) {
        return -1;
      }

      if (A > B) {
        return 1;
      }

      // names must be equal
      return 0;
    }
  }

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
        border-radius: 3px;
        overflow: hidden;
        overflow-y: ${selectedMovie ? 'hidden' : 'auto'};
        background-color: #2c3845;
        box-shadow: 1px 5px 10px 2px rgba(0, 0, 0, 0.45);
        position: relative;
        header {
          position: sticky;
          top: 0;
          background-color: #202932;
        }
        > * {
          padding: 0 12px;
        }
      `}
    >
      {selectedMovie ? (
        <Chat
          goBack={() => setSelectedMovie(null)}
          selectedMovie={selectedMovie}
        ></Chat>
      ) : (
        <>
          <header
            css={`
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
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="all">All</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
                <option value="year">Year</option>
              </select>
            </div>
          </header>
          {movies
            .filter(m =>
              m.title.toLowerCase().includes(filterText.toLowerCase())
            )
            .sort(sorter)
            .map(m => (
              <Row key={m.id} onClick={() => setSelectedMovie(m)}>
                <li>{m.title}</li>
                <li>{m.year}</li>
                <li>{m.runtime} mins</li>
                <li>{m.revenue && `$${m.revenue}M`}</li>
                <li>{m.rating}</li>
                <li>{m.genre.join(' ').replace(/\s/g, ', ')}</li>
              </Row>
            ))}
        </>
      )}
    </main>
  );
};

export default App;
