import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

const SelectLanguage = (props) => {
  const languages = ["All", "Java Scrypt", "Python", "CSS", "Java", "Ruby"];

  const template = languages.map(
    (lang) => <li key={lang}
                  onClick={ () => props.onSelect(lang) }
                  style={lang === props.showLanguage ? {color: "#67d01f"} : null}>{lang}</li>);

  return (
    <ul className="languages">{template}</ul>
  );
};

const RepoGrid = (props) => {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className="avatar" src={repo.owner.avatar_url} alt={"Avatar for " + repo.owner.login}/>
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
};


RepoGrid.PropTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default class Popular extends Component {
  state = {
    selectedLanguage: "All",
    repos: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({selectedLanguage});

    api.fetchPopularRepos(selectedLanguage)
      .then((tadam) => {
        this.setState({repos: tadam});
      });
  };


  render() {
    return (
      <div>
        <SelectLanguage
          showLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? <Loading />: <RepoGrid repos={this.state.repos}/>}
      </div>
    )
  }
}