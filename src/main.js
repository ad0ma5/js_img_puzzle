
window.addEventListener('load', init);
var root;
var gcoll = 6, grow = 5;
var gwidth, gheight,
    swidth, sheight,
    ref_img,
    selected;
var all_vars = [];
function init(){
    root = document.getElementById("js_img_puzzle");
    ref_img = document.getElementById("ref_img");
    root.innerHTML = '';
    gwidth = ref_img.offsetWidth * 10;
    gheight = ref_img.offsetHeight * 10;
    swidth = parseInt(gwidth / gcoll);
    sheight = parseInt(gheight / grow);
    for(var y=0;y<grow;y++){
        for(var x=0;x<gcoll;x++){
            var cell = document.createElement('div');
            cell.style.width = (swidth-2)+'px';
            cell.style.height = (sheight-2)+'px';
            cell.dataset.pos =
                (-swidth*x)+"px "
                + (-sheight*y)+"px";
            cell.style
                .backgroundPosition = 
                (-swidth*x)+"px "
                + (-sheight*y)+"px";
            //cell.backgroundImage.width = gwidth;
            cell.style.backgroundSize = 
                gwidth+"px "+gheight+"px";
            //cell.innerHTML = y+' '+x;
            cell.addEventListener('click', cellclick);
            root.appendChild(cell);
            //all_vars.push(cell.dataset.pos);
            all_vars.push(x+y*gcoll);
        }
        
    }
    root.style.maxWidth = (swidth*gcoll)+"px";
    console.log('ok '+ gwidth +" "+ gheight );
    //sleep(1000);
    randomCell(root);
    console.log('done');
}
function cellclick(e){
    var current = e.target.style.backgroundPosition;
    if(
        //!e.target.style.border
        //&&
        !selected
    ){
        e.target.style.border = "solid 1px red";
        selected = e.target;
    }else{
        e.target.style.backgroundPosition = selected.style.backgroundPosition;
        selected.style.backgroundPosition = current;
        //e.target.style.border = '';
        selected.style.border = '';
        //console.log(selected.dataset.pos);
	sortColor(selected, e.target);
        selected = '';
    }
    if(checkWin()){
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      sleep(100).then(() => {
	//// code
	alert("HURRAY!!!");
	init();
      });
    }

}

function sortColor(selected, target){
    if(selected.dataset.pos == selected.style.backgroundPosition){
    	selected.style.border = 'solid 1px white';
    }
    else{
    	selected.style.border = '';
    }
    if(target.dataset.pos == target.style.backgroundPosition){
    	target.style.border = 'solid 1px white';
    }
    else{
     	target.style.border = '';
    }
}
function randomCell(root){
    var all = root.children;
    //console.log(all.length);
    //for(var i=1;i< all.length;i++){
    while(all_vars.length > 0){
        var index = Math.floor(
            Math.random() * (all_vars.length-1)
        );
        var temp = 
        all[all_vars[index]]
            .style
            .backgroundPosition
        ;

        all[all_vars[index]]
            .style
            .backgroundPosition
        = all[all_vars[(all_vars.length-1)]]
            .style
            .backgroundPosition
        ;

        all[all_vars[(all_vars.length-1)]]
            .style
            .backgroundPosition
        = temp;
        console.log(index,temp,(all_vars.length-1), all_vars);
	sortColor(
            all[all_vars[index]], 
            all[all_vars[(all_vars.length-1)]]
	);
        all_vars.splice(index,1);
        all_vars.splice((all_vars.length-1),1);
        //console.log(JSON.stringify(all_vars));
    }
}

function checkWin(){
    var all = root.children;
    for(var i=0;i < all.length;i++){
      var selected = all[i];
      if(selected.dataset.pos !== selected.style.backgroundPosition){
	return false;
      }
    }
    return true;
}
