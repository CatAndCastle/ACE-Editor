function loadFile(t){var e=new XMLHttpRequest;if(e.open("GET",t,!1),e.send(null),200==e.status)return e.responseText;try{return e.responseText}catch(t){return null}}function apiRequest(t){var e=new XMLHttpRequest;if(e.open("GET",t,!1),e.send(null),200==e.status)return JSON.parse(e.responseText);try{return JSON.parse(e.responseText)}catch(t){return null}}function getQueryStringValue(t){return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]"+escape(t).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}CONFIG={api_url:"http://aceapi.catandcastle.com/"};var Block=function(){this.type="asset",this.blockId="",this.animationData={}};Block.prototype.loadById=function(t){this.blockId=t;var e=CONFIG.api_url+"block?id="+t;this.animationData=apiRequest(e),this.setBaseFolder()},Block.prototype.loadTemplate=function(t){this.folder=t.replace(/\/[^\/]+\/?$/,""),this.blockId=this.folder,this.getType();var e=loadFile(t);this.animationData=JSON.parse(e);var o=loadFile(this.folder+"/placeholders.json");this.animationData.placeholders=JSON.parse(o),this.setBaseFolder()},Block.prototype.getType=function(){var t=this.blockId.toLowerCase();t.indexOf("title")!==-1?this.type="title":t.indexOf("end")!==-1?this.type="end":this.type="asset"},Block.prototype.setBaseFolder=function(){for(var t=0;t<this.animationData.assets.length;t++){var e=this.animationData.assets[t];this.isImageAsset(e)&&(e.u="https://s3.amazonaws.com/ace.blocks/"+this.blockId+"/images/")}},Block.prototype.setFont=function(t){this.animationData.chars=t.chars,this.animationData.fonts.list=t.fonts.list},Block.prototype.setColorPallete=function(t){this.animationData.assets.push(t)},Block.prototype.loadFonts=function(t){for(var e=this,o=[],s=0;s<t.length;s++){var a=JSON.parse(e.loadFile(t[s]));o=o.concat(a.chars)}this.animationData.chars=o},Block.prototype.fillTemplate=function(t){if(t.length<this.animationData.placeholders.assets.length)return{error:!0,message:"not enough assets provided"};console.log(t);for(var e=0;e<this.animationData.placeholders.assets.length;e++)this.fillData(this.animationData.placeholders.assets[e],t[e]);return{error:!1}},Block.prototype.fillData=function(t,e){var o=this;for(var s in t)if("usericon"!=s)for(var a=t[s],i=0;i<a.length;i++){var r=a[i],n=this.animationData.layers[r.idx],l=e.get(s);if("text"==r.type){if("en"!=CONFIG.language&&"tweetbody"==s){var h=new GoogleApi;l.text=h.translate(l.text,"en",CONFIG.language)}o.setText(n,l)}else"image"==r.type&&"video"==l.type?o.setVideo(n,l):"image"==r.type&&o.setImage(n,l)}},Block.prototype.setText=function(t,e){for(var o=t;!this.isTextLayer(o);)if("refId"in o)o=this.findAsset(o.refId);else{if(!("layers"in o))return console.log("Bad Text Layer"),void console.log(t);for(var s in o.layers)if(this.isTextLayer(o.layers[s])){o=o.layers[s];break}for(var s in o.layers)if("refId"in o.layers[s]){o=this.findAsset(o.layers[s].refId);break}}o.t.d.t=e.text,o.t.d.mf=Math.min(e.mf,o.t.d.s),o.t.d.f="AvenirNext-Heavy"},Block.prototype.setImage=function(t,e){for(var o=t;!this.isImageAsset(o);)if("refId"in o)o=this.findAsset(o.refId);else{if(!("layers"in o))return console.log("Bad Image Layer"),void console.log(t);for(var s in o.layers){var a=o.layers[s];if("refId"in a){this.setImageLayer(a),o=this.findAsset(o.layers[s].refId);break}}}o.u="",o.p=e.url},Block.prototype.setVideo=function(t,e){for(var o=t;!this.isImageAsset(o);)if("refId"in o)this.setVideoLayer(o),o=this.findAsset(o.refId);else{if(!("layers"in o))return console.log("Bad Video Layer"),void console.log(t);for(var s in o.layers){var a=o.layers[s];if("refId"in a){this.setVideoLayer(a),o=this.findAsset(o.layers[s].refId);break}}}o.u=e.dir,o.p="frame1.png",o.nf=e.n_frames},Block.prototype.isImageAsset=function(t){return"id"in t&&"u"in t&&"p"in t&&"h"in t&&"w"in t},Block.prototype.isVideoLayer=function(t){return"ty"in t&&9==t.ty},Block.prototype.isTextLayer=function(t){return"t"in t&&"d"in t.t&&"f"in t.t.d},Block.prototype.setImageLayer=function(t){"ty"in t&&0!=t.ty&&(t.ty=2,t.cl="jpg")},Block.prototype.setVideoLayer=function(t){"ty"in t&&0!=t.ty&&(t.ty=9,t.cl="mp4")},Block.prototype.findAsset=function(t){for(var e=0;e<this.animationData.assets.length;e++)if(this.animationData.assets[e].id==t)return this.animationData.assets[e]},Block.prototype.loadFile=function(t){var e=new XMLHttpRequest;if(e.open("GET",t,!1),e.send(null),200==e.status)return e.responseText;try{return e.responseText}catch(t){return null}},Block.prototype.findKeyframes=function(){for(var t=0;t<this.animationData.layers.length;t++){var e=this.animationData.layers[t];for(var o in e)if(e.hasOwnProperty(o)){e[o]}}},Block.prototype.iterate=function(t){};var ColorManager=function(){this.folder="_ColorPalletes/",this.pallete={}};ColorManager.prototype.load=function(t){this.pallete=JSON.parse(loadFile(t))},ColorManager.prototype.loadPallete=function(t){this.pallete=JSON.parse(loadFile(this.palleteFile(t)))},ColorManager.prototype.palleteFile=function(t){return this.folder+t+".json"};var FontManager=function(){this.folder="_fonts/",this.chars=null,this.fonts={list:[{fFamily:"Noto Sans",fName:"NotoSans",fStyle:"Regular",fWeight:400,fPath:"https://fonts.googleapis.com/css?family=Noto+Sans:400,400i",fOrigin:"g",ascent:75.97},{fFamily:"Noto Sans",fName:"NotoSans-Bold",fStyle:"Bold",fWeight:700,fPath:"https://fonts.googleapis.com/css?family=Noto+Sans:700,700i",fOrigin:"g",ascent:75.97},{fFamily:"Arboria",fName:"Arboria-Black",fStyle:"Black",fWeight:800,fPath:"https://s3.amazonaws.com/fonts.zeroslant.com/Arboria/Arboria.css",fOrigin:"g",ascent:75.97},{fFamily:"Arboria",fName:"Arboria-Bold",fStyle:"Bold",fWeight:700,fPath:"https://s3.amazonaws.com/fonts.zeroslant.com/Arboria/Arboria.css",fOrigin:"g",ascent:75.97},{fFamily:"Arboria",fName:"Arboria-Medium",fStyle:"Medium",fWeight:500,fPath:"https://s3.amazonaws.com/fonts.zeroslant.com/Arboria/Arboria.css",fOrigin:"g",ascent:75.97},{fFamily:"AvenirNext-Heavy",fName:"AvenirNext-Heavy",fStyle:"Heavy",fWeight:600,fPath:"https://s3.amazonaws.com/fonts.zeroslant.com/AvenirNext/AvenirNext.css",fOrigin:"g",ascent:60}]}};FontManager.prototype.loadFonts=function(t){switch(t){case"default":this.load(["English","Numbers","ArialMT"]);break;default:this.load(["English","Numbers","ArialMT"])}},FontManager.prototype.load=function(t){for(var e=0;e<t.length;e++){var o=JSON.parse(loadFile(this.fontFile(t[e])));this.addFont(o)}},FontManager.prototype.addFont=function(t){this.chars=this.chars.concat(t.chars),this.fonts.list=this.fonts.list.concat(t.fonts.list)},FontManager.prototype.fontFile=function(t){return this.folder+t+".json"},FontManager.prototype.getFontFor=function(t){return this.fonts.list[0].fName};var GoogleApi=function(){this.GOOGLE_API_KEY="AIzaSyDT9Hw8wqem-pJm6wS1rz6JtSAd5SEyXk4"};GoogleApi.prototype.translate=function(t,e,o){var s="https://www.googleapis.com/language/translate/v2?key="+this.GOOGLE_API_KEY+"&q="+encodeURIComponent(t)+"&source="+e+"&target="+o,a=apiRequest(s);return!("error"in a)&&"data"in a&&"translations"in a.data&&a.data.translations.length>0?(console.log("translated:"+a.data.translations[0].translatedText),a.data.translations[0].translatedText):t};var TemplateManager=function(t){this.type="redtri",this.folder="_templates_buzzfeed/",this.colorTemplate=null,this.configure(t),this.previousBlock=""};TemplateManager.prototype.configure=function(t){for(var e in t)this[e]=t[e];this.loadFonts(),this.loadColors(),this.TITLE_TEMPLATES=["TitleCard_01","TitleCard_02","TitleCard_03","TitleCard_04","TitleCard_06"],this.END_TEMPLATES=["EndCard_01","EndCard_02"],this.CONTENT_TEMPLATES=["Block_01","Block_02","Block_03","Block_04","Block_05","Block_06","Block_07","Block_08","Block_09","Block_10","Block_11","Block_12","Block_13","Block_14","Block_15","Block_16","Block_17"],"template_v2"==this.type?this.CONTENT_TEMPLATES_SINGLE=["Block_01","Block_04","Block_05","Block_06","Block_07","Block_08","Block_12","Block_13","Block_14","Block_15","Block_16"]:"template_ace"==this.type&&(this.CONTENT_TEMPLATES_SINGLE=["Block_01","Block_04","Block_06","Block_07","Block_13","Block_14","Block_16","Block_17"])},TemplateManager.prototype.loadFonts=function(){this.fontManager=new FontManager},TemplateManager.prototype.loadColors=function(){this.colorManager=new ColorManager,this.colorTemplate?this.colorManager.load(this.colorTemplate):this.colorManager.loadPallete(this.type)},TemplateManager.prototype.getTitleBlock=function(){var t=this.folder+this.TITLE_TEMPLATES.random()+"/data.json";return this.loadBlock(t)},TemplateManager.prototype.getEndBlock=function(){var t=this.folder+this.END_TEMPLATES.random()+"/data.json";return this.loadBlock(t)},TemplateManager.prototype.getContentBlock=function(t){var e=this.CONTENT_TEMPLATES;void 0!==t.maxAssets&&1==t.maxAssets&&(e=this.CONTENT_TEMPLATES_SINGLE);var o=e.slice();return o.indexOf(this.previousBlock)>-1&&o.splice(o.indexOf(this.previousBlock),1),this.previousBlock=o.random(),this.loadBlock(this.folder+this.previousBlock+"/data.json")},TemplateManager.prototype.getBlockById=function(t){var e=new Block;return e.loadById(t),e.setFont(this.fontManager),e.setColorPallete(this.colorManager.pallete),e},TemplateManager.prototype.loadBlock=function(t){console.log("loading "+t);var e=new Block;return e.loadTemplate(t),e.setFont(this.fontManager),e.setColorPallete(this.colorManager.pallete),e};var Asset=function(t){if(this._max_tags=5,this.type="image","string"==typeof t)if("phantom"==CONFIG.platform){var e=".data/"+CONFIG.storyId+"/assets/"+t+"/asset.json",o=loadFile(e);t=JSON.parse(o)}else{var s=CONFIG.api_url+"shot?id="+t;t=apiRequest(s)}for(var a in t)this[a]=t[a]};Asset.prototype.get=function(t){switch(t){case"text":return{text:this.text,mf:30};case"userhandle":return this.username.split(" ").length>1?{text:this.username,fc:COLORS.userhandle,mf:30}:this.username.length>0?{text:"@"+this.username,fc:COLORS.userhandle,mf:30}:{text:"",fc:COLORS.userhandle,mf:30};case"photocredit":return{text:"@"+this.username,fc:COLORS.photocredit,mf:30};case"tweetbody":return{text:this.text,fc:COLORS.tweetbody,mf:40};case"hashtags":return"tags"in this&&0!=this.tags.length?{text:"#"+this.tags.slice(0,this._max_tags).join(" #").toUpperCase(),fc:COLORS.hashtags,mf:40}:{text:"",fc:COLORS.hashtags,mf:20};case"media":var e=this.media[0];return"video"==e.type?{image:this.media,video:this.media,dir:this.dir,n_frames:this.n_frames,type:"video",width:this.width,height:this.height}:{url:e.url,type:"image"};case"usericon":return this.usericon;default:return""}},Asset.prototype.isVideo=function(){return"video"===this.type},Asset.prototype.getUser=function(){return{platform:this.platform,username:this.username}};var Story=function(t){if(this.type="Zerobot","string"==typeof t)this.load(t);else if("object"==typeof t)for(var e in t)this[e]=t[e];this.usedAssets=[]};Story.prototype.load=function(t){var e;if("phantom"==CONFIG.platform){var o=".data/"+t+"/story.json",s=loadFile(o);e=JSON.parse(s)}else{e=apiRequest(CONFIG.api_url+"story/"+t+"?q=keywords,hashtags");for(var a=0;a<e.body.length;)"video"!=e.body[a].type?e.body.splice(a,1):a++}for(var i in e)this[i]=e[i]},Story.prototype.get=function(t){switch(t){case"location":return{text:this.location.name.toUpperCase(),fc:COLORS.location,mf:30};case"title":return{text:this.name.toUpperCase(),fc:COLORS.title,mf:40};case"date":return{text:this.dateString,fc:COLORS.date,mf:20};case"userhandle":return{text:"@"+this.poster_full.username,fc:COLORS.userhandle,mf:30};case"media":return this.getAssets(1)[0].get("media");default:return""}},Story.prototype.getAsset=function(t){return new Asset(this.body[t])},Story.prototype.numAssetsLeft=function(){return this.body.length},Story.prototype.type=function(){return this.type},Story.prototype.getAssets=function(t){for(var e=[],o=0;o<Math.min(t,this.body.length);o++){var s=t>3?this.body.pop():this.body.shift();e.push(new Asset(s)),this.usedAssets.push(s)}return e},Story.prototype.endAssets=function(t){for(var e=[],o=0;o<Math.min(t,this.body.length);o++){var s=this.body.pop();e.push(new Asset(s)),this.usedAssets.push(s)}return e},Story.prototype.getEndAssets=function(t){for(var e=this.getAssets(t),o=0;o<e.length;o++)e[o].type="image";if(e.length<t)for(var o=0;e.length<t;){o>=this.usedAssets.length&&(o=0);var s=this.usedAssets[o];s.type="image",e.push(new Asset(s)),o++}return e},Story.prototype.saveData=function(){for(var t={assets:[],hashtags:[],users:[]},e=0;e<this.hashtags.length;e++)t.hashtags.push("#"+this.hashtags[e]);for(var e=0;e<this.usedAssets.length;e++)t.assets.push({assetId:this.usedAssets[e].id,source:this.usedAssets[e].source,type:this.usedAssets[e].type,user:"@"+this.usedAssets[e].username,url:this.usedAssets[e].link}),t.users.push("@"+this.usedAssets[e].username);writeTextFile(".data/"+this.storyId+"/data.json",JSON.stringify(t))},Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]};var COLORS={userhandle:[1,1,1],photocredit:[1,1,1],tweetbody:[1,1,1],hashtags:[1,1,1],location:[1,1,1],date:[1,1,1],title:[1,1,1]},VideoConstructor=function(t){this.duration=30,this.storyId="",this.blockIdx=1,this.frameRate=29.97,this.numBlocks=6,this.story=null,this.asset=null,this.blockId=null,this.storyData=null,this.projectId=null,this.attributes=[],this.animationItem=null,this.renderParams={container:document.getElementById("bodymovin"),renderer:CONFIG.renderer,loop:!1,autoplay:!0};for(var e in t)this[e]=t[e];this.log_data={blocks:[]},this.configure()};VideoConstructor.prototype.configure=function(){this.loadData(),this.TM=new TemplateManager(this.attributes)},VideoConstructor.prototype.loadFonts=function(){this.fontManager=new FontManager,this.fontManager.loadFonts(["English","Numbers","ArialMT"])},VideoConstructor.prototype.loadColors=function(){this.colorManager=new ColorManager,this.colorManager.loadPallete("default")},VideoConstructor.prototype.loadData=function(){this.blockId&&(this.numBlocks=1,this.story=new Story(this.storyId)),this.assetId?(this.numBlocks=1,this.asset=new Asset(this.assetId)):this.assetData?(this.numBlocks=1,this.asset=new Asset(this.assetData)):this.storyData?this.story=new Story(this.storyData):(this.story=new Story(this.storyId),this.numBlocks=1),this.projectId&&(data=apiRequest(CONFIG.api_url+"project?id="+this.projectId),this.attributes=data.attributes)},VideoConstructor.prototype.setData=function(t){this.story=new Story(t)},VideoConstructor.prototype.startRender=function(){this.loadNextBlock(!0)},VideoConstructor.prototype.goToNextFrame=function(){return!(null==this.animationItem&&this.blockIdx>this.numBlocks)&&(null==this.animationItem&&this.blockIdx<=this.numBlocks?(this.loadNextBlock(!1),this.currentFrame=1,this.animationItem.goToAndStop(1,!0)):this.animationItem.currentFrame<this.animationItem.totalFrames&&(this.currentFrame=this.currentFrame+1,this.animationItem.goToAndStop(this.animationItem.currentFrame+1,!0)),!0)},VideoConstructor.prototype.goToFrame=function(t){if(null==this.animationItem&&this.blockIdx>this.numBlocks)return!1;null==this.animationItem&&this.blockIdx<=this.numBlocks?(this.loadNextBlock(!1),this.currentFrame=1,this.animationItem.goToAndStop(t,!0)):this.animationItem.currentFrame<this.animationItem.totalFrames&&(this.currentFrame=this.currentFrame+1,this.animationItem.goToAndStop(t,!0))},VideoConstructor.prototype.reset=function(){this.blockIdx=1,this.animationItem=null},VideoConstructor.prototype.loadNextBlock=function(t){var e=this,o=this.getNextBlock();this.log_data.blocks.push(o.blockId),this.renderParams.animationData=o.animationData,this.renderParams.autoplay=t,bodymovin.destroy(),console.log(this.renderParams.animationData),this.animationItem=bodymovin.loadAnimation(this.renderParams),console.log(this.animationItem),this.animationItem.addEventListener("DOMLoaded",function(){console.log(" - loaded")}),this.animationItem.addEventListener("enterFrame",function(){}),this.animationItem.addEventListener("complete",function(){e.animationItem=null,t&&e.blockIdx<=e.numBlocks&&e.loadNextBlock(t)})},VideoConstructor.prototype.getNextBlock=function(){if(null==this.story&&null!=this.asset)var t=[this.asset];else if(this.blockIdx==this.numBlocks)var t=this.story.endAssets(1);else var t=this.story.getAssets(1);var e=this.TM.getBlockById(t[0].blockId);return e.fillTemplate(t),this.blockIdx++,e;var e,e,e,e,e};