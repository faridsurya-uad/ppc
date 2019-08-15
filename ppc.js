// PROGRESSIVE PIE CHART
// farid.suryanto@is.uad.ac.id
// UNIVERSITAS AHMAD DAHLAN YOGYAKARTA
// INDONESIA
function Ppc(obj)
{
	this.draw=function(dat)
	 {
		//set parameter
		var title=dat.title;      
		var padding=20;         
		var data = dat.current;
		var totalData=dat.total;         
		var colors = [ "#EF5350","#BA68C8","#1E88E5","#558B2F","#00B8D4","#BA68C8","#78909C","#A1887F", "#757575", "#43A047","#827717"]; 
		//set container
		var c = obj;//document.getElementById("container");
		c.style.height=500+'px';
		c.style.position='relative';
		c.style.backgroundColor='#cccc';
		c.style.width= '100%';
		var clientW=c.clientWidth;
		var clientH=c.clientHeight;
		//title
		var titleText=document.createElement('div');
		titleText.setAttribute('id','title');      
		titleText.innerHTML=title ;
		titleText.style.position='absolute';
		titleText.style.textAlign='center';
		titleText.style.padding='20px 10px 5px 10px';
		titleText.style.fontSize='24px';
		c.appendChild(titleText);
		var titleH=titleText.clientHeight;

		if(clientH>clientW){
			width=clientW; height=clientW+titleH;            
		}
		else {
			width=clientH; height=clientH+titleH;
		}     
		c.style.height=height+'px';
		titleText.style.width=width+'px';

        //create layer
        var layer=[];
        for(var i=1; i<10; i++)
        {
        	layer[i]=document.createElement('canvas');	
        	layer[i].setAttribute('id','layer'+i);		
			layer[i].setAttribute('width',width);
			layer[i].setAttribute('height',height);
			layer[i].style.position= 'absolute';
			layer[i].style.left= '0';
			layer[i].style.right= '0';
			layer[i].style.bottom= '0';
			layer[i].style.top= '0';
			layer[i].style.zIndex= i.toString();
			c.appendChild(layer[i]);
        }
		//create legenda element
		var layer5=document.createElement('div');
		layer5.setAttribute('id','legenda');
		layer5.style.width=(clientW-width)+'px';
		layer5.style.height=height+'px';
		layer5.style.left=width+'px';
		layer5.style.position='absolute';
		layer5.style.verticalAlign='middle';
		layer5.style.backgroundColor= '#eeeeee';
		layer5.style.overflowY= 'scroll';
		layer5.style.zIndex= '11';
		var legenda=document.createElement('div');        
		layer5.appendChild(legenda);
		c.appendChild(layer5);
       
		//graphic position
		var xPos=width/2;
		var yPos=((height+titleH)/2);

		//layer 6 (progressif pie label)
		var c6=document.getElementById('layer6');
		var ctx6 = c6.getContext("2d");                
		var chartSize=(c6.width/5)-padding;         
		ctx6.fillStyle="white";
		ctx6.moveTo(xPos,yPos);
		ctx6.arc(xPos,yPos,chartSize,0,2*Math.PI);
		ctx6.fill();

		//layer 3 (pie diagram)
		var cPie=document.getElementById('layer1');
		var ctxPie = cPie.getContext("2d");           
		var radius=(cPie.width/2)-padding;        
		var total=0;
		for( var i = 0; i < data.length; i++ ){
			total += data[ i ][ 1 ];
		}

		// progress legenda
		var progressPercent=Math.floor(total*1000/totalData)/10;
		legenda.innerHTML='<h3 style="margin-left:10px">Progress</h3>';
		legenda.innerHTML+='<div style="border-left: 8px solid;margin-bottom: 20px;margin-left: 10px;border-left-color:#4A148C"><span style="display: block;font-size:27px;padding-left: 10px;">'+progressPercent+' % </span><span style="display: block;font-size:14px;padding-left: 10px;">'+total+' of '+totalData+' total</span></div>';    
		legenda.innerHTML+='<h3 style="margin-left:10px">Current Data</h3>';

		//draw pie chart
		var startingPoint = 0;  
		for( var i = 0; i < data.length; i++ ){
			var percent = data[ i ][ 1 ] * 100 / total;
			var endPoint = startingPoint + ( 2 / 100 * percent );
			ctxPie.beginPath();
			ctxPie.fillStyle = colors[ i ];     
			ctxPie.moveTo( xPos, yPos );     
			ctxPie.arc( xPos, yPos, radius, startingPoint * Math.PI, endPoint * Math.PI );
			ctxPie.fill();
			var angle=startingPoint+(endPoint-startingPoint)/2;
			startingPoint = endPoint;
			//legenda
			var percentFloor=Math.floor(percent*100)/100;
			legenda.innerHTML+='<div class="legenda" style="border-left: 8px solid;margin-bottom: 20px;margin-left: 10px;border-left-color:'+colors[i]+'"><span style="display: block;font-size:18px;padding-left: 10px;">'+data[i][0]+'</span><span style="display: block;font-size:27px;padding-left: 10px;">'+percentFloor+' % </span><span style="display: block;font-size:14px;padding-left: 10px;">'+data[i][1]+' of '+total+' total</span></div>';
			//create inner label
			var rad=radius-(radius*0.25);
			var innerLabel=document.createElement('div');
			innerLabel.setAttribute('id','innerLabel');
			innerLabel.innerHTML=percentFloor+'%';
			innerLabel.style.position='absolute';
			innerLabel.style.zIndex="12";
			innerLabel.style.color='white';
			innerLabel.style.top=((Math.sin(angle*Math.PI)*rad)+yPos)+'px';
			innerLabel.style.left=((Math.cos(angle*Math.PI)*rad)+xPos)+'px';
			c.appendChild(innerLabel);
		}

		//progress persentage label
		var progressLabel=document.createElement('div');
		progressLabel.setAttribute('class','progress-label');
		progressLabel.innerHTML='<span>'+progressPercent+'%</span>';
		progressLabel.style.top=(yPos-chartSize)+'px';
		progressLabel.style.left=(xPos-chartSize)+'px';
		progressLabel.style.width=2*chartSize+'px';
		progressLabel.style.height=2*chartSize+'px';
		progressLabel.style.textAlign='center';
		progressLabel.style.lineHeight=2*chartSize+'px';
		progressLabel.style.verticalAlign='middle';
		progressLabel.style.fontSize='42px';
		progressLabel.style.position='absolute';
		progressLabel.style.color= '#757575';
		progressLabel.style.zIndex= '11';
		c.appendChild(progressLabel);

		//outer pie border
		var c4=document.getElementById('layer2');
		var ctx4 = c4.getContext("2d");             
		var chartSize=(c4.width/3.8)-padding;       
		ctx4.fillStyle="white";
		ctx4.moveTo(xPos,yPos);
		ctx4.arc(xPos,yPos,chartSize,0,2*Math.PI);
		ctx4.fill();
		//progressif pie (doughnut chart)
		var progressPercent=total/totalData;
		var progressValue=(progressPercent*2)-0.5;
		var c2=document.getElementById('layer4');
		var ctx2 = c2.getContext("2d");            
		var chartSize=(c2.width/4)-padding;         
		ctx2.fillStyle="#4A148C";
		ctx2.moveTo(xPos,yPos);
		ctx2.arc(xPos,yPos,chartSize,-0.5*Math.PI,progressValue*Math.PI);
		ctx2.fill();

		//background
		var c1=document.getElementById('layer3');
		var ctx1 = c1.getContext("2d");             
		var chartSize=(c1.width/4)-padding;         
		ctx1.fillStyle="#E0E0E0";
		ctx1.moveTo(xPos,yPos);
		ctx1.arc(xPos,yPos,chartSize,0,2*Math.PI);
		ctx1.fill();
	 }
}