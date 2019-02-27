import React from 'react';
import Downshift from 'downshift';

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

const items = ['Açaí', 'Apple', 'Akee', 'Apricot', 'Avocado', 'Banana', 'Bilberry', 'Blackberry',
  'Blackcurrant', 'Black sapote', 'Blueberry', 'Boysenberry', 'Buddha\'s hand', 'Crab apples',
  'Currant', 'Cherry', 'Cherimoya', 'Chico fruit', 'Cloudberry', 'Coconut', 'Cranberry',
  'Damson', 'Date', 'Dragonfruit', 'Pitaya', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Goji berry',
  'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba',
  'Jackfruit', 'Jambul', 'Japanese plum', 'Jostaberry', 'Jujube', 'Juniper berry', 'Kiwano', 'Kiwifruit',
  'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon',
  'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Orange',
  'Blood orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear',
  'Persimmon', 'Plantain', 'Plum', 'Prune', 'Pineapple', 'Pineberry', 'Plumcot', 'Pomegranate', 'Pomelo',
  'Purple mangosteen', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salal', 'Salak', 'Satsuma',
  'Soursop', 'Star apple', 'Star fruit', 'Strawberry', 'Surinam cherry', 'Tamarillo', 'Tamarind', 'Ugli fruit',
  'White currant', 'White sapote', 'Yuzu', 'Bell pepper', 'Chili pepper', 'Corn kernel',
  'Cucumber', 'Eggplant', 'Olive', 'Pea', 'Pumpkin', 'Squash', 'Tomato', 'Zucchini'];

class TypeAhead extends React.Component {
  state = { value: '' }

  handleStateChange = (changes) => {
    console.info('Handle change received: ', changes);
    if (changes.hasOwnProperty('selectedItem')) {
      this.setState({ value: changes.selectedItem });
    } else if (changes.hasOwnProperty('inputValue')) {
      this.setState({ value: changes.inputValue });
    }
  }

  render() {
    const { value } = this.state;

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
                        items
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

export default TypeAhead;