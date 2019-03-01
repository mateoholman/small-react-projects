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
  state = { value: '' }

  dbInputValue = _.debounce(inputVal => {
    console.info('Db received: ', inputVal)
    this.setState({ value: inputVal});
  }, 1000);

  handleStateChange = (changes) => {
    if (changes.hasOwnProperty('selectedItem')) {
      this.dbInputValue(changes.selectedItem);
    } else if (changes.hasOwnProperty('inputValue')) {
      this.dbInputValue(changes.inputValue);
    }
  }

  render() {
    const { value } = this.state;
    const { data } = this.props;
    return (
      <div className="typeahead-container">
        <Downshift selectedItem={value} onStateChange={this.handleStateChange}>
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
                      isOpen && inputValue ?
                        data
                          .filter(item => !inputValue || item.toLowerCase().includes(inputValue.toLowerCase()))
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
                                  item.includes(' ') && !inputValue.includes(' ') ?
                                    item.split(' ').map(i => i.toLowerCase().includes(inputValue.toLowerCase()) ? (<b key={i}> {i} </b>) : (i)) :
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
  data: PropTypes.arrayOf(PropTypes.string)
};

export default TypeAhead;