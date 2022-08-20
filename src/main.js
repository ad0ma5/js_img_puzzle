
window.addEventListener('load', initSelectxy);
window.addEventListener('load', init);
var root;
var gcoll = 6, grow = 5, ref_img_id='ref_img';
var gwidth, gheight,
    swidth, sheight,
    ref_img, bgImgArr,
    selected, moves, time, timeInterval, paused;
var all_vars = [];

function startTime(){
    if(timeInterval)
      clearTimeout(timeInterval);
    timeInterval = setInterval(updateTime, 1000);
}
function stopTime(){
    if(timeInterval)
      clearTimeout(timeInterval);
}
function updateTime(){
    time++;
    setHTML('time',time);
}
function pauseTime(){
    if(paused){
      paused = false;
      setHTML('pause','pause');
      startTime();
      showBoard();
    }else{
      paused = true;
      setHTML('pause','play');
      stopTime();
      hideBoard();
    }

}
function showBoard(){
    root = document.getElementById("js_img_puzzle");
    root.style.display = '';
}
function hideBoard(){
    root = document.getElementById("js_img_puzzle");
    root.style.display = 'none';
}
function init(){
    moves = 0;
    time = 0;
    paused = false;
    document.getElementById('pause').style.display='';
    setHTML("moves", moves);
    setHTML('time',time);
    root = document.getElementById("js_img_puzzle");
    ref_img = document.getElementById(ref_img_id);
    bgImgArr = document.querySelectorAll("img");
    //console.log(bgImgArr);
    for(var img_id =0;img_id < bgImgArr.length;img_id++){
        //console.log(bgImgArr[img_id].src);
        bgImgArr[img_id]
            .addEventListener('click',selectImg);
    }
    var selectx = document.getElementById("selectx");
    var selecty = document.getElementById("selecty");
    if(selectx.value > 0){
        gcoll = selectx.value;
    }
    if(selecty.value > 0){
        grow = selecty.value;
    }
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
    startTime();
    console.log('done');
}

function cellclick(e){
    if(ifWin()) return;
    var current = e.target.style.backgroundPosition;
    if(
        //!e.target.style.border
        //&&
        !selected
    ){
        e.target.style.border = "solid 1px red";
        e.target.style.filter = "invert()";
        selected = e.target;
    }else{
        e.target.style.backgroundPosition = selected.style.backgroundPosition;
        selected.style.backgroundPosition = current;
        //e.target.style.border = '';
        selected.style.border = '';
        //console.log(selected.dataset.pos);
    	sortColor(selected);
    	sortColor(e.target);
        selected = '';
        moves++;
        setHTML("moves", moves);
    }

    if(ifWin()) return;
}

function sortColor(target){
    if(target.dataset.pos == target.style.backgroundPosition){
    	target.style.border = 'solid 1px white';
        target.style.filter = "none";
    }
    else{
     	target.style.border = '';
        target.style.filter = "";
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
        //console.log(index,temp,(all_vars.length-1), all_vars);
        sortColor(
                all[all_vars[index]] 
        );
        sortColor(
                all[all_vars[(all_vars.length-1)]]
        );
        all_vars.splice(index,1);
        all_vars.splice((all_vars.length-1),1);
        //console.log(JSON.stringify(all_vars));
    }
}
function ifWin(){
    if(checkWin()){
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      sleep(100).then(() => {
	//// code
    document.getElementById("pause").style.display='none';
    stopTime();
	alert("HURRAY!!!");
	//init();
      });
      return true;
    }
  return false;
}
function checkWin(){
    var all = root.children;
    for(var i=0;i < all.length;i++){
      var selected = all[i];
      if(
          selected.dataset.pos 
          !== 
          selected.style.backgroundPosition
      ){
	    return false;
      }
    }
    return true;
}

function selectImg(e){
    //console.log(e.target);
    var dstyle = document.getElementById("dynamic_style");
    dstyle.innerHTML = `
    #js_img_puzzle div{
      background-image: url(`+e.target.src+`);
    }
    `;
    ref_img_id = e.target.id;
    init();
}

function initSelectxy(){
    var selectx = document.getElementById("selectx");
    var selecty = document.getElementById("selecty");
    var go = document.getElementById("go");
    var pause = document.getElementById("pause");
    for(var x = 0;x < 15; x++){
        var opt = document.createElement('option');
        opt.innerHTML = x;
        opt.value = x;
        selectx.appendChild(opt);
    }
    for(var y = 0;y < 15; y++){
        var opt = document.createElement('option');
        opt.innerHTML = y;
        opt.value = y;
        selecty.appendChild(opt);
    }
    go.addEventListener('click', init);
    pause.addEventListener('click', pauseTime);
}
 function setHTML(id, txt){
    var el = document.getElementById(id);
    el.innerHTML=txt;

 }
