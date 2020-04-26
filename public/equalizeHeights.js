/*function equalizeHeights(e){
    var maxHeight = 0;

$(e).each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});

$(e).height(maxHeight);
}
$(document).ready( function () {
    equalizeHeights('.card-body center');
    equalizeHeights('.card-body .card-text');
});*/

// To Fix Later:
function test(form,ID){
    if(form=="addForm"){
    $('#newRecipe-Table').append(`<tr><td contenteditable="true">
    <li class="add-Ingredients">_</li>
    </td><td><a href="#" onclick="deleteRow(this)" class="text-danger"><i
    class="fa fa-minus fa-sm float-right"></i></a></td></tr>`)
    }else if(form=="editForm"){
        $('#editRecipe-Table').append(`<tr><td contenteditable="true">
    <li class="edit-Ingredients-${ID}">_</li>
    </td><td><a href="#" onclick="deleteRow(this)" class="text-danger"><i
    class="fa fa-minus fa-sm float-right"></i></a></td></tr>`)
    }
    else if(form=="clear"){
        $("#newRecipe-Table").remove(); 
    }
    else{
        deleteRow(form);
    }
}
function deleteRow(element){
    $(element).closest("tr").remove();
}