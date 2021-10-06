function trans(query){
	
	$.ajax({
	 type:"POST", //전송방식
	 url:"https://YourSite/papago.php", //호출 URL
	 data:{query:query}, //넘겨줄 데이터
	 success:function(args){
	   //alert(args); //통신에 성공했을시 실행되는 함수
	   document.getElementById("subtitle2").innerHTML = args;
	 },
	 error:function(e){
	   //alert(e.responseText); //통신에 실패했을시 실행되는 함수
	   document.getElementById("subtitle2").innerHTML = args;
	 }
   });
   
}   


function setSubtitle(){
	
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
					trans(cue.getCueAsHTML().textContent);
				}

			};

		}
		catch(error){}
		
	}
	
}

setInterval(setSubtitle, 1000);




