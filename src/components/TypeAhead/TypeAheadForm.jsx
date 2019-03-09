import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TypeAhead from './index.jsx';
require('./TypeAhead.scss');

class TypeAheadForm extends React.Component {
  state = { value: '', data: [] }

  componentDidMount() {
    if (this.props.data) {
      const sanitizedData = this.sanitizeData(this.props.data);
      this.setState({ data: sanitizedData });
    }
  }

  sanitizeData = (data) => {
    const sanitizedData = [...data];
    let normalData = sanitizedData;
    // Normalize the data if it's requested
    if (this.props.normalize) {
      //Decompose graphene characters to the character + the diacritic, then
      //remove the diactritic.
      normalData = sanitizedData.map(item => item.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    }
    // Add the data to a set to remove duplicate items
    const dataSet = new Set(normalData);
    return [...dataSet];

  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('You submitted: ', this.state.value);
    this.setState({ value: ''})
  }

  handleStateChange = (changes) => {
    if (changes.hasOwnProperty('selectedItem')) {
      this.setState({ value: changes.selectedItem });
    } else if (changes.hasOwnProperty('inputValue')) {
      this.setState({ value: changes.inputValue });
    }
  };

  throttledHandleStateChange = _.throttle((changes) => {
    if (changes.hasOwnProperty('selectedItem')) {
      this.setState({ value: changes.selectedItem });
    } else if (changes.hasOwnProperty('inputValue')) {
      this.setState({ value: changes.inputValue });
    }
  }, 500);

  render() {
    const { throttle, submitButton } = this.props;
    const { data, value } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form-display">
        <TypeAhead
          data={data}
          handleChange={throttle ? this.throttledHandleStateChange : this.handleStateChange}
          value={value}
        />
        {
          submitButton &&
          <button type="submit" className="submit-button">Submit</button>
        }
      </form>
    )
  }
}

TypeAhead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  /*Normalize removes accents from characters for better matching*/
  normalize: PropTypes.bool,
  submitButton: PropTypes.bool,
  throttle: PropTypes.bool
};

export default TypeAheadForm;