
window.addEventListener('load', init);
var root;
var gcoll = 4, grow = 4;
var gwidth, gheight,
    swidth, sheight,
    ref_img,
    selected;
var all_vars = [];
function init(){
    root = document.getElementById("js_img_puzzle");
    ref_img = document.getElementById("ref_img");
    //root.innerHTML = 'LOADED';
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
            cell.innerHTML = y+' '+x;
            cell.addEventListener('click', cellclick);
            root.appendChild(cell);
            //all_vars.push(cell.dataset.pos);
            all_vars.push(x+y*gcoll);
        }
    }
    alert('ok '+ gwidth +" "+ gheight );
    //sleep(1000);
    randomCell(root);
    alert('done');
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
        //alert(selected.dataset.pos);
        if(selected.dataset.pos == selected.style.backgroundPosition){
        selected.style.border = 'solid 1px blue';
        }
        else{
        selected.style.border = '';
        }
        if(e.target.dataset.pos == e.target.style.backgroundPosition){
        e.target.style.border = 'solid 1px blue';
        }
        else{
        e.target.style.border = '';
        }
        selected = '';
    }
}

function randomCell(root){
    var all = root.children;
    alert(all.length);
    //for(var i=1;i< all.length;i++){
    while(all_vars.length > 0){
        var index = Math.floor(
            Math.random() * (all_vars.length-1)
        );
        //alert(all_vars.length-1);
        alert(index+' '+(all_vars.length-1));
        alert(all_vars[index]+' '+all_vars[all_vars.length-1]);
        //if (i<all.length)
        /*
        while (
            false
            &&
            index === (all.length-i)
            ||

            all_vars.indexOf(index) !== -1
            //all[index].dataset.pos === all[all.length-i].style.backgroundPosition
            
        )  {

            index = Math.floor(
                Math.random() * (all.length-i)
            );
        }
        */
        //all_vars.sort();
        //alert(i+' '+all_vars[index]+' '+(all.length-i));
        //var tmp = all[index].dataset.pos;
        //alert(tmp);
        //var tmp2 = all[(all.length-i)].dataset.pos;
        //alert(tmp2);
        var temp = 
        all[all_vars[(all_vars.length-1)]]
            .style
            .backgroundPosition
        ;
        all[all_vars[index]]
            .style
            .backgroundPosition
        = all[all_vars[(all_vars.length-1)]]
            .style
            .backgroundPosition
            //..dataset.pos
        ;
        //alert('ddd'+(all.length-i));
        all[all_vars[(all_vars.length-1)]]
            .style
            .backgroundPosition
        = temp;
        /*
            all[all_vars[index]]
            .style
            .backgroundPosition
            //.dataset.pos
        ;
        */
        //alert(i+index+' '+tmp+' '+(all.length-i));
        //alert('iiiddd');
        all_vars.splice(index,1);
        //if(all_vars.indexOf(all.length-1)!==-1)
        all_vars.splice(all_vars.indexOf(all_vars.length-1),1);
        alert(JSON.stringify(all_vars));
    }
}
