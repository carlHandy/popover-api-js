# Popover JS

A lightweight JavaScript/TypeScript library for creating and managing popovers in web applications. Compatible with React.

## Features

- Easy integration with any JS/TS project
- Supports positioning popovers at the top, bottom, left, or right of the target element
- Simple API for showing, hiding, and toggling popovers
- React component for seamless React integration

## Installation

Install the package via npm:

```bash
npm install popover-js
```

## Usage

### Basic Example

Import the `Popover` class and create a new popover instance:

```javascript
import { Popover } from 'popover-js';

const button = document.querySelector('#myButton');
const popover = new Popover({
  target: button,
  content: 'Hello, Popover!',
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
import { PopoverComponent } from 'popover-js';

const App: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(buttonRef.current);
  }, []);

  return (
    <div>
      <button ref={buttonRef}>Toggle Popover</button>
      {target && (
        <PopoverComponent target={target} content="Hello, Popover!">
          {/* Additional JSX or components */}
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