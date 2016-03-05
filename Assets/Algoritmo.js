#pragma strict


// Create
@HideInInspector
var risultato:int[];
@HideInInspector
var range:int;
@HideInInspector
var base:int;
@HideInInspector
var operazione:int;
var rangeBaseStandard:int=7;
var riprova:boolean;

// Somma,Molt,Inv
@HideInInspector
var valore:int;
@HideInInspector
var valore2:int;
var array:int[];
var array_temp:int[];
var array1:int[];
var array2:int[];
var array_supp:int[];

// Start,Update
@HideInInspector
var nuovaDom:boolean=false;
@HideInInspector
var quantita:int;

// PrintArray
@HideInInspector
var temp:int;
@HideInInspector
var numeri:String[];

// Casuale
@HideInInspector
var random:int;

//Generici
@HideInInspector
var i:int;

// GUI
@HideInInspector
var textFieldString : String = "";
@HideInInspector
var style:GUIStyle;
@HideInInspector
var style2:GUIStyle;
@HideInInspector
var val:int;
@HideInInspector
var max:int;
var fontsize:int=40;
@HideInInspector
var vari:int;
@HideInInspector
var guiStyle:GUIStyle;
var space:double;
var height:double;
var height2:double;
var keyboard:TouchScreenKeyboard;


var str:String;
var tipoTast:String;
var semaforo:boolean;


function Start () {
	if(PlayerPrefs.GetInt("Difficolta") <= 1){
		PlayerPrefs.SetInt("Num",5);
		PlayerPrefs.SetInt("Score",0);
		PlayerPrefs.SetInt("Vite",5);
		PlayerPrefs.SetInt("Difficolta",1);
	}
	quantita=7;
	nuovaDom=false;
	PrintArray(Create(PlayerPrefs.GetInt("Difficolta"),quantita));
	semaforo=false;
	tipoTast="tastiera numerica";
	PlayerPrefs.SetInt("tastiera",1);


}


function Update(){
	if(nuovaDom){
		PrintArray(Create(PlayerPrefs.GetInt("Difficolta"),quantita));
		textFieldString="";
		nuovaDom=false;

	}	
	
	if(keyboard){
		textFieldString = keyboard.text;
	}
	
	if(semaforo){
		
		if (keyboard.wasCanceled){
			PlayerPrefs.SetInt("Score",PlayerPrefs.GetInt("Score")+1);
		}
		
		if (keyboard.done){
			keyboard.text="";
			// Risposta Esatta
			if((textFieldString.Equals(""+PlayerPrefs.GetInt("Solution")))){
				PlayerPrefs.SetInt("Score",PlayerPrefs.GetInt("Score")+PlayerPrefs.GetInt("Difficolta")/5+1);
				PlayerPrefs.SetInt("Difficolta",PlayerPrefs.GetInt("Difficolta")+1);
				nuovaDom=true;
				textFieldString="";
				
			// Risposta sbagliata
			}else{
				if(textFieldString.Equals("")){}else{
					PlayerPrefs.SetInt("Vite",PlayerPrefs.GetInt("Vite")-1);
					textFieldString="";
				}
			}
			semaforo=false;
		}
		
	}
	
	
	
}


function PrintArray(array:int[]) {
		temp=Random.Range(0,5);		//mettere al posto di 5 il minimo di visualizzazione
		PlayerPrefs.SetInt("Solution", risultato[temp]);
		// Array con i numeri e uno nascosto
		numeri = new String[array.Length];
		for(i=0;i<array.Length;i++){
			if(temp==i){
				numeri[i]="???";
			}else{
				numeri[i]=""+array[i];
			}
		}
						
}


function CasualePerSomm (min:int, max:int):int{
	random=0;
	while(random==0){
		random = Random.Range(min,max+1);
	}
	return random;
}

function CasualePerMolt (min:int, max:int):int{
	random=0;
	while((random==1)||(random==-1)||(random==0)){
		random = Random.Range(min,max+1);
	}
	return random;
}


function Somma(dimensione:int,base:int,range:int):int[]{
	array_temp = new int[dimensione];							
	valore = CasualePerSomm(-range,range);
	array_temp[0]=base;
	for(i=1;i<dimensione;i++){
		array_temp[i]=array_temp[i-1]+valore;
	}
	return array_temp;
}

