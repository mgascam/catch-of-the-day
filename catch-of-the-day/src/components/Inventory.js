import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        fishes: PropTypes.object
    };
    state = {
       uid: null,
       owner: null
    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };
    authHandler = async authData => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        // 2. Claim it if there is no owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid,
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        console.log(authData);
    };
    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null});
    };
    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        if (!this.state.uid) {
            return (
                <Login authenticate={this.authenticate}/>
            );
        }
        // Check if they are owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner</p>
                    { logout }
                </div>
            );
        }
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
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
