console.log("회원가입 유효성 검사"); 


var memberService = (function(){
	function validate(t){
		var space = /\s/g;
		var reg = /[^a-z0-9]/g;		
		var name = t.attr("name");
		var value = t.val(); 
		var small = t.siblings('small'); 
		var msg ="", tag="valid";
		if(name=="id"){
			if(value==""){
				msg = "아이디를 입력하세요."; 
				tag = "invalid"; 
			}else if(value.match(space)){
				msg = "공백이 포함되어 있습니다."; 
				tag = "invalid"; 
			}else if(reg.test(value)){
				msg = "영문소문자, 숫자만 가능합니다.";
				tag = "invalid"; 
			}else if(value.length < 5){
				msg = "최소 5자리 이상 입력가능합니다."; 
				tag = "invalid"; 
			}else if(value.length > 12){
				msg = "최대 12자리까지 입력가능합니다."; 
				tag = "invalid"; 
			}else{
				$.ajax({
					type : 'get', 
					url : '/member/chkId/'+value, 
					success : function(data){
						if(data!="ok"){
							msg = "중복된 아이디입니다.";
							tag = "invalid"; 
						}else{
							msg = "사용가능합니다.";
							tag = "valid"; 	
						}
						small.text(msg); 
						small.removeClass();
						small.addClass(tag);	
					}, 
					error : function(xhr, status, err){
						console.log(error()); 
					}
				});
			}	
		}else if(name=="pw" || name=="pw2"){
			reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
			var num = value.search(/[0-9]/g);
 			var eng = value.search(/[a-z]/ig);
 			var spe = value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
			if(value == ""){
				msg = "비밀번호를 입력하세요.";
				tag = "invalid"; 
			}else if(value.match(space)){
				msg = "공백이 포함되어 있습니다.";
				tag = "invalid"; 
			}else if(reg.test(value)){
				msg = "숫자, 영문, 특수문자가  포함되어야 합니다.";
				tag = "invalid";
			}else if(num < 0 || eng < 0 || spe < 0){
				msg = "영문, 숫자, 특수문자를 혼합하여 입력하세요.";
				tag = "invalid"; 
			}else if(value.length < 8){
				msg = "최소 8자리 이상 입력가능합니다.";
				tag = "invalid"; 
			}else if(value.length > 20){
				msg = "최대 20자리까지 입력가능합니다.";
				tag = "invalid"; 
			}else{
				if(name=="pw2"){
					if(value != $("#pw").val()){
						msg = "비밀번호 일치하지 않습니다.";
						tag = "invalid"; 
					}else{						
						msg = "비밀번호 일치합니다.";
						tag = "valid"; 
					}
				}
			}
		}else if(name == "name"){
			if(value == ""){
				msg = "이름을 입력하세요.";
				tag = "invalid"; 
			}else if(value.match(space)){
				msg = "공백이 포함되어 있습니다.";
				tag = "invalid"; 
			}else if(value.length > 10){
				msg = "최대 10자리까지 입력가능합니다."; 
				tag = "invalid"; 
			}
		}else if(name == "phone"){
			reg = /(01[016789])(\d{4}|\d{3})(\d{4})$/g; 
			if(!reg.test(value)){
				msg = "형식에 맞춰서 입력하세요."; 
				tag = "invalid"; 
			}else if(value.length > 12){
				msg = "최대 12자리까지 입력가능합니다."; 
				tag = "invalid"; 
			}else{
				msg = "형식이 일치합니다."; 
				tag = "valid";
			}
		}else if(name == "email"){
			reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
			if(value.match(space)){
				msg = "공백이 포함되어 있습니다."; 
				tag = "invalid"; 
			}else if(!reg.test(value)){
				msg = "이메일 주소를 재확인 해보세요."; 
				tag = "invalid"; 
			}
		}else if(name =="originPw"){
				var pw = $("#pw").val(); 
				var id = $("#id").val();
				pw = encodeURIComponent(pw);
				$.ajax({
					type : 'get', 
					url : '/member/chkPw/'+id+'/'+pw, 
					success : function(data){
						console.log(data);
						if(data!="ok"){
							msg = "원래비밀번호와 일치합니다.";
							tag = "invalid"; 
						}else{
							msg = "";
							tag = ""; 	
						}
						small.text(msg); 
						small.removeClass();
						small.addClass(tag);	
					}, 
					error : function(xhr, status, err){
						console.log(xhr); 
						console.log(status); 
						console.log(err);
					}
				});			
		}else if(name=='kind'){
			small=$(".kind");
			var str=""; 
			if(!t.is(':checked') && str!=""){
				msg = "종류를 선택하세요.";
				tag = "invalid";
			}else {
				msg = "";
				tag = "";
				str = t.is(':checked'); 
			}
		}else if(name=='auth'){
			small=$(".auth");
			var str=""; 
			if(!t.is(':checked') && !str){
				msg = "종류를 선택하세요.";
				tag = "invalid";
			}else {
				msg = "";
				tag = "";
				str = t.is(':checked'); 
			}		
		}else if(name=='sdate' || name=='edate'){
			if(value==''){
				msg = "형식이 맞지 않습니다."; 
				tag = "invalid"; 		
			}
		}else if(name=='content'){
			if(value==''){
				msg = "내용을 입력하세요."; 
				tag = "invalid"; 		
			}		
		}
		small.text(msg); 
		small.removeClass();
		small.addClass(tag);
		
	};	
	
	function modify(member, callback, error){
		console.log("modify................"); 
		$.ajax({
			type : 'put', 
			url : '/member/modify', 
			data : JSON.stringify(member), 
			contentType : "application/json; charset=UTF-8", 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});		
	};	
	
	function changePw(member, callback, error){
		console.log("changePw................"); 
		$.ajax({
			type : 'patch', 
			url : '/member/changePw', 
			data : JSON.stringify(member), 
			contentType : "application/json; charset=UTF-8", 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});				
	};
	
	function unjoin(member, callback, error){
		console.log("unjoin................"); 
		$.ajax({
			type : 'delete', 
			url : '/member/unjoin', 
			data : JSON.stringify(member), 
			contentType : "application/json; charset=UTF-8", 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});						
	}
	
	function modifyPhoto(id, files, callback, error){
		console.log("modifyPhoto................"); 
		console.log(JSON.stringify(files));	
		$.ajax({
			type : 'put', 
			url : '/member/modifyPhoto/'+id, 
			data : JSON.stringify(files), 
			contentType : "application/json; charset=UTF-8", 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});			
	}
	
	function deletePhoto(id, callback, error){
		console.log("deletePhoto................"); 
		$.ajax({
			type : 'delete', 
			url : '/member/deletePhoto/'+id, 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});				
	}
	
	function cultureList(param, callback, error){
		
		var id = param.id; 
		var category = param.category; 
		
		$.get("/"+category+"/top/"+id+".json", function(result){
			if(callback){
				callback(result); 
			}
		}).fail(function(xhr, status, err){
			if(error){
				error(er); 
			}
		}); 
	}
	
	function boardList(writer, callback, error){
		$.get("/board/writer/"+writer+"/top.json", function(result){
			if(callback){
				callback(result); 
			}
		}).fail(function(xhr, status, err){
			if(error){
				error(er); 
			}
		}); 
	}	
	
	function cultureCount(id, callback, error){
		$.get("/culture/count/"+id+".json", function(result){
			if(callback){
				callback(result); 
			}
		}).fail(function(xhr, status, err){
			if(error){
				error(er); 
			}
		}); 
	}
	
	function boardCount(writer, callback, error){
		$.get("/board/writer/"+writer+"/count.json", function(result){
			if(callback){
				callback(result); 
			}
		}).fail(function(xhr, status, err){
			if(error){
				error(er); 
			}
		}); 
	}	
	
	function displyTime(time){
		var dateObj = new Date(time); 
		var yy = dateObj.getFullYear(); 
		var mm = dateObj.getMonth()+1; 
		var dd = dateObj.getDate(); 
		
		return [yy, '-', (mm<10?'0':'')+mm, '-', (dd<10?'0':'')+dd].join('');
		
	}
	
	function get(lno, callback, error){
		$.get("/log/"+lno+".json", function(result){
			if(callback){
				callback(result); 
			}
		}).fail(function(xhr, status, err){
			if(error){
				error(er); 
			}
		}); 
	}
	
	function add(log, callback, error){
		
		$.ajax({
			type : 'post', 
			url : '/log/new', 
			data : JSON.stringify(log), 
			contentType : "application/json; charset=UTF-8", 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});			
	}
	
	function modify2(log, callback, error){
		$.ajax({
			type : 'put', 
			url : '/log/'+log.lno, 
			data : JSON.stringify(log), 
			contentType : "application/json; charset=UTF-8", 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});				
	}

	function remove(lno, callback, error){
		$.ajax({
			type : 'delete', 
			url : '/log/'+lno, 
			success : function(result, status, xhr){
				if(callback){
					callback(result); 
				}
			}, 
			error : function(xhr, status, er){
				if(error){
					error(xhr);
				}
			}
		});				
	}
	
	return {
		validate : validate,
		modify : modify,
		changePw : changePw,
		unjoin : unjoin,
		modifyPhoto : modifyPhoto,
		deletePhoto : deletePhoto,
		cultureList : cultureList,
		boardList : boardList,  
		cultureCount : cultureCount,
		boardCount : boardCount,
		displyTime : displyTime, 
		get : get,
		add : add,
		modify2 : modify2,
		remove : remove
	};
})();


