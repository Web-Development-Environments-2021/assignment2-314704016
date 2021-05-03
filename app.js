var context;
var shape = new Object();
var monster = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
var interval3;
var recent = null ;
var rejection = 5 ;
var monsters_counter = 1 ;
var monsters 
var dir = 0 //direction
var t = 0 
var stack  ;
var explored  ;
var solution ;
var arr
var index = 0
var dynamic_p = null;
var eat = false
var balls 
var time
var food_remain = 50;
var get_health = false
var get_clock = false
var neighbor
var random
var eaten = 0


$(document).ready(function() {
	context = canvas.getContext("2d");
});

function Start() {
	Get_input_values();
	if(!ok){
		return;
	}
	clean_the_screan();
	show_setting();
	create_the_board();
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(update, 200)
}

var ok = true
function Get_input_values(){
	food_remain = document.getElementById("balls").value
	if(food_remain<50 || food_remain>90){
		window.alert("the food must be between 50 and 90 (including)")
		ok =false
	}
	time = document.getElementById("time").value
	if(time<60){
		window.alert("the time must be greater than 59 secound")
		ok=false
	}
	monsters_counter = document.getElementById("monsters").value
	if(monsters_counter < 1 && monsters_counter>4){
		window.alert("the number of monsters must be between 1 and 4 (including)")
		ok=false
	}
}

function clean_the_screan(){
	document.getElementsByTagName('body')[0].style.background = "#ffffff ";
	document.getElementById("game").style.display = 'inline' ;//show the canvas
	document.getElementById("Time").style.display = 'inline';//show the time
	document.getElementById("score").style.display = 'inline';//show the score
	document.getElementById("hl").style.display = 'block'
	var x = document.getElementsByClassName("font"); //remove the settings
	for (i in x){
		if(i<9){
			x[i].style.display='none' ;
		}
		else{
			break
		}	
	}
	var t = document.getElementsByClassName("input"); //remove the input fields
	for (i in t){
		if(i<8){
			t[i].style.display='none' ;
		}	
		else
		{
			break
		}
	}
	var buttons = document.getElementsByClassName("button"); //remove the buttons
	for ( j in buttons){
		if(j<2){
			buttons[j].style.display='none' ;
		}	
		else
		{
			break
		}
	}
}

function show_setting(){
	document.getElementById("game setting").style.display ="inline"
	document.getElementById("U").style.display ="inline-block"
	document.getElementById("D").style.display ="inline-block"
	document.getElementById("R").style.display ="inline-block"
	document.getElementById("L").style.display ="inline-block"
	document.getElementById("B").style.display ="inline-block"
	document.getElementById("T").style.display ="inline-block"
	document.getElementById("M").style.display ="inline-block"
	document.getElementById("hl").style.display ="inline-block"

	document.getElementById("U").innerHTML = "Press " + document.getElementById("up").value + " to go up |"
	document.getElementById("D").innerHTML = "Press " + document.getElementById("down").value + " to go down |"
	document.getElementById("R").innerHTML = "Press " + document.getElementById("right").value + " to go right |"
	document.getElementById("L").innerHTML = "Press " + document.getElementById("left").value + " to go left |"
	document.getElementById("B").innerHTML = "Number of balls : " + document.getElementById("balls").value + " |"
	document.getElementById("T").innerHTML = "Time : " + time+ " |"
	document.getElementById("M").innerHTML = "Number of monsters :" + document.getElementById("monsters").value	
	document.getElementById("hl").innerHTML = "Remained "+rejection + " attempts"
}