function Molt(dimensione:int,base:int,range:int):int[]{
	array_temp = new int[dimensione];		
	valore = CasualePerMolt(-range,range);
	array_temp[0]=base;
	for(i=1;i<dimensione;i++){
		array_temp[i]=array_temp[i-1]*valore;
	}
	return array_temp;
}


// sommo alla base un valore che viene sommato ad un altro fisso
function SommaIncr(dimensione:int,base:int,range:int):int[]{
	array_temp = new int[dimensione];		
	valore = CasualePerSomm(-range,range);
	valore2 = CasualePerSomm(-range,range);
	array_temp[0]=base+valore;
	for(i=1;i<dimensione;i++){
		valore+=valore2;
		array_temp[i]=array_temp[i-1]+valore;
	}
	return array_temp;
}

// sommo alla base un valore che viene moltiplicato per un altro fisso
function SommaEsp(dimensione:int,base:int,range:int):int[]{
	array_temp = new int[dimensione];		
	valore = CasualePerMolt(-range,range);
	valore2 = CasualePerMolt(-range,range);
	array_temp[0]=base+valore;
	for(i=1;i<dimensione;i++){
		valore*=valore2;
		array_temp[i]=array_temp[i-1]+valore;
	}
	return array_temp;
}

/*
// moltiplico alla base un valore, quindi alla base viene sommato ad un altro fisso
function MoltLin(dimensione:int,range:int):int[]{
	array = new int[dimensione];	
	
	//array molt
	valore = Random.Range(2,range+1);
	if (Random.Range(0,2)==0){					
		valore=-valore;
	}
		
	base = CasualePerMolt(-range,range);
	array[0]=base;
	for(i=1;i<dimensione;i++){
		array[i]=array[i-1]*valore;
	}
	
			
	valore = valore - Random.Range(1,valore);
	
	if (Random.Range(0,2)==0){					
		valore=-valore;
	}
	
	for(i=0;i<dimensione;i++){
		array[i]+=valore;
	}
	
	return array;
}
*/
var array_mul:int[];

function Doppio(dimensione:int,range:int):int[]{
	array_mul = new int[dimensione];	
	array_supp = new int[dimensione];	
	
	array_mul = Molt(dimensione,CasualePerMolt(-range,range),range);
	array_supp = SommaIncr(dimensione, CasualePerSomm(-range/2,range/2),range/2);


	for(i=0;i<dimensione;i++){
		array_mul[i]+=array_supp[i];
	}
	
	return array_mul;
}



function StampaArray(nome:String,array:int[]){
	str=nome+": ";
	for(i=0;i<array.Length;i++){
		str += " "+array[i];
	}
	print(str);
}


function InvertiForse(array:int[]):int[]{
	if (Random.Range(0,2)==0){					
		System.Array.Reverse(array);
	}
	return array;
}

function Inverti(array:int[]):int[]{
		System.Array.Reverse(array);
	return array;
}


// DIFFICOLTA'
// 1-4		+*
// 5-9		+*-/
// 10-*		+-&*/ o */&+-

function Create(difficolta:int, numeroRisultati:int) :int[] {
	risultato = new int[numeroRisultati];							
	range = rangeBaseStandard;//Mathf.RoundToInt(rangeBaseStandard+difficolta+0.0f/rangeBaseStandard);
	riprova=true;
	operazione = Random.Range(0,2);							

	while(riprova){		
		base = CasualePerSomm(-range,range);					


		if(difficolta<=4){
    		risultato=Somma(numeroRisultati,base,range);   
		}
				
		if((difficolta>4)&&(difficolta<=8)){
    		risultato=Molt(numeroRisultati,base,range);   
		}			
			

		if((difficolta>8)&&(difficolta<=10)){
			switch (operazione){
	    	case 0:		
	    		risultato=Somma(numeroRisultati,base,range);   
	    	   break;
	    	case 1:		
			  	risultato=Molt(numeroRisultati,base,range);   
	    	    break;
			}
			risultato=Inverti(risultato);
		}
		
		

		if((difficolta>10)&&(difficolta<=14)){
    		risultato=SommaIncr(numeroRisultati,base,range); 
		}

		if((difficolta>14)&&(difficolta<=18)){
    		risultato=SommaEsp(numeroRisultati,base,range); 
		}
	
		if((difficolta>18)&&(difficolta<=20)){
			switch (operazione){
			case 0:		
			    risultato=SommaIncr(numeroRisultati,base,range);   
		    	break;
		    case 1:		
		    	risultato=SommaEsp(numeroRisultati,base,range);   
		        break;
			}
			risultato=Inverti(risultato);
		}
	
		
		

		// quasi impossibile!
		if(difficolta>20){
		  	risultato=Doppio(numeroRisultati,range);   
		    //risultato=Somma(numeroRisultati,base,range);   

		}			
		
		
		riprova=false;
		for(i=0;i<risultato.Length;i++){
			if(Mathf.Abs(risultato[i])>9999){
				riprova=true;
			}
		}
	}
		
	return risultato;
}




