import React from "react";
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.array
    };
    myInput = React.createRef();
    goToStore = (event) => {
        event.preventDefault();
        this.props.history.push(
            `/store/${this.myInput.value.value}`
        );
    };
    render() {
        return (
          <form className="store-selector"
                onSubmit={this.goToStore}>
            <h2>Please Enter A Store</h2>
            <input
                type="text"
                required
                ref={this.myInput}
                placeholder="Store Name"
                defaultValue={getFunName()}
            />
            <button type="submit">Visit Store →</button>
          </form>
    );
  }
}

export default StorePicker;