function create_the_board(){
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var pacman_remain = 1;
	start_time = new Date();
	//monsters[0] = monster ;
	monsters = new Array()
	for (var i = 0; i < 15; i++) {
		board[i] = new Array();
		for (var j = 0; j < 15; j++) {
			 if( monsters_counter >0 && ( i==2 && j==1 || i==1 && j==13 || i==13 && j==1 || i==12 && j==12 ) ){//monster
				var obj = new Object()
				obj.i = 40*i;
				obj.j = 40*j ;
				obj.index=0
				monsters.push(obj)
				board[i][j] = 5 
				monsters_counter-=1
				console.log(i,j)
			}
			else if (
				(i == 0 && j == 0) ||(i == 0 && j == 3) ||
				(i == 1 && j == 2) ||(i == 1 && j == 5) ||(i == 1 && j == 6) ||(i == 1 && j == 11)||
				(i == 2 && j == 3) ||(i == 2 && j == 5) ||(i == 2 && j == 10) ||(i == 2 && j == 11) ||
				(i == 3 && j == 3) ||(i == 3 && j == 6) ||(i == 3 && j == 7) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||(i == 5 && j == 3) ||(i == 5 && j == 9) ||(i == 5 && j == 11) ||
				(i == 6 && j == 3) ||(i == 6 && j == 4) ||(i == 6 && j == 9) ||
				(i == 8 && j == 6) ||(i == 8 && j == 7) ||(i == 8 && j == 8) ||(i == 8 && j == 11) ||
				(i == 7 && j == 1) ||(i == 7 && j == 8) ||(i == 7 && j == 9) ||
				(i == 9 && j == 9) ||(i == 9 && j == 5) ||(i == 9 && j == 6) ||
				(i == 10 && j == 3)||(i == 9 && j == 5) ||(i == 9 && j == 13) ||
				(i == 11 && j == 3) || (i == 11 && j == 4) ||(i == 11 && j == 10) || (i == 11 && j == 11) ||(i == 11 && j == 7) || 
				(i == 12 && j == 3) ||(i == 12 && j == 7) ||
				(i == 13 && j == 13) ||(i == 13 && j == 12) ||(i == 13 && j == 11) ||(i == 13 && j == 5) ||
				(i==0)||(j==0)||(i==14)||(j==14)
			) {
				board[i][j] = 4; //obstacle
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1; //Food
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2; //Pacman
				} 
			
				else{
						board[i][j] = 0; //Empty
					}
				
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	var health = findRandomEmptyCell(board) 
	board[health[0]][health[1]] = 6 // health
	var time_plus = findRandomEmptyCell(board)
	board[time_plus[0]][time_plus[1]] = 7 //add time

}
function update (){
	UpdatePosition_Pac();
	update_dynamic_point();
	for( i in monsters)
	{
		UpdatePosition_Monster(monsters[i]);
	}
	Drow(dir);
	for( i in monsters)
	{
		Drow_monster_point(monsters[i]);
	}
	show_setting();
}

function UpdatePosition_Pac() {
	board[shape.i][shape.j] = 0; //convert location of pacman to be 0 
	t = GetKeyPressed();
	if (t == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (t == 2) {
		if (shape.j < 13 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (t == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (t == 4) {
		if (shape.i < 13 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
		eaten++;
	}
	if(board[shape.i][shape.j] ==6){
		rejection += 2 
		get_health = true
	}
	var currentTime = new Date();
	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if(board[shape.i][shape.j] ==7){
		time = parseInt(time) + 20 
		get_clock = true
		console.log(time)
	}
	board[shape.i][shape.j] = 2;
	if(lblTime.value == time){
		window.clearInterval(interval);
		if(score<100){		
			var str = " You arr better than " + score + " points!" 
		}
		else{
			var str = " Winner!!!"
		}
		window.alert(str);
		Play_again()
	}
	if(rejection==0){
		window.clearInterval(interval);
		window.alert("LOSER!");
		Play_again()
	}
	
	else {
		 if(recent == null){
			recent = 1 ;
			Drow(0);
		}
		else if (t==1 || t==2 || t==3 || t==4 ){
			Drow(t);
		}
		else{
			//stay_on_location[i,j] - n key pressed
		}
		
	}
}
function Play_again(){
	document.getElementById("game").style.display='none'
	document.getElementById("game setting").style.display='none'
	document.getElementById("playagain").style.display = 'block'
	document.getElementsByTagName('body')[0].style.background = "#ffffff url('background.png')";
	document.getElementById("game").style.display = 'none' ;//show the canvas
	document.getElementById("Time").style.display = 'none';//show the time
	document.getElementById("score").style.display = 'none';//show the score
	document.getElementById("hl").style.display = 'none'
	//document.getElementById("remain").style.display = 'none'
	document.getElementById("U").style.display = 'none'
	document.getElementById("U").style.display ='none'
	document.getElementById("D").style.display ='none'
	document.getElementById("R").style.display ='none'
	document.getElementById("L").style.display ='none'
	document.getElementById("B").style.display ='none'
	document.getElementById("T").style.display ='none'
	document.getElementById("M").style.display ='none'
	document.getElementById("hl").style.display ='none'

}

function setting(){
	document.getElementById("playagain").style.display = 'none'
	var x = document.getElementsByClassName("font"); //show the settings
	for (i in x){
		if(i<9){
			x[i].style.display='block' ;
		}
		else{
			break
		}	
	}
	var t = document.getElementsByClassName("block"); //show the input fields
	console.log(t)
	for (i in t){
		if(i<8){
			console.log(t)
			t[i].style.display='block' ;
		}	
		else
		{
			break
		}
	}
	var buttons = document.getElementsByClassName("button"); //show the buttons
	for ( j in buttons){
		if(j<2){
			buttons[j].style.display='block' ;
		}	
		else
		{
			break
		}
	}
}
function UpdatePosition_Monster( M){
	if(Math.abs(M.i/40 - shape.i)<1 && Math.abs(M.j/40 - shape.j)<1){//rejection between the pacman and the monster
		score = Math.max(0,score-10)
		M.i = 40 ;
		M.j = 40 ;
		M.index = 0
		rejection-=1
	}
	else if( (M.i % 40 == 0 && M.j % 40 == 0 && M.index==0  )  ){ // the packman moved
		context.clearRect(M.i , M.j , 40, 40)
		M.arr = DFS(M,shape); 
		M.x = M.arr[M.index].i
		M.y = M.arr[M.index].j
		var x = M.x
		var y = M.y
		if(  40*x - M.i > 0 && 40*y ==M.j ){
				M.i+=10
			}
		else if( 40*x - M.i < 0 && 40*y ==M.j ){
				M.i-=10
			}
		else if( 40*x - M.i == 0 && 40*y < M.j ){
				M.j-=10
			}
		else if( 40*x - M.i == 0 && 40*y > M.j ){
				M.j+=10
			}
		M.index++
		
	}
	else if(M.i % 40 == 0 && M.j % 40 == 0 && M.index < M.arr.length){ // move to cell
		context.clearRect(M.i , M.j , 40, 40)
		M.x = M.arr[M.index].i
		M.y = M.arr[M.index].j
		var x=M.x
		var y=M.y
		if(  40*x - M.i > 0 && 40*y ==M.j ){
				M.i+=10
			}
		else if( 40*x - M.i < 0 && 40*y ==M.j ){
				M.i-=10
			}
		else if( 40*x - M.i == 0 && 40*y < M.j ){
				M.j-=10
			}
		else if( 40*x - M.i == 0 && 40*y > M.j ){
				M.j+=10
			}
		M.index++
		
	}
	else{ // move to cell
		var x=M.x
		var y=M.y
		if(  40*x - M.i > 0 && 40*y ==M.j ){
			M.i+=10
		}
		else if( 40*x - M.i < 0 && 40*y ==M.j ){
			M.i-=10
		}
		else if( 40*x - M.i == 0 && 40*y < M.j ){
			M.j-=10
		}
		else if( 40*x - M.i == 0 && 40*y > M.j ){
			M.j+=10
		}
		
	}
	if( M.arr.length == M.index ){
		M.index=0
	}
	
}
function update_dynamic_point(){ //update
	if(!eat)
	{
		if(dynamic_p==null)
		{
			dynamic_p = new Object();
			dynamic_p.i = 4 ;
			dynamic_p.j = 5 ;
		}
		else
		{
			if(dynamic_p.i == shape.i && dynamic_p.j == shape.j ){
				eat = true
				score+=50
				lblScore.value = score
			}
			else{
				neighbor = neighbors(dynamic_p)
				random = Math.floor((Math.random() * neighbor.length) + 1);
				dynamic_p.i = neighbor[random-1].i
				dynamic_p.j = neighbor[random-1].j	
			}
		}
	}

}
function Drow(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			var center = new Object();
			center.x = i * 40 + 22.5;
			center.y = j * 40 + 22.5;
			if (board[i][j] == 2) {
				context.beginPath();
				if(x==1){
					context.arc(center.x, center.y, 15, 1.70 * Math.PI, 1.40 * Math.PI); // half circle up
					dir=1
				}
				if(x==2){
					context.arc(center.x, center.y, 15, 0.60 * Math.PI, 0.25 * Math.PI); // half circle down
					dir=2
				}
				if(x==3){
					context.arc(center.x, center.y, 15, 1.15* Math.PI, 0.85 * Math.PI); // half circle left
					dir=3
				}
				if(x==4 || x==0){
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle right
					dir=4
				}
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();

				context.beginPath();
				if(x==1){
					context.arc(center.x + 5, center.y + 5 , 2.5, 0, 2 * Math.PI); // circle - eye of pacman
				}
				if(x==2){
					context.arc(center.x + 5, center.y - 5, 2.5, 0, 2 * Math.PI); // circle - eye of pacman
				}
				if(x==3){
					context.arc(center.x , center.y - 7, 2.5, 0, 2 * Math.PI); // circle - eye of pacman
				}
				if(x==4 || x==0){
					context.arc(center.x , center.y -7 , 2.5, 0, 2 * Math.PI); // circle - eye of pacman
				}
				context.fillStyle = "black"; //color
				context.fill();

			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle -foord
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 22.5, center.y - 22.5, 40, 40); //rectangle - obstacle
				context.fillStyle = "grey"; //color
				context.fill();

			}
			else if (board[i][j] == 6 && !get_health){
				var health = new Object()
				health.i = i 
				health.j = j
				var img = new Image();
				img.src='./health.png';
				context.drawImage(img,40*i,40*j,40,40);
			}
			else if (board[i][j] == 7 && !get_clock){
				var clock = new Object()
				clock.i = i 
				clock.j = j
				var img = new Image();
				img.src='./clock.png';
				context.drawImage(img,40*i,40*j,40,40);
			}
		}
	}	
}

function Drow_monster_point(M){
	var img = new Image();
	img.src='./monster.png';
	context.drawImage(img,M.i,M.j,40,40);
			
	
	if(!eat){
		context.beginPath();
		context.fillStyle = 'rgba(2, 250, 72, 1)';
		context.fillRect( dynamic_p.i*40, dynamic_p.j*40, 40, 40);
	}
}

function legal_point(i,j){ //check if (i,j) is a correct point
	if( 0 <=i && i <15 && 0<=j  && j<15){
		return true;
	}
	else{
		return false;
	}
}

function neighbors( node ){ //return neighbors of node
	var x = node.i ;
	var y = node.j;
	let arr = [];
	if(legal_point(x+1,y)){
		if(board[x+1][y]!=4){
			var n = new Object();
			n.i=x+1
			n.j=y
			arr.push(n)
		}
	}
	if(legal_point(x-1,y)){
		if(board[x-1][y]!=4){
			var n = new Object();
			n.i=x-1
			n.j=y
			arr.push(n)
		}
	}
	if(legal_point(x,y+1)){
		if(board[x][y+1]!=4){
			var n = new Object();
			n.i=x
			n.j=y+1
			arr.push(n)
		}
	}
	if(legal_point(x,y-1)){
		if(board[x][y-1]!=4){
			var n = new Object();
			n.i=x
			n.j=y-1
			arr.push(n)
		}
	}	
	return arr 
}


function DFS (start , end ){ //return path from start to end 
	stack = new Stack() ;
 	explored = new Set() ;
 	solution = new Stack();
	 var st = new Object();
	 var en = new Object();
	 st.i = start.i/40
	 st.j = start.j/40
	 en.i = end.i%40
	 en.j = end.j%40
	st.from = null 
	stack.push(st)
	while(!stack.isEmpty()){
		var node = stack.pop()
		var bool = false
		explored.forEach((value) => {
			if(value.i == node.i && value.j == node.j) {
				bool=true
				 }
				}
				);

		if(node.i==en.i && node.j == en.j){//find the goal
			break;
		}
		if(!bool){
			explored.add(node);
		}
		var list = neighbors(node)
		for(i in list){
			bool=false
			explored.forEach((value) => {
				if(value.i == list[i].i && value.j == list[i].j) {
						bool=true } });
				if(!bool){
					list[i].from = node
					stack.push(list[i])
				}
		}
	}
	if(!stack.isEmpty()){
		while(node.from !=null){
			solution.push(node)
			node=node.from
		}
	}
	var arr = new Array()
	while(!solution.isEmpty()){
		 arr.push(solution.pop())
	}
	return arr
}

function findRandomEmptyCell(board) { //find empty cell
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() { //get the key pressed
	if (keysDown[up]) {//up
		return 1;
	}
	if (keysDown[down]) {//down
		return 2;
	}
	if (keysDown[left]) {//left
		return 3;
	}
	if (keysDown[right]) {//right
		return 4;
	}
	return 0
}
class Stack {
    constructor()
    {
        this.items = [];
    }
	push(element)
	{
    this.items.push(element);
	}
	printStack()
	{
    var str = "";
    for (var i = 0; i < this.items.length; i++)
        str += "(" + this.items[i].i + " " +this.items[i].j +")";
	}
	pop()
	{
    if (this.items.length == 0)
        return "Underflow";
    return this.items.pop();
	}
	isEmpty()
	{
    return this.items.length == 0;
	}

}
function myFunction(){
	document.getElementById("up").value ="ArrowUp"
	document.getElementById("down").value ="ArrowDown"
	document.getElementById("right").value ="ArrowRight"
	document.getElementById("left").value ="ArrowLeft"
	document.getElementById("balls").value ="50"
	document.getElementById("time").value = "60"
	document.getElementById("monsters").value = "1"
	balls = 50
	time = 60
	monsters = 1
}
