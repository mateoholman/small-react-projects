import React from 'react';
import { storiesOf } from '@storybook/react';
import TypeAheadForm from './TypeAheadForm';

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
const dirtyItems = ['Dupe', 'Dupe', 'Dupe', 'Acaí', 'Two Words', 'Açaí'];

storiesOf('TypeAhead', module)
  .add('Downshift', () => <TypeAheadForm data={items} />)
  .add('Throttled Downshift', () => <TypeAheadForm data={items} throttled />)
  .add('Normalized Data', () => <TypeAheadForm data={dirtyItems} normalize />);