import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        fishes: PropTypes.object
    };
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(fish => {
                    return (
                        <EditFishForm
                            key={fish}
                            index={fish}
                            fish={this.props.fishes[fish]}
                            updateFish={this.props.updateFish}
                            deleteFish={this.props.deleteFish}
                        />
                    )
                })}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fish</button>
            </div>
        );
    }
}

export default Inventory;
