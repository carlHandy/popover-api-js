# Popover JS

A lightweight JavaScript/TypeScript library for creating and managing popovers in web applications built on top the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) standard. Compatible with React and uses [Popper.js](https://popper.js.org/) for positioning.

## Features

- Easy integration with any JS/TS project
- Supports positioning popovers at the top, bottom, left, or right of the target element
- Supports customizing the appearance of the popover with inline CSS
- Simple API for showing, hiding, and toggling popovers
- React component for seamless React integration
- Content can be HTML, or plain text

## Demo

[Live Demo](https://react-popoverjs-demo.pages.dev/)
[CodeSandbox Demo](https://codesandbox.io/p/github/carlHandy/react-popoverjs-demo/main?file=%2Fsrc%2FApp.tsx)

## Availabe Props

- `target` - The target element for the popover
- `content` - The content of the popover
- `position` - The position of the popover relative to the target element (optional default to bottom)
- `offset` - The offset of the popover from the target element (optional)
- `style` - The style of the popover (optional)
- `isMarkdown` - A flag to indicate if the content is markdown (optional)

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
  position: 'bottom', // Default position
  offset: [0, 16], // Default offset of 16px
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
  const content: string = `Welcome to react-popoverjs!
      Use this library to create popovers in your React applications.
      You can customize the content, position, and style of the popovers.
      It utilizes the standard [browser Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API), and Popper.js for positioning, ensuring it is lightweight and fast.`;

  useEffect(() => {
    if (buttonRef.current) {
      setTarget(buttonRef.current);
    } else {
      console.log('Button ref is not attached yet.');
    }
  }, []);

  return (
    <div style={styles.container}>
      <button ref={buttonRef} style={styles.button}>Toggle Popover</button>
      {target && (
        <PopoverComponent 
          target={target} content={content} position='bottom'
          style={styles.popover}>
          <></> {/* Empty fragment as children */}
        </PopoverComponent>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '10px',
    boxSizing: 'border-box' as 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
  },
  popover: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
  },
  '@media (max-width: 600px)': {
    container: {
      flexDirection: 'column' as 'column',
      height: 'auto',
    },
    button: {
      width: '100%',
      marginBottom: '10px',
    },
    popover: {
      marginLeft: '0',
      marginTop: '10px',
    },
  },
};

export default App;
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
