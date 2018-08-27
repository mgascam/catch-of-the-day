import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    addFish = (fish) => {
        console.log("adding a fish!");
        // 1. Take a copy of existing state
        const fishes = {...this.state.fishes};
        // 2. Add new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({ fishes });
    };
    render() {
       return (
           <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" />
            </div>
               <Order />
               <Inventory addFish={this.addFish} />
           </div>
       );
    }
}

export default App;
