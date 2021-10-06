function trans(query, el){
	var result;
	$.ajax({
	 type:"POST", //전송방식
	 url:"https://Your Site/papago.php", //호출 URL
	 data:{query:query}, //넘겨줄 데이터
	 success:function(args){
	   //alert(args); //통신에 성공했을시 실행되는 함수
	   el.innerHTML = args;
	 },
	 error:function(e){
	   //alert(e.responseText); //통신에 실패했을시 실행되는 함수
	   el.innerHTML = args;
	 }
   });
}   


function setVideoSubtitles(){
	
	if(document.getElementById('subtitle') == null){
	
		try{
			document.getElementsByClassName("ItemLecture_Video_Player")[0].insertAdjacentHTML("beforebegin", "\
			<div style='padding:10px;background-color:rgba(0, 0, 0, 0.3);width:100%;text-align:center;text-shadow: black 0px 0px 7px, rgb(0 0 0 / 80%) 0px 0px 18px;color: white;font-size:24px'>\
			<div id='subtitle'>subtitle</div>\
			<div id='subtitle2'>subtitle2</div>\
			</div>")
			
			var video = document.getElementsByTagName('video')[0];

			if (!video.textTracks) return;

			var track;
			for(let i=0; i<video.textTracks.length; i++){
				if(video.textTracks[i].label == "English"){
					track = video.textTracks[i];
				}
			}

			track.mode = 'hidden';

			track.oncuechange = function(e) {

				var cue = this.activeCues[0];
				if (cue) {
					document.getElementById("subtitle").innerHTML = cue.getCueAsHTML().textContent;
					trans(cue.getCueAsHTML().textContent, document.getElementById("subtitle2"));
				}

			};

		}
		catch(error){}
		
	}
	
}

setInterval(setVideoSubtitles, 1000);



function setReadingTrans(){
	
	if(document.getElementsByClassName('sub_trans').length == 0){
	
		var redingTexts = document.getElementsByClassName('cmlToHtml-content-container')[0].childNodes;
		for(i=0; i<redingTexts.length;i++){
			
			var el = redingTexts[i];
			
			if(el.getElementsByClassName('mord').length > 0){
				continue;
			}
			
			//h태그 번역
			if(el.tagName.includes('H')){
				
				var temp_el = document.createElement(el.tagName);
				var temp_el2 = document.createElement('p1');
				
				temp_el.textContent = el.textContent;
				temp_el.style['margin'] = '0px';
				temp_el2.textContent = el.textContent;
				temp_el2.style['margin'] = '0px';
				temp_el2.setAttribute('class', 'sub_trans');
				
				el.innerHTML = "";
				el.append(temp_el);
				el.append(temp_el2);
				
			}else if(el.textContent.slice(0,2) != ">>" && el.textContent.length > 0){ //이외의 태그들
				var pSplit = el.textContent.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
				if(pSplit == null){
					pSplit = new Array(el.textContent);
				}
				var pSplit2 = new Array();
				var save_temp = "";
				
				for(y=0; y<pSplit.length; y++){
					
					var temp = pSplit[y].trim();
					if(temp.length > 5){
						pSplit2.push(temp);
					}else{
						if(pSplit2.length > 0){
							pSplit2[pSplit2.length-1] = pSplit2[pSplit2.length-1]+temp;
						}else{
							pSplit2.push(temp);
						}
					}
				}
				
				el.innerHTML = "";
				for(y=0; y<pSplit2.length;y++){
					var p = document.createElement('p1');
					var p2 = document.createElement('p1');
					
					p.textContent = pSplit2[y];
					p2.textContent = pSplit2[y];
					p2.setAttribute('class', 'sub_trans');
					
					el.append(p);
					el.innerHTML = el.innerHTML + "<br>";
					el.append(p2);
					el.innerHTML = el.innerHTML + "<br>";

				}

			}
		}
		//이외의 태그들2
		var trans_texts = document.getElementsByClassName('sub_trans');
		for(i=0; i<trans_texts.length;i++){
			var el = trans_texts[i];
			trans(el.textContent, el);
		}
	}
}
setInterval(setReadingTrans, 1000);