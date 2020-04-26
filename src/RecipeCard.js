import React from 'react';
class RecipeCard extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                showIngredients: false,
                showEditingForm: false
            }
            this.recipe = props.recipe;
            this.recipeID = this.recipe.recipeID;
            this.ingredients = this.generateIngredientsRows();
        }
        ingredientsTable = () => {
            return(
                <div className="overlay" style={this.handleDisplayStyle(this.state.showIngredients)} onClick={ ()=> { this.handleShowIngredients(); } } >
                    <div className="overlay-content rounded" onClick={ (event)=> { event.stopPropagation(); } }>
                    <center><h3><br/>{this.recipe.title} </h3></center>
                        <div className="ingredients">
                        <h5>Ingredients: </h5>
                        < table className="table table-striped">
                            <tbody>{this.ingredients}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
        editingForm = () => {
            return(
                <div className="overlay" style={this.handleDisplayStyle(this.state.showEditingForm)} onClick={ ()=> { this.handleEditClick(); } } >
                    <div className="overlay-content rounded" onClick={ (event)=> { event.stopPropagation(); } }>
                        <center><h1><br/>{this.recipe.title}</h1></center>
                        <div className="editForm">
                            <div className="form-group">
                                <label>Titre:</label>
                                <input type="text" className={`form-control input-${this.recipeID}`} inpu id={`editTitle${this.recipeID}`} placeholder={this.recipe.title}/><br/>
                                <label>Image:</label>
                                <input type="text" className={`form-control input-${this.recipeID}`} id={`editImage${this.recipeID}`} placeholder={this.recipe.image}/><br/>
                                <label>Description:</label>
                                <textarea className={`form-control input-${this.recipeID}`} id={`editDescription${this.recipeID}`} placeholder={this.recipe.description}/><br/>
                                <label>Temps de Préparation:</label>
                                <input type="number" className={`form-control input-${this.recipeID}`} id={`editTime${this.recipeID}`} placeholder={this.recipe.time}/><br/>
                                <label>Ingredients: </label><a href="#" onClick={()=>test('editForm',this.recipeID)} class="text-success"><i
            class="fa fa-plus fa-sm float-right"></i></a>
                <table className="table table-striped" id="editRecipe-Table">
                  <tbody>{this.recipe.ingredients.map(i => {
                return ( <tr><td> {
                        <li className={`edit-Ingredients-${this.recipeID}`} contenteditable="true">{i}</li>
                        } </td><td><a href="#" class="text-danger" onClick={(e)=>{test(e.target)}}><i
                        class="fa fa-minus fa-sm float-right"></i></a></td></tr>);})}</tbody>
                </table>
                                <button type="button" className="btn btn-primary mb-2" onClick={(event)=>{this.handleEditRecipe(event)}}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        handleDisplayStyle(property){
            return { "display": property==true ? "block" : "none" };
        }
        handleShowIngredients() {
            this.setState({
                showIngredients: !this.state.showIngredients
            });
        }
        handleEditRecipe(event){
            var forms = document.getElementsByClassName("input-"+this.recipeID);
            let valid = true;
            Array.prototype.forEach.call(forms, function(e) {
                if(e.value==""){
                    e.classList.add("is-invalid");
                    valid = false;
                }
                else{
                    e.classList.remove("is-invalid");
                }
            });
            if(valid){
                var ingredients = [];
                Array.prototype.forEach.call(document.getElementsByClassName("edit-Ingredients-"+this.recipeID), function(e) {
                    ingredients.push(e.textContent);
                });
            var recipe = {
                recipeID: this.recipeID,
                title: document.getElementById("editTitle" + this.recipeID).value,
                image: document.getElementById("editImage" + this.recipeID).value,
                description: document.getElementById("editDescription" + this.recipeID).value,
                time: document.getElementById("editTime" + this.recipeID).value,
                ingredients
            };
            this.props.editFunction(recipe);
            this.handleEditClick();
        }
        }
        handleEditClick() {
            this.setState({
                showEditingForm: !this.state.showEditingForm
            });
        }
        generateIngredientsRows() {
            return this.recipe.ingredients.map(i => {
                return ( <tr><td> {
                        <li>{i}</li>
                        } </td></tr>);});
        }
        render() {
            return [
            <>{this.editingForm()}</>,
            <>{this.ingredientsTable()}</>,
            <div className="col-md-4 p-3">
                <div className="recipeCard">
                    <button type="button" className="btn btn-warning btn-rounded" onClick={ ()=> this.handleEditClick() } >
                        < i style={ { "color": "white" } } className="fa fa-pencil-square-o fa-lg"> </i>
                    </button>
                    <button type="button" className="btn btn-danger btn-rounded" onClick={()=>this.props.deleteFunction()} >
                        < i className="fa fa-minus fa-lg"> </i>
                    </button>
                </div>
                <div className="card box-shadow">
                    <img className="card-img-top" src={ this.recipe.image }/>
                    <div className="card-body">
                        <center>
                            <h6> {
                                this.recipe.title
                            } </h6> </center>
                        <div className="card-text"> { this.recipe.description }
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="Empty"></div>
                                <small className="text-muted timeText">Total Time: {
                                this.recipe.time
                            } {
                                this.recipe.time !== "1" ? "mins" : "min"
                            } </small> </div>
                        </div>
                        <center>
                            <a href="#" onClick={ ()=> {
                                    this.handleShowIngredients();
                                    return false;
                                }
                            }
                            className = "btn btn-primary stretched-link ingredientsButton" > Ingredients </a> </center>
                    </div>
                </div>
            </div>
        ];
            }
                            }
export default RecipeCard;