import React from 'react';
import AsyncSelect from 'react-select/async';
import { debounce } from 'debounce';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const callAutosuggest = async (inputValue) => {
  try {
    console.log(`Front end calls bing autosuggest with query: [${inputValue}]`);
    const response = await fetch(
      `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${encodeURIComponent(inputValue)}`,
      { headers: { 'Ocp-Apim-Subscription-Key': '2a28a91fb63e4252b0a7ecfba00c7656' } });
    const data = await response.json();
    const resultsRaw = data.suggestionGroups[0].searchSuggestions;
    return resultsRaw.map(result => ({ value: result.query, label: result.displayText }));
  } catch (e) {
    console.error(`Error in fetching autosuggestion from bing api: ${e.message}`);
  }
}

const loadOptions = (inputValue, callback) => {
  callAutosuggest(inputValue).then(callback);
}

class SearchBar extends React.Component {

  handleChange = (obj) => {
    this.props.onSearchChange(obj.value);
    this.props.history.push(`/search?q=${encodeURIComponent(obj.value)}`);
  }

  render() {
    return (
      <div id="SearchBar" className="col-lg-3 col-md-11 col-10">
        <AsyncSelect
          placeholder={"Enter keyword .."}
          cacheOptions
          loadOptions={debounce(loadOptions, 500)}
          onChange={this.handleChange}
          noOptionsMessage={() => "No Match"} />
      </div>
    );
  }

}

export default withRouter(SearchBar);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
}