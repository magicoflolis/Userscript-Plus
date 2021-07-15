//https://github.com/malko/l.js
;(function(window, undefined){
/*
* script for js/css parallel loading with dependancies management
* @author Jonathan Gotti < jgotti at jgotti dot net >
* @licence dual licence mit / gpl
* @since 2012-04-12
* @todo add prefetching using text/cache for js files
* @changelog
*            - 2019-01-17 - add support for error handlers + bugFix on multiple inclusion of filled script tag fix issues #15 and #17
*            - 2016-08-22 - remove global eval and fix issue #13
*            - 2014-06-26 - bugfix in css loaded check when hashbang is used
*            - 2014-05-25 - fallback support rewrite + null id bug correction + minification work
*            - 2014-05-21 - add cdn fallback support with hashbang url
*            - 2014-05-22 - add support for relative paths for stylesheets in checkLoaded
*            - 2014-05-21 - add support for relative paths for scripts in checkLoaded
*            - 2013-01-25 - add parrallel loading inside single load call
*            - 2012-06-29 - some minifier optimisations
*            - 2012-04-20 - now sharp part of url will be used as tag id
*                         - add options for checking already loaded scripts at load time
*            - 2012-04-19 - add addAliases method
* @note coding style is implied by the target usage of this script not my habbits
*/
	var isA =  function(a,b){ return a instanceof (b || Array);}
		//-- some minifier optimisation
		, D = document
		, getElementsByTagName = 'getElementsByTagName'
		, length = 'length'
		, readyState = 'readyState'
		, onreadystatechange = 'onreadystatechange'
		, typeJS = 'text/javascript'
		, scriptStr = 'script'
		, header  = D[getElementsByTagName]("head")[0] || D.documentElement
		, aliases = {}
		//-- get the current script tag for further evaluation of it's eventual content
		, scripts = D[getElementsByTagName](scriptStr)
		, scriptTag = scripts[scripts[length]-1]
		, script  = scriptTag.innerHTML.replace(/^\s+|\s+$/g,'')
		, appendElmt = function(type,attrs,cb){
			var e = D.createElement(type), i;
			if( cb ){ //-- this is not intended to be used for link
				if( e[readyState] ){
					e[onreadystatechange] = function(){
						if (e[readyState] === "loaded" || e[readyState] === "complete"){
							e[onreadystatechange] = null;
							cb();
						}
					};
				}else{
					e.onload = cb;
				}
			}
			for( i in attrs ){ attrs[i] && (e[i]=attrs[i]); }
			header.appendChild(e);
			// return e; // unused at this time so drop it
		}
	;
	//avoid multiple inclusion to override current loader but allow tag content evaluation
	if( !window.ljs ){
		var checkLoaded = scriptTag.src.match(/checkLoaded/)?1:0
			//-- keep trace of header as we will make multiple access to it
			,urlParse = function(url){
				var parts={}; // u => url, i => id, f = fallback
				parts.u = url.replace(/#(=)?([^#]*)?/g,function(m,a,b){ parts[a?'f':'i'] = b; return '';});
				return parts;
			}
			,load = function(loader, url,cb){
				if( aliases && aliases[url] ){
					var args = aliases[url].slice(0);
					isA(args) || (args=[args]);
					cb && args.push(cb);
					return loader.load.apply(loader,args);
				}
				if( isA(url) ){ // parallelized request
					for( var l=url[length]; l--;){
						loader.load(url[l]);
					}
					cb && url.push(cb); // relaunch the dependancie queue
					return loader.load.apply(loader,url);
				}
				if( url.match(/\.css\b/) ){
					return loader.loadcss(url,cb);
				}
				return loader.loadjs(url,cb);
			}
			,loaded = {}  // will handle already loaded urls
			,errorHandlers = []
			,loader = {
				aliases:aliases
				,loadjs: function(url,cb){
					var parts = urlParse(url);
					var onError = function(url) {for(var i=0, l=errorHandlers.length;i<l;i++){errorHandlers[i](url)}};
					url = parts.u;
					if( loaded[url] === true ){ // already loaded exec cb if any
						cb && cb();
						return loader;
					}else if( loaded[url]!== undefined ){ // already asked for loading we append callback if any else return
						if( cb ){
							loaded[url] = (function(ocb,cb){ return function(){ ocb && ocb(); cb && cb(); }; })(loaded[url],cb);
						}
						return loader;
					}
					// first time we ask this script
					loaded[url] = (function(cb){ return function(){loaded[url]=true; cb && cb();};})(cb);
					cb = function(){ loaded[url](); };

					appendElmt(scriptStr,{type:typeJS,src:url,id:parts.i,onerror:function(error){
						onError(url);
						var c = error.currentTarget;
						c.parentNode.removeChild(c);
						appendElmt(scriptStr,{type:typeJS,src:parts.f,id:parts.i, onerror:function(){onError(parts.f)}},cb);
					}},cb);
					return loader;
				}
				,loadcss: function(url,cb){
					var parts = urlParse(url);
					url = parts.u;
					loaded[url] || appendElmt('link',{type:'text/css',rel:'stylesheet',href:url,id:parts.i});
					loaded[url] = true;
					cb && cb();
					return loader;
				}
				,load: function(){
					var argv=arguments,argc = argv[length];
					if( argc === 1 && isA(argv[0],Function) ){
						argv[0]();
						return loader;
					}
					load(loader,argv[0], argc <= 1 ? undefined : function(){ loader.load.apply(loader,[].slice.call(argv,1));} );
					return loader;
				}
				,addAliases: function(_aliases){
					for(var i in _aliases ){
						aliases[i]= isA(_aliases[i]) ? _aliases[i].slice(0) : _aliases[i];
					}
					return loader;
				}
				,onError: function(cb){
					errorHandlers.push(cb);
					return loader;
				}
			}
		;
		if( checkLoaded ){
			var i,l,links,url;
			for(i=0,l=scripts[length];i<l;i++){
				(url = scripts[i].getAttribute('src')) && (loaded[url.replace(/#.*$/,'')] = true);
			}
			links = D[getElementsByTagName]('link');
			for(i=0,l=links[length];i<l;i++){
				(links[i].rel==='stylesheet' || links[i].type==='text/css') && (loaded[links[i].getAttribute('href').replace(/#.*$/,'')]=true);
			}
		}
		//export ljs
		window.ljs = loader;
		// eval inside tag code if any
	}
	// eval script tag content if needed
	scriptTag.src && script && appendElmt(scriptStr, {innerHTML: script});
})(window);
