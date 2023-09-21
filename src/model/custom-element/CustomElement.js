import { createEditor } from 'slate';
import { withReact } from 'slate-react';

const CustomElement = {
  // Define your custom element type
  type: 'custom-element',
  // Define how it should be serialized
  serialize: (element) => {
    return (
      <CustomElementElement>
        {element.children}
      </CustomElementElement>
    );
  },
  // Define how it should be deserialized
  deserialize: (element) => {
    if (element.tagName === 'SPAN' && element.style.backgroundColor === 'yellow') {
      return {
        type: 'custom-element',
        children: Array.from(element.children),
      };
    }
  },
};

const editor = withCustomElements(withReact(createEditor()));

// Add the custom element to the editor's schema
editor.addCustomElement(CustomElement);
