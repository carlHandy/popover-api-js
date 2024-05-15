# Popover API JS

A lightweight JavaScript/TypeScript library for creating and managing popovers in web applications.

## Features

- Easy to integrate with any JS/TS project
- Supports positioning popovers at the top, bottom, left, or right of the target element
- Simple API for showing, hiding, and toggling popovers

## Installation

Install the package via npm:

```bash
npm install popover-api-js
```

## Usage

### Basic Example

Import the Popover class and create a new popover instance:

```javascript
import { Popover } from 'popover-api-js';

const button = document.querySelector('#myButton');
const popover = new Popover({
  target: button,
  content: 'Hello, Popover!'
});

// Manually control the popover
popover.show();
popover.hide();
popover.toggle();
```

### HTML Structure

Make sure your HTML includes the target element:

```html
<button id="myButton">Toggle Popover</button>
```

### Customizing Position

You can customize the position of the popover by specifying the `position` option:

```javascript
const popover = new Popover({
  target: button,
  content: 'Hello, Popover!',
  position: 'top' // Options: 'top', 'bottom', 'left', 'right'
});
```

## Development

### Building the Library

To build the library, run the following command:

```bash
npm run build
```

### Running Tests

To run the tests using Vitest, execute:

```bash
npm run test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Author

[Carl Handy](https://handy.gy)
