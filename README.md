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
    <div>
      <button ref={buttonRef}>Toggle Popover</button>
      {target && (
        <PopoverComponent target={target} content="Hello, Popover!" position="top">
          {/* Additional JSX or components */}
        </PopoverComponent>
      )}
    </div>
  );
};

export default App;
```

### Advanced Example in a React Project

This example shows how to use the `PopoverComponent` in a more complex React component.

**Newsroom.tsx:**

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { PopoverComponent } from 'popover-js';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import FeaturedIn from "./FeaturedIn";
import LatestNews from "./LatestNews";

function Newsroom() {
  const [email, setEmail] = useState("");
  const [zip, setZipCode] = useState("");
  const [notification, setNotification] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showPopover, setShowPopover] = useState(false);

  const handleSubmit = () => {
    fetch("https://hooks.zapier.com/hooks/catch/11001662/b9t4wnt/", {
      method: "POST",
      body: JSON.stringify({ email, zip }),
    })
      .then((response) => response.json())
      .then(() => {
        setNotification("Thank you for signing up!");
        setEmail("");
        setZipCode("");
        setShowPopover(true);
        setTimeout(() => setShowPopover(false), 3000); // Hide popover after 3 seconds
      })
      .catch(() => {
        setNotification("An error occurred. Please try again.");
        setShowPopover(true);
        setTimeout(() => setShowPopover(false), 3000); // Hide popover after 3 seconds
      });
  };

  return (
    <div>
      <div className="newsroom" style={{ marginTop: "20px" }}>
        <Container maxWidth="xl">
          <div className="newsroom-content">
            <Box className="heading">
              <p className="heading-text">Where innovation meets opportunity</p>
              <p className="sub-heading">
                Get the latest news on North America&apos;s fastest growing
                online auction platform.
              </p>
            </Box>
            <Box className="img-box">
              <Image
                alt="newsroom image"
                src={"/assets/newsroom/newsroom.svg"}
                width={100}
                height={100}
                unoptimized
                priority
              />
            </Box>
          </div>

          <Box className="section-2">
            <FeaturedIn />
          </Box>
          <Box className="section-3">
            <LatestNews />
          </Box>
          <Box className="section-4">
            <Box className="newsletter">
              <Grid container>
                <Grid item sm={12} md={8} xs={12}>
                  <Box
                    className="news-content"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Box
                      className="news-head"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <h4>Sign up for our newsletter</h4>
                      <p>
                        Enter your email to receive the latest news and updates.
                      </p>
                    </Box>
                    <Box className="news-form">
                      <Grid container spacing={2}>
                        <Grid item md={4} sm={4} xs={12}>
                          <TextField
                            fullWidth
                            label="Postal/Zip Code"
                            variant="outlined"
                            value={zip}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </Grid>
                        <Grid item md={6} sm={5} xs={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Grid>
                        <Grid item md={2} sm={3} xs={3}>
                          <Button
                            ref={buttonRef}
                            className="findBtn notify-btn"
                            onClick={handleSubmit}
                          >
                            Notify me
                          </Button>
                        </Grid>
                        <Grid item>
                          {showPopover && buttonRef.current && (
                            <PopoverComponent
                              target={buttonRef.current}
                              content={notification}
                              position="top"
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={4} md={4} xs={12} className="tab-display">
                  <Image
                    className="news-img"
                    src={"/assets/about/newsletter.svg"}
                    alt="newsletter"
                    width={100}
                    height={100}
                    unoptimized
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="section-5">
            <Box className="description">
              <h1>Media Inquiries</h1>
              <p>
                {
                  "Our press team loves working with journalists around the world to share unique and compelling stories. If you're a member of the media and would like to talk, please get in touch with us at "
                }
                <u>
                  <a href="mailto:press@maxsold.com">press@maxsold.com</a>
                </u>
                .
              </p>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Newsroom;
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
