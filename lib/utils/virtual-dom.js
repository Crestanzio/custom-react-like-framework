export const faster = (() => {
  const TEXT_ELEMENT = "TEXT";

  // Function helper to transfrom component objects
  function createElement(type, props, ...children) {
    return {
      type,
      // Add children in props
      props: {
        ...props,
        children: children.map(
          (child) => (typeof child === "object" ? child : createTextElement(child)) // Create children or text node
        ),
      },
    };
  }

  // Function to create texts components
  function createTextElement(nodeValue) {
    return {
      type: TEXT_ELEMENT,
      props: {
        nodeValue,
        children: [],
      },
    };
  }

  // Function that transfrom objects to HTMLElements and recursively append them to the parent
  function render(component, parent) {
    let dom;
    if (typeof component.type === "function") {
      dom = document.createElement(component.type().type);
      console.log(component);
      updateProps(dom, component.type().props);
      component.type().props.children.forEach((child) => render(child, dom));
      parent.appendChild(dom);
    } else if (component.type == TEXT_ELEMENT) {
      dom = document.createTextNode(component.props.nodeValue);
    } else {
      dom = document.createElement(component.type);
    }
    updateProps(dom, component.props);
    component.props.children.forEach((child) => render(child, dom));
    parent.appendChild(dom);
  }

  return {
    createElement,
    render,
  };
})();

// Function used by render to set attributes of HTMLElement: style, events…
function updateProps(element, props) {
  //Managing events like: onClick, onChange...
  const isListener = (name) => name.startsWith("on"); //true if onEvent
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2); //onEvent => event
      element.addEventListener(eventType, props[name]); //onEvent:callback => (event, callback)
    });

  // Managing style: color, fontSize...
  if (props.style) {
    Object.keys(props.style).forEach((name) => {
      element.style[name] = props.style[name];
    });
  }

  // Managing attriubute like: id, class...
  const isAttribute = (name) => !isListener(name) && name !== "children" && name !== "style";

  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      element[name] = props[name];
    });
}
