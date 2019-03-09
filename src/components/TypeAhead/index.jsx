import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

require('./TypeAhead.scss');

const TypeAhead = (props) => {
    const { data, handleChange, value } = props;
    return (
      <div className="typeahead-container">
        <Downshift selectedItem={value} onStateChange={handleChange}>
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

TypeAhead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  value: PropTypes.string
};

export default TypeAhead;