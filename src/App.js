import './App.css';
import Row from './Row';
import Banner from './Banner';
import Nav from './Nav';
import requests from './requests';

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />

      <Row title="Netflix Original" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Trending Now " fetchUrl={requests.fetchTrending} />
      <Row title="Upcoming " fetchUrl={requests.fetchUpcoming} />
      <Row title="Top Rated " fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies " fetchUrl={requests.fetchActionMovies} />
      <Row title="Adventure Movies " fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Animation Movies " fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Comedy Movies " fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies " fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies " fetchUrl={requests.fetchRomanceMovies} />

    </div>
  );
}

export default App;
