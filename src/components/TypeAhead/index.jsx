import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import _ from 'lodash';

require('./TypeAhead.scss');

const XIcon = () => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="none"
    width={12}
    fill="transparent"
    stroke="#979797"
    strokeWidth="1.1px"
  >
    <path d="M1,1 L19,19" />
    <path d="M19,1 L1,19" />
  </svg>
);

class TypeAhead extends React.Component {
  state = { value: '', data: [] }

  componentDidMount() {
    if (this.props.data){
      const sanitizedData = this.sanitizeData(this.props.data);
      this.setState({ data: sanitizedData });
    }
  }

  sanitizeData = (data) => {
    const sanitizedData = [...data];
    let normalData = sanitizedData;
    // Normalize the data if it's requested
    if (this.props.normalize){
      normalData = sanitizedData.map(item => item.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
      console.info('Sanitized data is: ', normalData);
    }
    // Add the data to a set to remove duplicate items
    const dataSet = new Set(normalData);
    return [...dataSet];

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
    const { value, data } = this.state;
    const { throttle } = this.props;
    return (
      <div className="typeahead-container">
        <Downshift selectedItem={value} onStateChange={throttle ? this.handleStateChange: this.throttledHandleStateChange}>
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            clearSelection
          }) => (
              <div className="downshift-container">
                <div className="downshift-input-container">
                  <input {...getInputProps()} className={`typeahead-input ${isOpen ? 'isOpen' : ''}`} placeholder="Enter a name" />
                  {selectedItem && (
                    <button
                      className="controller-button"
                      onClick={clearSelection}
                      aria-label="clear selection"
                    >
                      <XIcon />
                    </button>
                  )}
                </div>
                <div className="downshift-menu-container">
                  <ul {...getMenuProps()} className={`base-menu ${isOpen ? 'isOpen' : ''}`}>
                    {
                      isOpen && value ?
                        data
                          .filter(item => !value || item.toLowerCase().includes(value.toLowerCase()))
                          .map((item, index) => (
                            <li
                              className="menu-item"
                              {...getItemProps({
                                key: item,
                                index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index ? 'lightgray' : null,
                                  fontWeight: selectedItem === item ? 'bold' : 'normal',
                                },
                              })}
                            >
                              <span>
                                {
                                  item.includes(' ') && !value.includes(' ') ?
                                    item.split(' ').map(i => i.toLowerCase().includes(value.toLowerCase()) ? (<b key={i}> {i} </b>) : (i)) :
                                    (<b>{item}</b>)
                                }
                              </span>
                            </li>
                          ))
                        : null
                    }
                  </ul>
                </div>
              </div>
            )}
        </Downshift>
      </div>
    );
  }
}

TypeAhead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  /*Normalize removes accents from characters for better matching*/
  normalize: PropTypes.bool,
  throttle: PropTypes.bool
};

export default TypeAhead;