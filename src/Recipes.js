import React from 'react';
import RecipeCard from './RecipeCard';
import data from './recipes.json';

class Recipes extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showAddForm: false,
      recipes: data}
  }
  componentDidMount(){
    document.getElementById("buttonAdd").addEventListener("click",()=>{this.handleAddClick()});
  }
  storageAvailable(storage){
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch(e) {
        return false;
    }
}
componentWillMount() {
    if (this.storageAvailable('localStorage')) {
        const localRef = localStorage.getItem('recipes',JSON.stringify(this.state.recipes));
        if (localRef) {
            this.setState({
                recipes: JSON.parse(localRef)
            })
        }
    } else {
        console.error('Your browser doesn\'t support local storage');
    }
}
componentWillUpdate(nextProps, nextState) {
    if (this.storageAvailable('localStorage')) {
        const ref = localStorage.setItem('recipes',JSON.stringify(nextState.recipes))
    } else {
        console.error('Your browser doesn\'t support local storage');
    }
}
  addForm = () => {
    return(
      <div className="overlay" style={ { "display": this.state.showAddForm==true ? "block" : "none" } } onClick={ ()=> { this.handleAddClick(); } } >
    <div className="overlay-content" onClick={ (event)=> { event.stopPropagation(); } }>
        <center><h1>New Recipe</h1></center>
        <div className="addForm">
            <div className="form-group">
                <label>Titre:</label>
                <input type="text" className="form-control input-new" id="newTitle" /><br/>
                <label>Image:</label>
                <input type="text" className="form-control input-new" id="newImage" /><br/>
                <label>Description:</label>
                <textarea className="form-control input-new" id="newDescription" /><br/>
                <label>Temps de Préparation:</label>
                <input type="number" className="form-control input-new" id="newTime" /><br/>
                <label>Ingredients: </label><a href="#" onClick={()=>test('addForm')} class="text-success"><i
            class="fa fa-plus fa-sm float-right"></i></a>
                <table className="table table-striped" id="newRecipe-Table">
                  <tbody></tbody>
                </table>
                <button type="button" className="btn btn-primary mb-2" onClick={(event)=>this.handleNewRecipe(event)}>Add</button>
            </div>
        </div>
    </div>
</div>
    )
  }
  handleAddClick(){
    this.setState({
      showAddForm: !this.state.showAddForm
  });
  }
  handleNewRecipe(){
    var forms = document.getElementsByClassName("input-new");
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
    Array.prototype.forEach.call(document.getElementsByClassName("add-Ingredients"), function(e) {
      ingredients.push(e.textContent);
  });
    var recipe = {
      title: document.getElementById("newTitle").value,
      image: document.getElementById("newImage").value,
      description: document.getElementById("newDescription").value,
      time: document.getElementById("newTime").value,
      ingredients
    };
    Array.prototype.forEach.call(forms, function(e) {
            e.value="";
            });
    test("clear");
    this.addRecipe(recipe);
    this.handleAddClick();
  }
  }
  addRecipe(recipe){
    const recipes = {...this.state.recipes};
    const last = Date.now();
    recipe.recipeID = `recipe${last}`;
    recipes[`recipe${last}`] = recipe;
    this.setState({recipes});
  }
  deleteRecipe(recipeID){
    const recipes = {...this.state.recipes};
    delete recipes[recipeID];
    this.setState({recipes});
  }
  editRecipe(recipe){
    var recipes = {...this.state.recipes};
    console.log(recipes);
    recipes[recipe.recipeID].title=recipe.title;
    recipes[recipe.recipeID].image=recipe.image;
    recipes[recipe.recipeID].description=recipe.description;
    recipes[recipe.recipeID].time=recipe.time;
    recipes[recipe.recipeID].ingredients=recipe.ingredients;
    this.setState({recipes})
  }
  render(){
    var r = [];
    r.push(<>{this.addForm()}</>);
    for(const key of (Object.keys(this.state.recipes))){
    r.push(<RecipeCard key={key} recipe={this.state.recipes[key]} deleteFunction={()=>{this.deleteRecipe(key)}} 
    editFunction={(recipe)=>{this.editRecipe(recipe)}} />);
}
return r;
  }
//    return recipes.map(e => <RecipeCard recipe={recipes[e]} />);
}
export default Recipes;
