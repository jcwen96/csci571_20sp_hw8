import React, { Suspense, lazy } from 'react';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import Loader from './Loader';
import PropTypes from 'prop-types';
import './Body.css';

const Home = lazy(() => import('./pages/home'));
const Article = lazy(() => import('./pages/article'));
const Search = lazy(() => import('./pages/search'));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Body(props) {
  let query = useQuery();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/article">
          <Article id={query.get("id")} isGuardian={props.isGuardian} 
            needFreshSearchBar={props.needFreshSearchBar} />
        </Route>
        <Route path="/search">
          <Search key="search" q={query.get("q")} isSearch isGuardian={props.isGuardian} />
        </Route>
        <Route path="/favorites">
          <Search key="favorates" isSearch={false} isGuardian={props.isGuardian} 
            needFreshSearchBar={props.needFreshSearchBar} />
        </Route>
        <Route path="/:section">
          <Section isGuardian={props.isGuardian} />
        </Route>
        <Route path="/">
          <Home isGuardian={props.isGuardian} section="Home" />
        </Route>
      </Switch>
    </Suspense>);
}

function Section(props) {
  let { section } = useParams();
  return (
    <Home isGuardian={props.isGuardian} section={section} key={section} />
  );
}

Body.propTypes = {
  isGuardian: PropTypes.bool.isRequired,
  needFreshSearchBar: PropTypes.func.isRequired
}