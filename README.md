# Popover JS

A lightweight JavaScript/TypeScript library for creating and managing popovers in web applications built on top the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) standard. Compatible with React.

## Features

- Easy integration with any JS/TS project
- Supports positioning popovers at the top, bottom, left, or right of the target element
- Supports customizing the appearance of the popover with inline CSS
- Simple API for showing, hiding, and toggling popovers
- React component for seamless React integration

## Installation

Install the package via npm:

```bash
npm install react-popoverjs
```

## Usage

### Declarative Approach

You can create popovers using HTML attributes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Popover Example</title>
</head>
<body>
  <button popovertarget="mypopover">Toggle the popover</button>
  <div id="mypopover" popover>Popover content</div>

  <script src="popover.js"></script>
</body>
</html>
```

### Programmatic Approach

#### Basic Example

Import the `Popover` class and create a new popover instance:

```javascript
import { Popover } from 'react-popoverjs';

const button = document.querySelector('#myButton');
const popover = new Popover({
  target: button,
  content: 'Hello, Popover!',
  position: 'top',
  style: {
    backgroundColor: 'lightblue',
    color: 'black',
  },
});

// Manually control the popover
popover.show();
popover.hide();
popover.toggle();
```

### React Integration

Use the `PopoverComponent` for integrating popovers within React applications.

#### Example

**App.tsx:**

```tsx
import React, { useRef, useEffect, useState } from 'react';
import { PopoverComponent } from 'react-popoverjs';

const App: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(buttonRef.current);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <button ref={buttonRef}>Toggle Popover</button>
      {target && (
        <PopoverComponent target={target} content="Hello, Popover!" position='bottom' style={{ backgroundColor: 'lightblue', color: 'black' }}>
          <></> {/* Empty fragment as children */}
        </PopoverComponent>
      )}
    </div>
  );
};

export default App;
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
