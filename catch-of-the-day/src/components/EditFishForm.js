import React from 'react';

class EditFishForm extends React.Component {
    handleChange = (event) => {
        // update that fish
        // 1. take a copy of the curent fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    };
    render() {
        const { name, price, status, desc, image} = this.props.fish;
        return (
           <div className="fish-edit">
               <input type="text" name="name" onChange={this.handleChange} value={name}/>
               <input type="text" name="price" onChange={this.handleChange} value={price}/>
               <select name="status" onChange={this.handleChange} value={status}>
                   <option onChange={this.handleChange} value="available">Fresh!</option>
                   <option onChange={this.handleChange} value="unavailable">Sold Out!</option>
               </select>
               <textarea name="desc" value={desc}></textarea>
               <input type="text" name="image" value={image}/>
               <button onClick={() => this.props.deleteFish(this.props.index)}>Remove fish</button>
           </div>
        );
    }
}

export default EditFishForm;
