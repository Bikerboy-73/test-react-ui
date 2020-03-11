import React from "react";
import { Route } from "react-router-dom";

/**
 *
 * @param {Object} Route parameters
 * @description Route parameters must contain layout, component and other props. Layout has to be the master oage.
 */
export function RouteWithLayout({ layout, auth, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        React.createElement(
          layout,
          { ...props, ...rest },
          React.createElement(component, { ...props, ...rest })
        )
      }
    />
  );
}