function OnGUI () {
 

	GUI.skin.textField.alignment = TextAnchor.MiddleCenter;
	GUI.skin.textField.fontSize = 40;
	
	GUI.skin.button.fontSize=30;
		
	style.fontSize = fontsize;
	style.alignment = TextAnchor.MiddleCenter;
	
	style2.fontSize = 20;
	style2.alignment = TextAnchor.MiddleCenter;

	

	// Score	
	GUI.Box(Rect (0, 0, 75, 25), "Score: "+PlayerPrefs.GetInt("Score"),style2);

	// Testo in alto
	//GUI.Box(Rect (Screen.width/2-75, 0, 150, 25), "Indovina il numero!",style2);
	
	// Livello
	GUI.Box(Rect (Screen.width/2-50, 0, 100, 25), "Livello "+PlayerPrefs.GetInt("Difficolta"),style2);

	
	
////////////////////////////////

	// Livello
	GUI.Box(Rect (Screen.width/9-20, Screen.height*0.15-25, 80, 25), "Livello: "+PlayerPrefs.GetInt("Difficolta"),style2);	
	// -
	if (GUI.Button (Rect (Screen.width/9-30, Screen.height*0.15, 40, 40), "-")) {
		if(PlayerPrefs.GetInt("Difficolta")>1){
			PlayerPrefs.SetInt("Difficolta",PlayerPrefs.GetInt("Difficolta")-1);
			nuovaDom=true;
		}
	}
	// +
	if (GUI.Button (Rect (Screen.width/9+30, Screen.height*0.15, 40, 40), "+")) {
			PlayerPrefs.SetInt("Difficolta",PlayerPrefs.GetInt("Difficolta")+1);
			nuovaDom=true;
	}
	
	/*
	// Range
	GUI.Box(Rect (Screen.width/3-20, Screen.height*0.15-25, 80, 25), "Range: "+rangeBaseStandard,style2);	
	// -
	if (GUI.Button (Rect (Screen.width/3-30, Screen.height*0.15, 40, 40), "-")) {
		if(rangeBaseStandard>1){
			rangeBaseStandard--;
		}
	}
	// +
	if (GUI.Button (Rect (Screen.width/3+30, Screen.height*0.15, 40, 40), "+")) {
		rangeBaseStandard++;
	}
	

	// MaxAiuti
	GUI.Box(Rect (Screen.width-Screen.width/3-80, Screen.height*0.15-25, 80, 25), "MaxAiuti: "+quantita,style2);	
	// -
	if (GUI.Button (Rect (Screen.width-Screen.width/3-90, Screen.height*0.15, 40, 40), "-")) {
		if(quantita>1){
			quantita--;
		}
	}
	// +
	if (GUI.Button (Rect (Screen.width-Screen.width/3-30, Screen.height*0.15, 40, 40), "+")) {
		quantita++;
	}
	*/
	
// Aiuti
	GUI.Box(Rect (Screen.width-Screen.width/9-80, Screen.height*0.15-25, 80, 25), "Aiuti: "+PlayerPrefs.GetInt("Num"),style2);	
	// -
	if (GUI.Button (Rect (Screen.width-Screen.width/9-90, Screen.height*0.15, 40, 40), "-")) {
		if(PlayerPrefs.GetInt("Num")>5){
			PlayerPrefs.SetInt("Num",PlayerPrefs.GetInt("Num")-1);
			//fontsize+=5;
		}
	}
	// +
	if (GUI.Button (Rect (Screen.width-Screen.width/9-30, Screen.height*0.15, 40, 40), "+")) {
		if(PlayerPrefs.GetInt("Num")<numeri.Length){
			PlayerPrefs.SetInt("Num",PlayerPrefs.GetInt("Num")+1);
			//fontsize-=5;
		}
	}	
	
///////////////////////////////////////
	
	
	
	
	
	
	
	
	

	// Vite
	GUI.Box(Rect (Screen.width-75, 0, 75, 25), "Vite: "+PlayerPrefs.GetInt("Vite"),style2);
	
	
	
	// Numeri!!!!!!
	val=130;
	max=PlayerPrefs.GetInt("Num");
	space=(Screen.width-(max*val))/(max-1);

	if(space<=0){
	
		space=(Screen.width-((max/2)*val))/((max/2)-1);
		height=Screen.height/3;
		if(space>0){
			for(i=0;i<max/2;i++){
				space=(Screen.width-((max/2)*val))/((max/2)+1);
				GUI.Box(Rect (space+(i*(space+val)), height, val, 30), numeri[i],style);
			}
		}else{
			for(i=0;i<max/2;i++){
				GUI.Box(Rect (i*(space+val), height, val, 30), numeri[i],style);
			}		
		}
		space=(Screen.width-((max-(max/2))*val))/((max-(max/2))-1);
		height2=Screen.height/3+50;
		for(i=(max/2);i<max;i++){
			GUI.Box(Rect (((i-((max/2))))*(space+val), height2, val, 30), numeri[i],style);
		}
			
	}else{
		
		height=Screen.height/3+25;
		for(i=0;i<max;i++){
			GUI.Box(Rect (i*(space+val), height, val, 30), numeri[i],style);
		}
		
	}
	
	// Input
 	//keyboard = TouchScreenKeyboard.Open(textFieldString, TouchScreenKeyboardType.NumbersAndPunctuation);
	//textFieldString = GUI.TextField(Rect (Screen.width/2-100, Screen.height/2+50, 200, 50), textFieldString);
	
	// Rispondi
	if (GUI.Button (Rect (Screen.width/2-100, Screen.height*0.65, 200, 60), "Rispondi")) {
		if(PlayerPrefs.GetInt("tastiera")==1){
			keyboard = TouchScreenKeyboard.Open(textFieldString, TouchScreenKeyboardType.NumbersAndPunctuation);
		}else{
			keyboard = TouchScreenKeyboard.Open(textFieldString);
		}
		semaforo=true;

	}
	

	// Reset
	if (GUI.Button (Rect (Screen.width-100, Screen.height*0.7, 100, 45), "Reset")) {
		PlayerPrefs.SetInt("Score",0);
		PlayerPrefs.SetInt("Vite",5);
		PlayerPrefs.SetInt("Difficolta",1);
		nuovaDom=true;
	}

	// Another
	if (GUI.Button (Rect (0, Screen.height*0.7, 120, 45), "Another")) {
		//momentaneamente disattivato per comodita'
		//PlayerPrefs.SetInt("Vite",PlayerPrefs.GetInt("Vite")-1);
		nuovaDom=true;
	}

	// Tastiera
	if (GUI.Button (Rect (Screen.width/2-120, Screen.height-45, 240, 45), tipoTast)) {
		PlayerPrefs.SetInt("tastiera",-PlayerPrefs.GetInt("tastiera"));
		if(PlayerPrefs.GetInt("tastiera")==1){
			tipoTast="tastiera numerica";
		}else{
			tipoTast="tastiera standard";
		}
	}
																					
	// Soluzione (debug)
	//GUI.Box(Rect (0, Screen.height-20, 45, 20), ""+PlayerPrefs.GetInt("Solution"),style2);
	
	// Versione
	GUI.Box(Rect (Screen.width-60, Screen.height-20, 60, 20), "0.0.7a",style2);


	// morto
	if(PlayerPrefs.GetInt("Vite")==0){
		PlayerPrefs.SetInt("Score",0);
		PlayerPrefs.SetInt("Difficolta",1);		
		PlayerPrefs.SetInt("Vite",5);
		nuovaDom=true;
		textFieldString="";
	}

}







