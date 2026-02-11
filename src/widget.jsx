// src/widget.jsx
import r2wc from '@r2wc/react-to-web-component';
import CosmicWidget from './CosmicWidget';
// Import styles so they get bundled
import './index.css'; 

// Convert React component to Web Component
const CosmicWebComponent = r2wc(CosmicWidget, {
  props: {
    // If you want to pass props from Angular later, list them here
    // e.g., initialObject: "string" 
  },
  shadow: "open" // Uses Shadow DOM to prevent Angular styles from breaking the widget
});

// Define the custom element
customElements.define('cosmic-widget', CosmicWebComponent);